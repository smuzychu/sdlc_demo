import React from 'react'
import type { Escape } from '../data/escapes'
import { EscapeCard } from './EscapeCard'

interface CatalogProps {
  escapes: Escape[]
  favorites: Set<string>
  onViewDetail: (id: string) => void
  onToggleFavorite: (id: string) => void
}

export const Catalog: React.FC<CatalogProps> = ({
  escapes,
  favorites,
  onViewDetail,
  onToggleFavorite,
}) => {
  if (escapes.length === 0) {
    return (
      <section
        aria-live="polite"
        aria-atomic="true"
        style={{
          textAlign: 'center',
          padding: '2rem',
          color: '#142B35',
          maxWidth: 1440,
          margin: '0 auto',
        }}
      >
        <p>No se encontraron escapadas con esos filtros.</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            backgroundColor: '#F28B6B',
            color: '#F8F5EF',
            borderRadius: 20,
            padding: '0.5rem 1rem',
            border: 'none',
            cursor: 'pointer',
            marginTop: '1rem',
          }}
        >
          Restablecer filtros
        </button>
      </section>
    )
  }

  return (
    <section
      id="explore"
      aria-label="Catálogo de escapadas"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem',
        maxWidth: 1440,
        margin: '0 auto',
        padding: '1rem',
      }}
    >
      {escapes.map((escapeItem) => (
        <EscapeCard
          key={escapeItem.id}
          escapeItem={escapeItem}
          onViewDetail={onViewDetail}
          onToggleFavorite={onToggleFavorite}
          isFavorite={favorites.has(escapeItem.id)}
        />
      ))}
    </section>
  )
}
