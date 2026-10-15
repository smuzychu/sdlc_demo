import React from 'react'
import type { Escape } from '../data/escapes'

interface EscapeCardProps {
  escapeItem: Escape
  onViewDetail: (id: string) => void
  onToggleFavorite: (id: string) => void
  isFavorite: boolean
}

export const EscapeCard: React.FC<EscapeCardProps> = ({
  escapeItem,
  onViewDetail,
  onToggleFavorite,
  isFavorite,
}) => {
  return (
    <article
      style={{
        backgroundColor: '#F8F5EF',
        borderRadius: 20,
        boxShadow: '0 4px 8px rgba(20, 43, 53, 0.1)',
        padding: '1rem',
        maxWidth: 320,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}
    >
      <img
        src={escapeItem.image}
        alt={escapeItem.alt}
        style={{ borderRadius: 20, width: '100%', height: 'auto', objectFit: 'cover' }}
      />
      <h3 style={{ color: '#142B35', margin: '0.5rem 0 0 0' }}>{escapeItem.destination}</h3>
      <p style={{ color: '#147D78', fontWeight: '600', margin: 0 }}>{escapeItem.category}</p>
      <p style={{ color: '#142B35', margin: 0 }}>Duración: {escapeItem.duration} días</p>
      <p style={{ color: '#142B35', margin: 0 }}>Precio: ${escapeItem.price} USD</p>
      <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={() => onViewDetail(escapeItem.id)}
          style={{
            backgroundColor: '#147D78',
            color: '#F8F5EF',
            borderRadius: 20,
            padding: '0.5rem 1rem',
            border: 'none',
            cursor: 'pointer',
            flexGrow: 1,
          }}
        >
          Ver detalle
        </button>
        <button
          onClick={() => onToggleFavorite(escapeItem.id)}
          aria-pressed={isFavorite}
          aria-label={
            isFavorite
              ? `Quitar ${escapeItem.destination} de favoritos`
              : `Guardar ${escapeItem.destination} en favoritos`
          }
          style={{
            backgroundColor: isFavorite ? '#F28B6B' : '#147D78',
            color: '#F8F5EF',
            borderRadius: 20,
            padding: '0.5rem 1rem',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {isFavorite ? 'Guardado' : 'Guardar'}
        </button>
      </div>
    </article>
  )
}
