import { useState } from 'react'
import type { Truck, TruckInput, TruckStatus } from '../domain/truck'

type TruckFormProps = {
  truck?: Truck
  onSubmit: (input: TruckInput) => void
  onCancel: () => void
}

export const TruckForm = ({ truck, onSubmit, onCancel }: TruckFormProps) => {
  const [plate, setPlate] = useState(truck?.plate ?? '')
  const [driver, setDriver] = useState(truck?.driver ?? '')
  const [status, setStatus] = useState<TruckStatus>(truck?.status ?? 'activo')
  const [location, setLocation] = useState(truck?.location ?? '')
  const [speedKmH, setSpeedKmH] = useState(truck?.speedKmH ?? 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ plate, driver, status, location, speedKmH })
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="plate-input">Patente</label>
        <input
          id="plate-input"
          type="text"
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
          required
          autoFocus
        />
      </div>

      <div className="form-group">
        <label htmlFor="driver-input">Chofer</label>
        <input
          id="driver-input"
          type="text"
          value={driver}
          onChange={(e) => setDriver(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="status-select">Estado</label>
        <select
          id="status-select"
          value={status}
          onChange={(e) => setStatus(e.target.value as TruckStatus)}
          required
        >
          <option value="activo">Activo</option>
          <option value="detenido">Detenido</option>
          <option value="alerta">Alerta sensor</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="location-input">Ubicación</label>
        <input
          id="location-input"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="speed-input">Velocidad (km/h)</label>
        <input
          id="speed-input"
          type="number"
          value={speedKmH}
          onChange={(e) => setSpeedKmH(Number(e.target.value))}
          min={0}
          max={200}
          required
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="button button--primary">
          Guardar
        </button>
        <button type="button" className="button button--secondary" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  )
}
