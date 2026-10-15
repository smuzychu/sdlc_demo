import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: '#f8f5ef',
        color: '#142b35',
        padding: '1rem 2rem',
        borderTop: '1px solid #147d78',
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}
    >
      <nav>
        <a href="#explorar" style={{ marginRight: '1rem', color: '#147d78', fontWeight: '600' }}>
          Explorar
        </a>
        <a
          href="#como-funciona"
          style={{ marginRight: '1rem', color: '#147d78', fontWeight: '600' }}
        >
          Cómo funciona
        </a>
        <a href="#preguntas-frecuentes" style={{ color: '#147d78', fontWeight: '600' }}>
          Preguntas frecuentes
        </a>
      </nav>
      <p style={{ fontSize: '0.875rem', margin: 0 }}>Demo: destinos y reservas de ejemplo</p>
    </footer>
  )
}

export default Footer
