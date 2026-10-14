import { useEffect, useMemo, useReducer } from 'react'
import { initialTrucks } from '../data/initialTrucks'
import { createTruck, updateTruck, type Truck, type TruckInput } from '../domain/truck'
import { loadTrucks, saveTrucks } from '../services/truckStorage'

type TruckAction =
  | { type: 'create'; input: TruckInput }
  | { type: 'update'; id: string; input: TruckInput }
  | { type: 'delete'; id: string }
  | { type: 'replace'; trucks: Truck[] }
  | { type: 'simulateTelemetry' }

const reducer = (state: Truck[], action: TruckAction): Truck[] => {
  switch (action.type) {
    case 'create':
      return [createTruck(action.input), ...state]
    case 'update':
      return state.map((truck) => (truck.id === action.id ? updateTruck(truck, action.input) : truck))
    case 'delete':
      return state.filter((truck) => truck.id !== action.id)
    case 'replace':
      return action.trucks
    case 'simulateTelemetry':
      return state.map((truck) => {
        // Simula variación aleatoria de telemetría de movimiento
        const speedDelta = Math.floor(Math.random() * 11) - 5
        const newSpeed = Math.max(0, truck.speedKmH + speedDelta)
        const newStatus = newSpeed === 0 ? 'detenido' : newSpeed > 110 ? 'alerta' : 'activo'
        const now = new Date().toISOString()

        return {
          ...truck,
          speedKmH: newSpeed,
          status: newStatus,
          lastMovementTime: newSpeed > 0 ? now : truck.lastMovementTime,
          updatedAt: now,
          sensors: truck.sensors.map((s) =>
            s.type === 'movimiento'
              ? { ...s, value: newSpeed > 0 ? 1 : 0, timestamp: now }
              : s.type === 'velocidad'
                ? { ...s, value: newSpeed, timestamp: now }
                : s,
          ),
        }
      })
  }
}

export const useTrucks = () => {
  const [trucks, dispatch] = useReducer(reducer, initialTrucks, (fallback) => loadTrucks(fallback))

  useEffect(() => {
    saveTrucks(trucks)
  }, [trucks])

  // Polling automático cada 5 segundos para simular sensores en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'simulateTelemetry' })
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const stats = useMemo(
    () => ({
      total: trucks.length,
      activo: trucks.filter((t) => t.status === 'activo').length,
      detenido: trucks.filter((t) => t.status === 'detenido').length,
      alerta: trucks.filter((t) => t.status === 'alerta').length,
    }),
    [trucks],
  )

  return {
    trucks,
    stats,
    createTruck: (input: TruckInput) => dispatch({ type: 'create', input }),
    updateTruck: (id: string, input: TruckInput) => dispatch({ type: 'update', id, input }),
    deleteTruck: (id: string) => dispatch({ type: 'delete', id }),
    resetTrucks: () => dispatch({ type: 'replace', trucks: initialTrucks }),
    simulateTelemetry: () => dispatch({ type: 'simulateTelemetry' }),
  }
}
