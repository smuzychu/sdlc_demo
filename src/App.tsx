import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'

type Department = 'Tecnología' | 'Operaciones' | 'Finanzas' | 'Marketing' | 'Legal'
type RequestStatus = 'Pendiente' | 'Aprobada' | 'Rechazada'
type Period = 'Actual' | 'Previo' | 'Próximo'

type PurchaseRequest = {
  id: string
  supplier: string
  amount: number
  owner: string
  status: RequestStatus
  department: Department
  period: Period
  requestedAt: string
  description: string
  history: { date: string; action: string; note: string }[]
}

const STORAGE_KEY = 'nexo-spend.requests.v1'
const BUDGET = 225000
const departments: Department[] = ['Tecnología', 'Operaciones', 'Finanzas', 'Marketing', 'Legal']
const statuses: RequestStatus[] = ['Pendiente', 'Aprobada', 'Rechazada']
const periods: Period[] = ['Actual', 'Previo', 'Próximo']

const currency = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
})

const seedRequests: PurchaseRequest[] = [
  {
    id: 'REQ-1001',
    supplier: 'Cloud Matrix',
    amount: 18500,
    owner: 'María Torres',
    status: 'Pendiente',
    department: 'Tecnología',
    period: 'Actual',
    requestedAt: '2026-07-12',
    description: 'Renovación de licencias de monitoreo',
    history: [{ date: '2026-07-12', action: 'Creada', note: 'Carga inicial desde demo' }],
  },
  {
    id: 'REQ-1002',
    supplier: 'Nordic Paper',
    amount: 7400,
    owner: 'Luis Benítez',
    status: 'Aprobada',
    department: 'Operaciones',
    period: 'Actual',
    requestedAt: '2026-07-10',
    description: 'Reposición de insumos de oficina',
    history: [{ date: '2026-07-10', action: 'Aprobada', note: 'Aprobada por Finanzas' }],
  },
  {
    id: 'REQ-1003',
    supplier: 'Vertex Analytics',
    amount: 22900,
    owner: 'Sofía Gil',
    status: 'Pendiente',
    department: 'Finanzas',
    period: 'Actual',
    requestedAt: '2026-07-08',
    description: 'Panel de forecast trimestral',
    history: [{ date: '2026-07-08', action: 'Creada', note: 'Esperando revisión' }],
  },
  {
    id: 'REQ-1004',
    supplier: 'Aurea Studio',
    amount: 12600,
    owner: 'Pablo Acosta',
    status: 'Rechazada',
    department: 'Marketing',
    period: 'Previo',
    requestedAt: '2026-06-28',
    description: 'Campaña de marca empleadora',
    history: [{ date: '2026-06-29', action: 'Rechazada', note: 'Se solicitó reprogramación' }],
  },
  {
    id: 'REQ-1005',
    supplier: 'Lex & Co',
    amount: 16300,
    owner: 'Camila Ríos',
    status: 'Pendiente',
    department: 'Legal',
    period: 'Actual',
    requestedAt: '2026-07-11',
    description: 'Asesoría contractual regional',
    history: [{ date: '2026-07-11', action: 'Creada', note: 'Revisión jurídica requerida' }],
  },
  {
    id: 'REQ-1006',
    supplier: 'Cloud Matrix',
    amount: 8600,
    owner: 'María Torres',
    status: 'Aprobada',
    department: 'Tecnología',
    period: 'Previo',
    requestedAt: '2026-06-20',
    description: 'Ampliación de almacenamiento',
    history: [{ date: '2026-06-21', action: 'Aprobada', note: 'Aprobada por CTO' }],
  },
  {
    id: 'REQ-1007',
    supplier: 'Northline Travel',
    amount: 5200,
    owner: 'Luis Benítez',
    status: 'Pendiente',
    department: 'Operaciones',
    period: 'Actual',
    requestedAt: '2026-07-13',
    description: 'Viaje operativo a planta',
    history: [{ date: '2026-07-13', action: 'Creada', note: 'Pendiente de autorización' }],
  },
  {
    id: 'REQ-1008',
    supplier: 'Aurea Studio',
    amount: 9700,
    owner: 'Sofía Gil',
    status: 'Aprobada',
    department: 'Marketing',
    period: 'Actual',
    requestedAt: '2026-07-09',
    description: 'Piezas para feria ejecutiva',
    history: [{ date: '2026-07-09', action: 'Aprobada', note: 'Aprobada por dirección' }],
  },
  {
    id: 'REQ-1009',
    supplier: 'Vertex Analytics',
    amount: 14100,
    owner: 'Pablo Acosta',
    status: 'Pendiente',
    department: 'Finanzas',
    period: 'Previo',
    requestedAt: '2026-06-30',
    description: 'Actualización de modelo presupuestario',
    history: [{ date: '2026-06-30', action: 'Creada', note: 'Pendiente de validación' }],
  },
  {
    id: 'REQ-1010',
    supplier: 'Lex & Co',
    amount: 6800,
    owner: 'Camila Ríos',
    status: 'Aprobada',
    department: 'Legal',
    period: 'Actual',
    requestedAt: '2026-07-07',
    description: 'Revisión de cláusulas de privacidad',
    history: [{ date: '2026-07-07', action: 'Aprobada', note: 'Sin observaciones' }],
  },
  {
    id: 'REQ-1011',
    supplier: 'Cloud Matrix',
    amount: 19200,
    owner: 'María Torres',
    status: 'Pendiente',
    department: 'Tecnología',
    period: 'Próximo',
    requestedAt: '2026-07-18',
    description: 'Pruebas de resiliencia cloud',
    history: [
      { date: '2026-07-18', action: 'Creada', note: 'Programada para el siguiente período' },
    ],
  },
  {
    id: 'REQ-1012',
    supplier: 'Northline Travel',
    amount: 9600,
    owner: 'Luis Benítez',
    status: 'Rechazada',
    department: 'Operaciones',
    period: 'Previo',
    requestedAt: '2026-06-24',
    description: 'Logística para proveedor externo',
    history: [{ date: '2026-06-25', action: 'Rechazada', note: 'Fuera de alcance' }],
  },
  {
    id: 'REQ-1013',
    supplier: 'Vertex Analytics',
    amount: 11300,
    owner: 'Sofía Gil',
    status: 'Aprobada',
    department: 'Finanzas',
    period: 'Actual',
    requestedAt: '2026-07-06',
    description: 'Consolidación de gastos por centro',
    history: [{ date: '2026-07-06', action: 'Aprobada', note: 'Aprobada con tope' }],
  },
  {
    id: 'REQ-1014',
    supplier: 'Aurea Studio',
    amount: 6100,
    owner: 'Pablo Acosta',
    status: 'Pendiente',
    department: 'Marketing',
    period: 'Próximo',
    requestedAt: '2026-07-20',
    description: 'Producción para lanzamiento Q4',
    history: [{ date: '2026-07-20', action: 'Creada', note: 'Falta cotización final' }],
  },
  {
    id: 'REQ-1015',
    supplier: 'Lex & Co',
    amount: 22100,
    owner: 'Camila Ríos',
    status: 'Pendiente',
    department: 'Legal',
    period: 'Actual',
    requestedAt: '2026-07-14',
    description: 'Auditoría regulatoria',
    history: [{ date: '2026-07-14', action: 'Creada', note: 'Requiere aprobación ejecutiva' }],
  },
  {
    id: 'REQ-1016',
    supplier: 'Cloud Matrix',
    amount: 5300,
    owner: 'María Torres',
    status: 'Rechazada',
    department: 'Tecnología',
    period: 'Previo',
    requestedAt: '2026-06-18',
    description: 'Compra de accesorios de soporte',
    history: [{ date: '2026-06-19', action: 'Rechazada', note: 'Revisión postergada' }],
  },
  {
    id: 'REQ-1017',
    supplier: 'Northline Travel',
    amount: 7400,
    owner: 'Luis Benítez',
    status: 'Aprobada',
    department: 'Operaciones',
    period: 'Actual',
    requestedAt: '2026-07-05',
    description: 'Alquiler de equipamiento',
    history: [{ date: '2026-07-05', action: 'Aprobada', note: 'Aprobada por operaciones' }],
  },
  {
    id: 'REQ-1018',
    supplier: 'Vertex Analytics',
    amount: 15200,
    owner: 'Sofía Gil',
    status: 'Pendiente',
    department: 'Finanzas',
    period: 'Próximo',
    requestedAt: '2026-07-19',
    description: 'Licencias de análisis avanzado',
    history: [{ date: '2026-07-19', action: 'Creada', note: 'Pendiente de presupuesto' }],
  },
  {
    id: 'REQ-1019',
    supplier: 'Aurea Studio',
    amount: 8800,
    owner: 'Pablo Acosta',
    status: 'Aprobada',
    department: 'Marketing',
    period: 'Actual',
    requestedAt: '2026-07-04',
    description: 'Pauta segmentada para demo',
    history: [{ date: '2026-07-04', action: 'Aprobada', note: 'Incluida en plan mensual' }],
  },
  {
    id: 'REQ-1020',
    supplier: 'Lex & Co',
    amount: 12400,
    owner: 'Camila Ríos',
    status: 'Pendiente',
    department: 'Legal',
    period: 'Previo',
    requestedAt: '2026-06-27',
    description: 'Evaluación de términos internacionales',
    history: [{ date: '2026-06-27', action: 'Creada', note: 'Pendiente de responsable' }],
  },
]

const loadRequests = (): PurchaseRequest[] => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return seedRequests
  try {
    const parsed = JSON.parse(raw) as PurchaseRequest[]
    return parsed.length ? parsed : seedRequests
  } catch {
    return seedRequests
  }
}

const persistRequests = (requests: PurchaseRequest[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests))
}

const getMonthTotal = (requests: PurchaseRequest[]) =>
  requests.reduce((sum, request) => sum + request.amount, 0)

const App = () => {
  const [requests, setRequests] = useState<PurchaseRequest[]>(() => loadRequests())
  const [selectedDepartment, setSelectedDepartment] = useState<Department | 'Todas'>('Todas')
  const [selectedStatus, setSelectedStatus] = useState<RequestStatus | 'Todos'>('Todos')
  const [selectedPeriod, setSelectedPeriod] = useState<Period | 'Todos'>('Todos')
  const [selectedId, setSelectedId] = useState(seedRequests[0]?.id ?? '')
  const [actionError, setActionError] = useState('')
  const [newRequest, setNewRequest] = useState({
    supplier: '',
    amount: '',
    owner: '',
    department: 'Tecnología' as Department,
    period: 'Actual' as Period,
    description: '',
  })
  const [approvalNote, setApprovalNote] = useState('')
  const [rejectionNote, setRejectionNote] = useState('')

  useEffect(() => {
    persistRequests(requests)
  }, [requests])

  const visibleRequests = useMemo(
    () =>
      requests.filter((request) => {
        const matchDepartment =
          selectedDepartment === 'Todas' || request.department === selectedDepartment
        const matchStatus = selectedStatus === 'Todos' || request.status === selectedStatus
        const matchPeriod = selectedPeriod === 'Todos' || request.period === selectedPeriod
        return matchDepartment && matchStatus && matchPeriod
      }),
    [requests, selectedDepartment, selectedStatus, selectedPeriod],
  )

  const monthlySpend = useMemo(
    () => getMonthTotal(visibleRequests.filter((request) => request.status !== 'Rechazada')),
    [visibleRequests],
  )
  const approvedSpend = useMemo(
    () =>
      visibleRequests
        .filter((request) => request.status === 'Aprobada')
        .reduce((sum, request) => sum + request.amount, 0),
    [visibleRequests],
  )
  const pendingCount = useMemo(
    () => visibleRequests.filter((request) => request.status === 'Pendiente').length,
    [visibleRequests],
  )
  const availableBudget = Math.max(BUDGET - approvedSpend, 0)
  const byDepartment = useMemo(
    () =>
      departments.map((department) => ({
        department,
        amount: visibleRequests
          .filter((request) => request.department === department && request.status !== 'Rechazada')
          .reduce((sum, request) => sum + request.amount, 0),
      })),
    [visibleRequests],
  )
  const selectedRequest =
    visibleRequests.find((request) => request.id === selectedId) ??
    visibleRequests[0] ??
    requests[0]

  useEffect(() => {
    if (!visibleRequests.some((request) => request.id === selectedId) && visibleRequests[0])
      setSelectedId(visibleRequests[0].id)
  }, [selectedId, visibleRequests])

  const handleDecision = useCallback(
    (nextStatus: RequestStatus, note: string) => {
      if (!selectedRequest || note.trim().length < 3) {
        setActionError('El motivo es obligatorio y debe tener al menos 3 caracteres.')
        return
      }
      setRequests((current) =>
        current.map((request) =>
          request.id === selectedRequest.id
            ? {
                ...request,
                status: nextStatus,
                history: [
                  ...request.history,
                  { date: new Date().toISOString().slice(0, 10), action: nextStatus, note },
                ],
              }
            : request,
        ),
      )
      setActionError('')
      setApprovalNote('')
      setRejectionNote('')
    },
    [selectedRequest],
  )

  const handleSubmitNewRequest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const amount = Number(newRequest.amount)
    if (
      !newRequest.supplier.trim() ||
      !newRequest.owner.trim() ||
      !newRequest.description.trim() ||
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      setActionError('Completá todos los campos con valores válidos.')
      return
    }
    if (amount > availableBudget) {
      setActionError('La nueva solicitud excede el presupuesto disponible.')
      return
    }
    const created: PurchaseRequest = {
      id: `REQ-${Math.floor(Date.now() % 100000)}`,
      supplier: newRequest.supplier,
      amount,
      owner: newRequest.owner,
      status: 'Pendiente',
      department: newRequest.department,
      period: newRequest.period,
      requestedAt: new Date().toISOString().slice(0, 10),
      description: newRequest.description,
      history: [
        {
          date: new Date().toISOString().slice(0, 10),
          action: 'Creada',
          note: 'Solicitud creada desde el formulario',
        },
      ],
    }
    setRequests((current) => [created, ...current])
    setSelectedId(created.id)
    setNewRequest({
      supplier: '',
      amount: '',
      owner: '',
      department: 'Tecnología',
      period: 'Actual',
      description: '',
    })
    setActionError('')
  }

  const exportCsv = () => {
    const rows = [
      ['ID', 'Proveedor', 'Importe', 'Responsable', 'Estado', 'Departamento', 'Período'],
    ]
      .concat(
        visibleRequests.map((request) => [
          request.id,
          request.supplier,
          request.amount.toString(),
          request.owner,
          request.status,
          request.department,
          request.period,
        ]),
      )
      .map((row) => row.map((value) => `"${value.replace(/"/g, '""')}"`).join(','))
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'nexo-spend-solicitudes.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="shell">
      <aside className="sidebar">
        <div>
          <span className="eyebrow">Nexo Spend</span>
          <h1>Portal ejecutivo de compras</h1>
          <p>Demostración: datos ficticios</p>
        </div>
        <nav aria-label="Secciones" className="side-nav">
          <a href="#dashboard">Dashboard</a>
          <a href="#requests">Solicitudes</a>
          <a href="#create">Nueva solicitud</a>
        </nav>
        <div className="sidebar-card">
          <strong>Presupuesto anual</strong>
          <span>{currency.format(BUDGET)}</span>
        </div>
      </aside>
      <main className="app-main" id="main-content">
        <section className="topbar">
          <div>
            <span className="eyebrow">Control de gasto</span>
            <h2>Gestión de compras y aprobaciones</h2>
          </div>
          <button className="ghost" onClick={exportCsv}>
            Exportar CSV
          </button>
        </section>
        <section className="kpi-grid" id="dashboard">
          <article className="kpi-card">
            <span>Gasto mensual</span>
            <strong>{currency.format(monthlySpend)}</strong>
          </article>
          <article className="kpi-card">
            <span>Presupuesto disponible</span>
            <strong>{currency.format(availableBudget)}</strong>
          </article>
          <article className="kpi-card">
            <span>Solicitudes pendientes</span>
            <strong>{pendingCount}</strong>
          </article>
        </section>
        <section className="content-grid">
          <article className="panel">
            <div className="panel-head">
              <h3>Filtros combinables</h3>
              <button
                className="ghost"
                onClick={() => {
                  setSelectedDepartment('Todas')
                  setSelectedStatus('Todos')
                  setSelectedPeriod('Todos')
                }}
              >
                Limpiar
              </button>
            </div>
            <div className="filters-grid">
              <label>
                Departamento
                <select
                  value={selectedDepartment}
                  onChange={(event) =>
                    setSelectedDepartment(event.target.value as Department | 'Todas')
                  }
                >
                  <option>Todas</option>
                  {departments.map((department) => (
                    <option key={department}>{department}</option>
                  ))}
                </select>
              </label>
              <label>
                Estado
                <select
                  value={selectedStatus}
                  onChange={(event) =>
                    setSelectedStatus(event.target.value as RequestStatus | 'Todos')
                  }
                >
                  <option>Todos</option>
                  {statuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </label>
              <label>
                Período
                <select
                  value={selectedPeriod}
                  onChange={(event) => setSelectedPeriod(event.target.value as Period | 'Todos')}
                >
                  <option>Todos</option>
                  {periods.map((period) => (
                    <option key={period}>{period}</option>
                  ))}
                </select>
              </label>
            </div>
          </article>
          <article className="panel chart-panel">
            <div className="panel-head">
              <h3>Distribución por departamento</h3>
              <span>{visibleRequests.length} visibles</span>
            </div>
            <div className="chart-list">
              {byDepartment.map((item) => (
                <div className="bar-row" key={item.department}>
                  <span>{item.department}</span>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${Math.max((item.amount / Math.max(monthlySpend, 1)) * 100, 8)}%`,
                      }}
                    />
                  </div>
                  <strong>{currency.format(item.amount)}</strong>
                </div>
              ))}
            </div>
          </article>
        </section>
        <section className="requests-grid" id="requests">
          <article className="panel table-panel">
            <div className="panel-head">
              <h3>Solicitudes</h3>
              <span>{visibleRequests.length} resultados</span>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Proveedor</th>
                    <th>Importe</th>
                    <th>Responsable</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleRequests.map((request) => (
                    <tr
                      key={request.id}
                      className={request.id === selectedRequest?.id ? 'is-active' : ''}
                      onClick={() => setSelectedId(request.id)}
                    >
                      <td>
                        <strong>{request.supplier}</strong>
                        <span>{request.department}</span>
                      </td>
                      <td>{currency.format(request.amount)}</td>
                      <td>{request.owner}</td>
                      <td>
                        <span className={`status status-${request.status.toLowerCase()}`}>
                          {request.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
          <article className="panel detail-panel" aria-live="polite">
            <div className="panel-head">
              <h3>Detalle</h3>
              <span>{selectedRequest?.id ?? 'Sin selección'}</span>
            </div>
            {selectedRequest ? (
              <div className="detail-stack">
                <p>{selectedRequest.description}</p>
                <dl>
                  <div>
                    <dt>Proveedor</dt>
                    <dd>{selectedRequest.supplier}</dd>
                  </div>
                  <div>
                    <dt>Responsable</dt>
                    <dd>{selectedRequest.owner}</dd>
                  </div>
                  <div>
                    <dt>Importe</dt>
                    <dd>{currency.format(selectedRequest.amount)}</dd>
                  </div>
                  <div>
                    <dt>Estado</dt>
                    <dd>{selectedRequest.status}</dd>
                  </div>
                </dl>
                <div className="history">
                  <h4>Historial</h4>
                  {selectedRequest.history.map((item) => (
                    <div key={`${item.date}-${item.action}`}>
                      <strong>{item.action}</strong>
                      <span>{item.date}</span>
                      <p>{item.note}</p>
                    </div>
                  ))}
                </div>
                <label>
                  Motivo aprobación
                  <textarea
                    value={approvalNote}
                    onChange={(event) => setApprovalNote(event.target.value)}
                    rows={3}
                  />
                </label>
                <div className="action-row">
                  <button onClick={() => handleDecision('Aprobada', approvalNote)}>Aprobar</button>
                  <button
                    className="danger"
                    onClick={() => handleDecision('Rechazada', rejectionNote)}
                  >
                    Rechazar
                  </button>
                </div>
                <label>
                  Motivo rechazo
                  <textarea
                    value={rejectionNote}
                    onChange={(event) => setRejectionNote(event.target.value)}
                    rows={3}
                  />
                </label>
              </div>
            ) : (
              <p>Seleccioná una solicitud para ver su historial y actuar.</p>
            )}
          </article>
        </section>
        <section className="panel create-panel" id="create">
          <div className="panel-head">
            <h3>Nueva solicitud</h3>
            <span>Control de presupuesto</span>
          </div>
          <form className="create-form" onSubmit={handleSubmitNewRequest}>
            <label>
              Proveedor
              <input
                value={newRequest.supplier}
                onChange={(event) =>
                  setNewRequest((current) => ({ ...current, supplier: event.target.value }))
                }
              />
            </label>
            <label>
              Importe
              <input
                type="number"
                min="1"
                value={newRequest.amount}
                onChange={(event) =>
                  setNewRequest((current) => ({ ...current, amount: event.target.value }))
                }
              />
            </label>
            <label>
              Responsable
              <input
                value={newRequest.owner}
                onChange={(event) =>
                  setNewRequest((current) => ({ ...current, owner: event.target.value }))
                }
              />
            </label>
            <label>
              Departamento
              <select
                value={newRequest.department}
                onChange={(event) =>
                  setNewRequest((current) => ({
                    ...current,
                    department: event.target.value as Department,
                  }))
                }
              >
                {departments.map((department) => (
                  <option key={department}>{department}</option>
                ))}
              </select>
            </label>
            <label>
              Período
              <select
                value={newRequest.period}
                onChange={(event) =>
                  setNewRequest((current) => ({ ...current, period: event.target.value as Period }))
                }
              >
                {periods.map((period) => (
                  <option key={period}>{period}</option>
                ))}
              </select>
            </label>
            <label className="span-2">
              Descripción
              <textarea
                value={newRequest.description}
                onChange={(event) =>
                  setNewRequest((current) => ({ ...current, description: event.target.value }))
                }
                rows={3}
              />
            </label>
            <button type="submit" className="submit">
              Crear solicitud
            </button>
          </form>
          {actionError && <p className="error">{actionError}</p>}
        </section>
      </main>
    </div>
  )
}

export default App
