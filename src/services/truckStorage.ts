import { isTruck, type Truck } from '../domain/truck'

const STORAGE_KEY = 'truckmonitor.fleet.v1'

export const loadTrucks = (fallback: Truck[]): Truck[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return fallback

    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return fallback

    const validTrucks = parsed.filter(isTruck)
    return validTrucks.length === parsed.length ? validTrucks : fallback
  } catch {
    return fallback
  }
}

export const saveTrucks = (trucks: Truck[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trucks))
}

export const clearStoredTrucks = (): void => {
  localStorage.removeItem(STORAGE_KEY)
}
