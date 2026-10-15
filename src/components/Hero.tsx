import React from 'react'

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      aria-label="Tu próxima pausa empieza acá"
      style={{
        backgroundColor: '#F8F5EF',
        padding: '2rem 1rem',
        maxWidth: 1440,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '2rem',
      }}
    >
      <div style={{ maxWidth: 600 }}>
        <p
          style={{
            color: '#147D78',
            fontWeight: '600',
            fontSize: '1.25rem',
            marginBottom: '0.5rem',
          }}
        >
          Tu próxima pausa empieza acá
        </p>
        <h1
          style={{
            color: '#142B35',
            fontSize: '2.5rem',
            marginTop: 0,
            marginBottom: '1rem',
          }}
        >
          Escapate de la rutina. Volvé con historias.
        </h1>
        <p style={{ color: '#142B35', fontSize: '1rem', marginBottom: '1.5rem' }}>
          Descubrí destinos únicos y experiencias inolvidables para tu próxima escapada.
        </p>
        <a
          href="#explore"
          style={{
            backgroundColor: '#147D78',
            color: '#F8F5EF',
            padding: '0.75rem 1.5rem',
            borderRadius: 20,
            textDecoration: 'none',
            fontWeight: '600',
            display: 'inline-block',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#125d5d')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#147D78')}
          onFocus={(e) => (e.currentTarget.style.backgroundColor = '#125d5d')}
          onBlur={(e) => (e.currentTarget.style.backgroundColor = '#147D78')}
        >
          Explorar escapadas
        </a>
      </div>
      <div
        aria-hidden="true"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src="/assets/mountain-hero.svg"
          alt="Ilustración de paisaje montañoso"
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: 20,
            boxShadow: '0 8px 16px rgba(20, 43, 53, 0.25)',
          }}
        />
      </div>
      <style>{`
        @media (min-width: 768px) {
          section#hero {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (min-width: 1440px) {
          section#hero {
            max-width: 1440px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  )
}
