import React from 'react'

export const HowItWorks: React.FC = () => {
  return (
    <section
      id="how-it-works"
      aria-label="Cómo funciona"
      style={{
        backgroundColor: '#F8F5EF',
        padding: '2rem 1rem',
        maxWidth: 1440,
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <h2 style={{ color: '#142B35', fontSize: '2rem', marginBottom: '1rem' }}>Cómo funciona</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2rem',
          maxWidth: 900,
          margin: '0 auto',
        }}
      >
        <article>
          <h3 style={{ color: '#147D78', fontSize: '1.5rem' }}>1. Explorar</h3>
          <p style={{ color: '#142B35' }}>
            Navegá por el catálogo y usá los filtros para encontrar tu escapada ideal.
          </p>
        </article>
        <article>
          <h3 style={{ color: '#147D78', fontSize: '1.5rem' }}>2. Reservar</h3>
          <p style={{ color: '#142B35' }}>
            Abrí el detalle de la escapada, completá el formulario y confirmá tu reserva.
          </p>
        </article>
        <article>
          <h3 style={{ color: '#147D78', fontSize: '1.5rem' }}>3. Disfrutar</h3>
          <p style={{ color: '#142B35' }}>
            Prepará tu viaje y viví experiencias inolvidables con Summit Escapes.
          </p>
        </article>
      </div>
    </section>
  )
}
