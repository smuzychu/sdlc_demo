import { render, screen } from '@testing-library/react'
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

    // Initially all requests visible
    expect(screen.getAllByRole('row', { name: /supplier/i })).toHaveLength(20)

    // Select a department
    await user.selectOptions(screen.getByLabelText(/Departamento/i), 'Tecnología')
    // Should see only requests from Tecnología
    const rows = screen.getAllByRole('row')
    // Each row contains supplier and department in first cell
    // We'll just check that the number of rows is less than 20 and >0
    expect(rows.length).toBeGreaterThan(0)
    expect(rows.length).toBeLessThan(20)
    // Verify each row contains Tecnología
    for (const row of rows) {
      expect(row.textContent).toContain('Tecnología')
    }
  })

  it('creates a new request', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Click on Nueva solicitud link (sidebar nav)
    await user.click(screen.getByRole('link', { name: /Nueva solicitud/i }))

    // Fill form
    await user.type(screen.getByLabelText(/Proveedor/i), 'Acme Corp')
    await user.type(screen.getByLabelText(/Importe/i), '1000')
    await user.type(screen.getByLabelText(/Responsable/i), 'Ana Lopez')
    await user.selectOptions(screen.getByLabelText(/Departamento/i), 'Marketing')
    await user.selectOptions(screen.getByLabelText(/Período/i), 'Actual')
    await user.type(screen.getByLabelText(/Descripción/i), 'Demo request')

    await user.click(screen.getByRole('button', { name: /Crear solicitud/i }))

    // Should see new request in table
    expect(screen.getByText(/Acme Corp/i)).toBeVisible()
    expect(screen.getByText(/1.000/i)).toBeVisible() // formatted as currency
    expect(screen.getByText(/Ana Lopez/i)).toBeVisible()
  })
})
