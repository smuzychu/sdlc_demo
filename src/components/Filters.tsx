import React from 'react'

interface FiltersProps {
  filters: {
    destination: string
    category: string
    maxDuration: number
    maxPrice: number
  }
  setFilters: React.Dispatch<React.SetStateAction<FiltersProps['filters']>>
  clearFilters: () => void
  count: number
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters, clearFilters, count }) => {
  return (
    <section
      aria-label="Filtros de escapadas"
      style={{
        padding: '1rem 2rem',
        backgroundColor: '#f8f5ef',
        color: '#142b35',
        maxWidth: '1440px',
        margin: '0 auto',
      }}
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem',
          alignItems: 'end',
        }}
      >
        <div>
          <label htmlFor="destination">Destino</label>
          <input
            id="destination"
            type="text"
            value={filters.destination}
            onChange={(e) => setFilters((f) => ({ ...f, destination: e.target.value }))}
            placeholder="Buscar destino"
            aria-label="Buscar por destino"
          />
        </div>
        <div>
          <label htmlFor="category">Categoría</label>
          <select
            id="category"
            value={filters.category}
            onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
            aria-label="Filtrar por categoría"
          >
            <option value="">Todas</option>
            <option value="Montaña">Montaña</option>
            <option value="Playa">Playa</option>
            <option value="Naturaleza">Naturaleza</option>
          </select>
        </div>
        <div>
          <label htmlFor="maxDuration">Duración máxima (días)</label>
          <input
            id="maxDuration"
            type="number"
            min={0}
            value={filters.maxDuration || ''}
            onChange={(e) =>
              setFilters((f) => ({ ...f, maxDuration: Number(e.target.value) || 0 }))
            }
            aria-label="Filtrar por duración máxima"
          />
        </div>
        <div>
          <label htmlFor="maxPrice">Precio máximo (USD)</label>
          <input
            id="maxPrice"
            type="number"
            min={0}
            value={filters.maxPrice || ''}
            onChange={(e) => setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) || 0 }))}
            aria-label="Filtrar por precio máximo"
          />
        </div>
        <div>
          <button
            type="button"
            onClick={clearFilters}
            style={{
              backgroundColor: '#f28b6b',
              color: '#f8f5ef',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              fontWeight: '600',
              cursor: 'pointer',
              border: 'none',
            }}
          >
            Limpiar filtros
          </button>
        </div>
        <div aria-live="polite" style={{ alignSelf: 'center', fontWeight: '600' }}>
          {count} resultados
        </div>
      </form>
    </section>
  )
}

export default Filters
