import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders the Nexo Spend header', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /Nexo Spend/i })).toBeVisible()
    expect(screen.getByText(/Portal ejecutivo de compras/i)).toBeVisible()
    expect(screen.getByText(/Demostración: datos ficticios/i)).toBeVisible()
  })

  it('shows KPI cards', () => {
    render(<App />)

    expect(screen.getByText(/Gasto mensual/i)).toBeVisible()
    expect(screen.getByText(/Presupuesto disponible/i)).toBeVisible()
    expect(screen.getByText(/Solicitudes pendientes/i)).toBeVisible()
  })

  it('filters requests by department', async () => {
    const user = userEvent.setup()
    render(<App />)

    const requestsSection = screen.getByRole('region', { name: /Solicitudes/i })
    const requestsTable = within(requestsSection).getByRole('table')
    const rows = within(requestsTable).getAllByRole('row')
    expect(rows).toHaveLength(21)

    const departmentFilter = screen.getAllByLabelText(/Departamento/i)[0]
    if (!departmentFilter) {
      throw new Error('Missing department filter')
    }

    await user.selectOptions(departmentFilter, 'Tecnología')
    const filteredRows = within(requestsTable).getAllByRole('row')

    expect(filteredRows.length).toBeGreaterThan(0)
    expect(filteredRows.length).toBeLessThan(21)
    for (const row of filteredRows.slice(1)) {
      expect(row.textContent).toContain('Tecnología')
    }
  })

  it('creates a new request', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('link', { name: /Nueva solicitud/i }))

    await user.type(screen.getByLabelText(/Proveedor/i), 'Acme Corp')
    await user.type(screen.getByLabelText(/Importe/i), '1000')
    await user.type(screen.getByLabelText(/Responsable/i), 'Ana Lopez')

    const departmentSelects = screen.getAllByLabelText(/Departamento/i)
    const periodSelects = screen.getAllByLabelText(/Período/i)
    const createDepartmentSelect = departmentSelects[1]
    const createPeriodSelect = periodSelects[1]
    if (!createDepartmentSelect || !createPeriodSelect) {
      throw new Error('Missing create form selects')
    }

    await user.selectOptions(createDepartmentSelect, 'Marketing')
    await user.selectOptions(createPeriodSelect, 'Actual')
    await user.type(screen.getByLabelText(/Descripción/i), 'Demo request')

    await user.click(screen.getByRole('button', { name: /Crear solicitud/i }))

    const requestsSection = screen.getByRole('region', { name: /Solicitudes/i })
    const requestsTable = within(requestsSection).getByRole('table')
    const newRequestRow = within(requestsTable).getByRole('row', { name: /Acme Corp/i })
    expect(newRequestRow).toBeVisible()
    expect(within(newRequestRow).getByText(/1.000/i)).toBeVisible()
    expect(within(newRequestRow).getByText(/Ana Lopez/i)).toBeVisible()
  })
})
