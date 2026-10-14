export const TRUCK_STATUSES = ['activo', 'detenido', 'alerta'] as const
export const SENSOR_TYPES = ['movimiento', 'velocidad', 'temperatura'] as const

export type TruckStatus = (typeof TRUCK_STATUSES)[number]
export type SensorType = (typeof SENSOR_TYPES)[number]

export type SensorTelemetry = {
  sensorId: string
  type: SensorType
  value: number
  unit: string
  status: 'normal' | 'warning' | 'danger'
  timestamp: string
}

export type Truck = {
  id: string
  plate: string
  driver: string
  status: TruckStatus
  location: string
  speedKmH: number
  lastMovementTime: string
  sensors: SensorTelemetry[]
  updatedAt: string
}

export type TruckInput = Pick<Truck, 'plate' | 'driver' | 'status' | 'location' | 'speedKmH'>

export const TRUCK_STATUS_LABELS: Record<TruckStatus, string> = {
  activo: 'Activo',
  detenido: 'Detenido',
  alerta: 'Alerta sensor',
}

export const createTruck = (input: TruckInput): Truck => {
  const now = new Date().toISOString()
  return {
    id: crypto.randomUUID(),
    ...input,
    lastMovementTime: now,
    sensors: [
      {
        sensorId: `sens-${Math.floor(Math.random() * 900) + 100}`,
        type: 'movimiento',
        value: input.speedKmH > 0 ? 1 : 0,
        unit: 'bool',
        status: input.speedKmH > 120 ? 'warning' : 'normal',
        timestamp: now,
      },
    ],
    updatedAt: now,
  }
}

export const updateTruck = (truck: Truck, input: TruckInput): Truck => {
  const now = new Date().toISOString()
  return {
    ...truck,
    ...input,
    lastMovementTime: input.speedKmH > 0 ? now : truck.lastMovementTime,
    updatedAt: now,
  }
}

export const isTruck = (value: unknown): value is Truck => {
  if (!value || typeof value !== 'object') return false
  const t = value as Partial<Truck>
  return (
    typeof t.id === 'string' &&
    typeof t.plate === 'string' &&
    typeof t.driver === 'string' &&
    TRUCK_STATUSES.includes(t.status as TruckStatus) &&
    typeof t.location === 'string' &&
    typeof t.speedKmH === 'number'
  )
}
