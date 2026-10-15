export type Department =
  'Tecnología' | 'Marketing' | 'Operaciones' | 'Finanzas' | 'Recursos Humanos'

export type SpendStatus = 'Pendiente' | 'Aprobado' | 'Rechazado'

export interface HistoryItem {
  id: string
  date: string
  author: string
  action: string
  comment?: string
}

export interface SpendItem {
  id: string
  code: string
  title: string
  supplier: string
  amount: number
  currency: string
  requester: string
  department: Department
  status: SpendStatus
  date: string // YYYY-MM-DD
  period: string // YYYY-MM (e.g. '2025-03')
  description: string
  category: string
  history: HistoryItem[]
  rejectionReason?: string
}

export interface SpendBudget {
  monthlyLimit: number
  totalSpent: number
  pendingAmount: number
  availableBudget: number
}
