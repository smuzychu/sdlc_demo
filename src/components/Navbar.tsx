import React, { useState, useEffect } from 'react'

interface NavbarProps {
  favoritesCount: number
  onFavoritesClick: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ favoritesCount, onFavoritesClick }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  // Close menu on window resize > 768px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header style={{ backgroundColor: '#F8F5EF', borderBottom: '1px solid #147D78' }}>
      <nav
        aria-label="Navegación principal"
        style={{
          maxWidth: 1440,
          margin: '0 auto',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#142B35' }}>
          Summit Escapes
        </div>

        <button
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: '#147D78',
            fontSize: '1.5rem',
            cursor: 'pointer',
            display: 'none',
          }}
          className="mobile-menu-button"
        >
          ☰
        </button>

        <ul
          id="mobile-menu"
          style={{
            listStyle: 'none',
            display: 'flex',
            gap: '1.5rem',
            margin: 0,
            padding: 0,
          }}
          className={menuOpen ? 'open' : 'closed'}
        >
          <li>
            <a href="#explore" style={{ color: '#142B35', fontWeight: '600' }}>
              Explorar
            </a>
          </li>
          <li>
            <a href="#how-it-works" style={{ color: '#142B35', fontWeight: '600' }}>
              Cómo funciona
            </a>
          </li>
          <li>
            <a href="#faq" style={{ color: '#142B35', fontWeight: '600' }}>
              Preguntas frecuentes
            </a>
          </li>
          <li>
            <button
              onClick={onFavoritesClick}
              aria-label={`Mis favoritos, ${favoritesCount} destinos guardados`}
              style={{
                backgroundColor: '#147D78',
                color: '#F8F5EF',
                borderRadius: 20,
                padding: '0.5rem 1rem',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Mis favoritos ({favoritesCount})
            </button>
          </li>
        </ul>
      </nav>
      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-button {
            display: block !important;
          }
          #mobile-menu {
            display: none;
            flex-direction: column;
            gap: 1rem;
            background-color: #f8f5ef;
            padding: 1rem;
            border-top: 1px solid #147d78;
          }
          #mobile-menu.open {
            display: flex;
          }
        }
      `}</style>
    </header>
  )
}
