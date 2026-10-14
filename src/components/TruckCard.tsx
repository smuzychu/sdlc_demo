import type { Truck } from '../domain/truck'
import { TRUCK_STATUS_LABELS } from '../domain/truck'
import { Button } from './Button'

type TruckCardProps = {
  truck: Truck
  onEdit: (truck: Truck) => void
  onDelete: (truck: Truck) => void
}

export const TruckCard = ({ truck, onEdit, onDelete }: TruckCardProps) => {
  return (
    <article className={`task-card task-card--${truck.status}`}>
      <div className="task-card__header">
        <div>
          <span className={`badge badge--${truck.status}`}>
            {TRUCK_STATUS_LABELS[truck.status]}
          </span>
          <span className="task-card__due">Velocidad: {truck.speedKmH} km/h</span>
        </div>
        <div className="task-card__actions">
          <button
            className="icon-button"
            onClick={() => onEdit(truck)}
            aria-label={`Editar camión ${truck.plate}`}
          >
            ✏️
          </button>
          <button
            className="icon-button"
            onClick={() => onDelete(truck)}
            aria-label={`Eliminar camión ${truck.plate}`}
          >
            🗑️
          </button>
        </div>
      </div>

      <h3 className="task-card__title">
        {truck.plate} <small style={{ fontWeight: 'normal', fontSize: '0.85rem' }}>({truck.driver})</small>
      </h3>
      <p className="task-card__description">📍 {truck.location}</p>

      <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem' }}>
        <strong>Sensores activos:</strong>
        <ul style={{ margin: '0.25rem 0 0 1rem', padding: 0 }}>
          {truck.sensors.map((s) => (
            <li key={s.sensorId}>
              {s.type}: {s.value} {s.unit} ({s.status})
            </li>
          ))}
        </ul>
      </div>

      <div className="task-card__footer" style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        Último movimiento: {new Date(truck.lastMovementTime).toLocaleTimeString()}
      </div>
    </article>
  )
}
