export interface FiltersProps {
  destination: string
  setDestination: (value: string) => void
  category: string
  setCategory: (value: string) => void
  duration: string
  setDuration: (value: string) => void
  maxPrice: string
  setMaxPrice: (value: string) => void
  clearFilters: () => void
  resultsCount: number
}

export default function Filters({
  destination,
  setDestination,
  category,
  setCategory,
  duration,
  setDuration,
  maxPrice,
  setMaxPrice,
  clearFilters,
  resultsCount,
}: FiltersProps) {
  return (
    <section
      aria-label="Filtros de escapadas"
      className="filters bg-[#F8F5EF] text-[#142B35] rounded-2xl shadow-md p-6 mb-6 max-w-7xl mx-auto"
    >
      <div className="field">
        <label htmlFor="destination">Destino</label>
        <input
          id="destination"
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Buscar por destino"
          className="rounded-lg border border-gray-300 p-2"
        />
      </div>

      <div className="field">
        <label htmlFor="category">Categoría</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-gray-300 p-2"
        >
          <option value="">Todas</option>
          <option value="Montaña">Montaña</option>
          <option value="Playa">Playa</option>
          <option value="Naturaleza">Naturaleza</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="duration">Duración (días)</label>
        <select
          id="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="rounded-lg border border-gray-300 p-2"
        >
          <option value="">Cualquiera</option>
          <option value="1-3">1-3</option>
          <option value="4-6">4-6</option>
          <option value="7+">7+</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="maxPrice">Precio máximo (USD)</label>
        <input
          id="maxPrice"
          type="number"
          min="0"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Ej. 1500"
          className="rounded-lg border border-gray-300 p-2"
        />
      </div>

      <div className="filters__footer">
        <button
          onClick={clearFilters}
          className="bg-[#F28B6B] text-white rounded-lg px-4 py-2 hover:bg-[#e07a5f] focus:outline-none focus:ring-2 focus:ring-[#e07a5f]"
        >
          Limpiar filtros
        </button>
        <span aria-live="polite" aria-atomic="true">
          {resultsCount} resultados
        </span>
      </div>
    </section>
  )
}
