import React from 'react'
import type { Escape } from '../data/escapes'

interface EscapeCardProps {
  escapeItem: Escape
  isFavorite: boolean
  toggleFavorite: (id: string) => void
  openModal: (id: string) => void
}

const EscapeCard: React.FC<EscapeCardProps> = ({
  escapeItem,
  isFavorite,
  toggleFavorite,
  openModal,
}) => {
  return (
    <article
      style={{
        backgroundColor: '#fff',
        borderRadius: '20px',
        boxShadow: '0 8px 16px rgba(20, 43, 53, 0.1)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
      aria-label={`Escapada a ${escapeItem.destination}`}
    >
      <img
        src={import.meta.env.BASE_URL + escapeItem.image}
        alt={escapeItem.imageAlt}
        style={{ width: '100%', height: '180px', objectFit: 'cover' }}
      />
      <div style={{ padding: '1rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ color: '#142b35', margin: '0 0 0.5rem 0' }}>{escapeItem.destination}</h3>
        <p style={{ margin: '0 0 0.25rem 0', color: '#147d78', fontWeight: '600' }}>
          {escapeItem.category} - {escapeItem.duration} días
        </p>
        <p style={{ margin: '0 0 1rem 0', color: '#f28b6b', fontWeight: '600' }}>
          ${escapeItem.price} USD
        </p>
        <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => openModal(escapeItem.id)}
            style={{
              backgroundColor: '#147d78',
              color: '#f8f5ef',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              fontWeight: '600',
              cursor: 'pointer',
              border: 'none',
              flexGrow: 1,
            }}
            aria-label={`Ver detalle de escapada a ${escapeItem.destination}`}
          >
            Ver detalle
          </button>
          <button
            onClick={() => toggleFavorite(escapeItem.id)}
            aria-pressed={isFavorite}
            aria-label={
              isFavorite
                ? `Quitar ${escapeItem.destination} de favoritos`
                : `Guardar ${escapeItem.destination} en favoritos`
            }
            style={{
              backgroundColor: isFavorite ? '#f28b6b' : '#147d78',
              color: '#f8f5ef',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              fontWeight: '600',
              cursor: 'pointer',
              border: 'none',
              flexGrow: 1,
            }}
          >
            {isFavorite ? 'Guardado' : 'Guardar'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default EscapeCard
