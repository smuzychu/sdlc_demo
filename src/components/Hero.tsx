import React from 'react'

const Hero: React.FC = () => {
  return (
    <section
      id="explorar"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        padding: '2rem',
        backgroundColor: '#f8f5ef',
        color: '#142b35',
        gap: '2rem',
        justifyContent: 'center',
      }}
    >
      <div style={{ flex: '1 1 300px', maxWidth: '600px' }}>
        <span
          style={{
            display: 'inline-block',
            backgroundColor: '#147d78',
            color: '#f8f5ef',
            padding: '0.25rem 0.75rem',
            borderRadius: '12px',
            fontWeight: '600',
            fontSize: '1rem',
            marginBottom: '1rem',
          }}
        >
          Tu próxima pausa empieza acá
        </span>
        <h1 style={{ fontSize: '2.5rem', margin: '0 0 1rem 0' }}>
          Escapate de la rutina. Volvé con historias.
        </h1>
        <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>
          Descubrí destinos únicos y experiencias inolvidables para tu próxima escapada.
        </p>
        <a
          href="#explorar"
          style={{
            display: 'inline-block',
            backgroundColor: '#147d78',
            color: '#f8f5ef',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            fontWeight: '600',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          Explorar escapadas
        </a>
      </div>
      <div style={{ flex: '1 1 300px', maxWidth: '600px' }}>
        <img
          src={import.meta.env.BASE_URL + 'assets/mountain-lake.jpg'}
          alt="Paisaje de lago en las montañas al atardecer"
          style={{
            width: '100%',
            borderRadius: '20px',
            boxShadow: '0 8px 16px rgba(20, 43, 53, 0.25)',
          }}
        />
        <p style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: '#147d78' }}>
          Foto por Vyacheslav Argenberg -
          <a
            href="https://commons.wikimedia.org/wiki/File:Mountain_lake,_Mylgval_mountain_cirque_before_sunset,_Caucasus_Mountains.jpg"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#147d78' }}
          >
            Wikimedia Commons
          </a>
        </p>
      </div>
    </section>
  )
}

export default Hero
