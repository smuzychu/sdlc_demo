import React from 'react'
import type { Escape } from '../data/escapes'
import EscapeCard from './EscapeCard'

interface CatalogProps {
  escapes: Escape[]
  favorites: string[]
  toggleFavorite: (id: string) => void
  openModal: (id: string) => void
}

const Catalog: React.FC<CatalogProps> = ({ escapes, favorites, toggleFavorite, openModal }) => {
  if (escapes.length === 0) {
    return (
      <section
        aria-live="polite"
        style={{
          padding: '2rem',
          textAlign: 'center',
          color: '#142b35',
          backgroundColor: '#f8f5ef',
        }}
      >
        <p>No se encontraron escapadas con esos filtros.</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            backgroundColor: '#147d78',
            color: '#f8f5ef',
            borderRadius: '8px',
            padding: '0.5rem 1rem',
            fontWeight: '600',
            cursor: 'pointer',
            border: 'none',
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
      id="catalog"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        padding: '2rem',
        maxWidth: '1440px',
        margin: '0 auto',
        backgroundColor: '#f8f5ef',
      }}
    >
      {escapes.map((escapeItem) => (
        <EscapeCard
          key={escapeItem.id}
          escapeItem={escapeItem}
          isFavorite={favorites.includes(escapeItem.id)}
          toggleFavorite={toggleFavorite}
          openModal={openModal}
        />
      ))}
    </section>
  )
}

export default Catalog
