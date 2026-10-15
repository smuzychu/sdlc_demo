import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: '#147D78',
        color: '#F8F5EF',
        padding: '1rem 1.5rem',
        maxWidth: 1440,
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <nav aria-label="Navegación de pie de página">
        <a href="#explore" style={{ color: '#F8F5EF', marginRight: '1rem' }}>
          Explorar
        </a>
        <a href="#how-it-works" style={{ color: '#F8F5EF', marginRight: '1rem' }}>
          Cómo funciona
        </a>
        <a href="#faq" style={{ color: '#F8F5EF' }}>
          Preguntas frecuentes
        </a>
      </nav>
      <p style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
        &copy; 2024 Summit Escapes. Fotos y créditos en la sección de destinos.
      </p>
    </footer>
  )
}
