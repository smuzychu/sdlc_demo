import type { TruckStatus } from '../domain/truck'

export type TruckFiltersValue = {
  search: string
  status: TruckStatus | 'all'
}

type TruckFiltersProps = {
  value: TruckFiltersValue
  resultCount: number
  onChange: (value: TruckFiltersValue) => void
  onClear: () => void
}

export const TruckFilters = ({
  value,
  resultCount,
  onChange,
  onClear,
}: TruckFiltersProps) => {
  const hasFilters = value.search !== '' || value.status !== 'all'

  return (
    <section className="filters-section" aria-label="Filtros de camiones">
      <div className="filters-grid">
        <div className="filter-group">
          <label htmlFor="search-input">Buscar camión o conductor</label>
          <input
            id="search-input"
            type="search"
            placeholder="Patente, chofer o ubicación..."
            value={value.search}
            onChange={(e) => onChange({ ...value, search: e.target.value })}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="status-filter">Estado</label>
          <select
            id="status-filter"
            value={value.status}
            onChange={(e) => onChange({ ...value, status: e.target.value as TruckStatus | 'all' })}
          >
            <option value="all">Todos los estados</option>
            <option value="activo">Activo</option>
            <option value="detenido">Detenido</option>
            <option value="alerta">Alerta sensor</option>
          </select>
        </div>
      </div>

      <div className="filters-footer">
        <span className="result-count">
          Mostrando <strong>{resultCount}</strong> camiones
        </span>
        {hasFilters ? (
          <button className="text-button" onClick={onClear}>
            Limpiar filtros
          </button>
        ) : null}
      </div>
    </section>
  )
}
