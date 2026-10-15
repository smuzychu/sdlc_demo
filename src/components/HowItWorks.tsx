import React from 'react'

const HowItWorks: React.FC = () => {
  return (
    <section
      id="como-funciona"
      style={{
        backgroundColor: '#f8f5ef',
        color: '#142b35',
        padding: '2rem',
        maxWidth: '1440px',
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Cómo funciona</h2>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '2rem',
        }}
      >
        <div style={{ flex: '1 1 200px', maxWidth: '300px' }}>
          <h3>1. Explorar</h3>
          <p>Buscá escapadas según tus gustos y necesidades.</p>
        </div>
        <div style={{ flex: '1 1 200px', maxWidth: '300px' }}>
          <h3>2. Reservar</h3>
          <p>Completá el formulario de reserva con tus datos.</p>
        </div>
        <div style={{ flex: '1 1 200px', maxWidth: '300px' }}>
          <h3>3. Disfrutar</h3>
          <p>Viví una experiencia inolvidable y volvé con historias.</p>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
