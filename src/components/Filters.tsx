import React from 'react'

interface FiltersProps {
  destination: string
  setDestination: (value: string) => void
  category: string
  setCategory: (value: string) => void
  duration: number | null
  setDuration: (value: number | null) => void
  maxPrice: number | null
  setMaxPrice: (value: number | null) => void
  onClear: () => void
}

export const Filters: React.FC<FiltersProps> = ({
  destination,
  setDestination,
  category,
  setCategory,
  duration,
  setDuration,
  maxPrice,
  setMaxPrice,
  onClear,
}) => {
  return (
    <section
      aria-label="Filtros de búsqueda"
      style={{
        backgroundColor: '#F8F5EF',
        padding: '1rem',
        borderRadius: 20,
        boxShadow: '0 4px 8px rgba(20, 43, 53, 0.1)',
        marginBottom: '2rem',
        maxWidth: 1440,
        margin: '0 auto',
      }}
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr', maxWidth: 600 }}
      >
        <label htmlFor="destination-input">Destino</label>
        <input
          id="destination-input"
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Buscar por destino"
          aria-label="Buscar por destino"
          style={{ padding: '0.5rem', borderRadius: 8, border: '1px solid #ccc' }}
        />

        <fieldset>
          <legend>Categoría</legend>
          <label>
            <input
              type="radio"
              name="category"
              value=""
              checked={category === ''}
              onChange={() => setCategory('')}
            />
            Todas
          </label>
          <label>
            <input
              type="radio"
              name="category"
              value="Montaña"
              checked={category === 'Montaña'}
              onChange={() => setCategory('Montaña')}
            />
            Montaña
          </label>
          <label>
            <input
              type="radio"
              name="category"
              value="Playa"
              checked={category === 'Playa'}
              onChange={() => setCategory('Playa')}
            />
            Playa
          </label>
          <label>
            <input
              type="radio"
              name="category"
              value="Naturaleza"
              checked={category === 'Naturaleza'}
              onChange={() => setCategory('Naturaleza')}
            />
            Naturaleza
          </label>
        </fieldset>

        <label htmlFor="duration-input">Duración (días)</label>
        <select
          id="duration-input"
          value={duration ?? ''}
          onChange={(e) => setDuration(e.target.value ? Number(e.target.value) : null)}
          aria-label="Filtrar por duración"
          style={{ padding: '0.5rem', borderRadius: 8, border: '1px solid #ccc' }}
        >
          <option value="">Cualquier duración</option>
          <option value="3">3 días</option>
          <option value="4">4 días</option>
          <option value="5">5 días</option>
          <option value="6">6 días</option>
          <option value="7">7 días</option>
        </select>

        <label htmlFor="price-input">Precio máximo (USD)</label>
        <input
          id="price-input"
          type="number"
          min="0"
          value={maxPrice ?? ''}
          onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : null)}
          placeholder="Ejemplo: 1000"
          aria-label="Filtrar por precio máximo"
          style={{ padding: '0.5rem', borderRadius: 8, border: '1px solid #ccc' }}
        />

        <div className="filters__footer">
          <button
            type="button"
            onClick={onClear}
            style={{
              backgroundColor: '#F28B6B',
              color: '#F8F5EF',
              borderRadius: 20,
              padding: '0.5rem 1rem',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Limpiar filtros
          </button>
          <span aria-live="polite" aria-atomic="true" style={{ color: '#142B35' }}>
            {/* El contador de resultados se mostrará en el componente padre */}
          </span>
        </div>
      </form>
      <style>{`
        fieldset {
          border: none;
          padding: 0;
          margin: 0 0 1rem 0;
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        fieldset label {
          cursor: pointer;
          user-select: none;
        }
      `}</style>
    </section>
  )
}
