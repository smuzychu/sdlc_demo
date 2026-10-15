import type { Escape } from '../data/escapes'
import Card from './Card'

export interface CatalogProps {
  escapes: Escape[]
  onViewDetail: (escape: Escape) => void
  onToggleFavorite: (id: string) => void
  favorites: Set<string>
}

export default function Catalog({
  escapes,
  onViewDetail,
  onToggleFavorite,
  favorites,
}: CatalogProps) {
  if (escapes.length === 0) {
    return (
      <section className="empty-state max-w-7xl mx-auto p-8 rounded-2xl border border-dashed border-gray-400">
        <p>No se encontraron escapadas con esos filtros.</p>
        <button
          onClick={() => onToggleFavorite('')}
          className="mt-4 bg-[#F28B6B] text-white rounded-lg px-4 py-2 hover:bg-[#e07a5f] focus:outline-none focus:ring-2 focus:ring-[#e07a5f]"
          aria-label="Restablecer filtros"
        >
          Restablecer filtros
        </button>
      </section>
    )
  }

  return (
    <section
      id="explorar"
      aria-label="Catálogo de escapadas"
      className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
    >
      {escapes.map((escape) => (
        <Card
          key={escape.id}
          escape={escape}
          onViewDetail={onViewDetail}
          onToggleFavorite={onToggleFavorite}
          isFavorite={favorites.has(escape.id)}
        />
      ))}
    </section>
  )
}
