import React, { useState } from 'react'

interface HeaderProps {
  favoritesCount: number
}

const Header: React.FC<HeaderProps> = ({ favoritesCount }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <header
      style={{
        backgroundColor: '#f8f5ef',
        padding: '1rem 2rem',
        borderBottom: '1px solid #147d78',
      }}
    >
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#142b35' }}>
          Summit Escapes
        </div>
        <button
          aria-label="Menú móvil"
          aria-expanded={menuOpen}
          onClick={toggleMenu}
          style={{
            background: 'none',
            border: 'none',
            color: '#142b35',
            fontSize: '1.5rem',
            cursor: 'pointer',
            display: 'none',
          }}
          className="mobile-menu-button"
        >
          ☰
        </button>
        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            gap: '1.5rem',
            margin: 0,
            padding: 0,
          }}
          className={menuOpen ? 'open' : ''}
        >
          <li>
            <a href="#explorar" style={{ color: '#142b35', fontWeight: '600' }}>
              Explorar
            </a>
          </li>
          <li>
            <a href="#como-funciona" style={{ color: '#142b35', fontWeight: '600' }}>
              Cómo funciona
            </a>
          </li>
          <li>
            <a href="#preguntas-frecuentes" style={{ color: '#142b35', fontWeight: '600' }}>
              Preguntas frecuentes
            </a>
          </li>
          <li>
            <button
              aria-label="Mis favoritos"
              style={{
                backgroundColor: '#147d78',
                color: '#f8f5ef',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                fontWeight: '600',
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
            display: block;
          }
          ul {
            display: none;
            flex-direction: column;
            gap: 1rem;
            background-color: #f8f5ef;
            padding: 1rem 2rem;
            position: absolute;
            top: 60px;
            right: 0;
            width: 200px;
            box-shadow: 0 8px 16px rgba(20, 43, 53, 0.25);
            border-radius: 8px;
          }
          ul.open {
            display: flex;
          }
        }
      `}</style>
    </header>
  )
}

export default Header
