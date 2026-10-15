import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-[#F8F5EF] text-[#142B35] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl font-extrabold tracking-tight">Summit Escapes</div>
        </div>

        <nav className="hidden md:flex space-x-8 font-semibold">
          <a
            href="#explorar"
            className="hover:text-[#147D78] focus:text-[#147D78] focus:outline-none"
          >
            Explorar
          </a>
          <a
            href="#como-funciona"
            className="hover:text-[#147D78] focus:text-[#147D78] focus:outline-none"
          >
            Cómo funciona
          </a>
          <a
            href="#preguntas-frecuentes"
            className="hover:text-[#147D78] focus:text-[#147D78] focus:outline-none"
          >
            Preguntas frecuentes
          </a>
          <button
            className="ml-4 bg-[#F28B6B] text-white rounded-lg px-4 py-2 hover:bg-[#e07a5f] focus:outline-none focus:ring-2 focus:ring-[#e07a5f]"
            aria-label="Mis favoritos"
          >
            Mis favoritos
          </button>
        </nav>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#142B35] hover:text-[#147D78] focus:outline-none"
          aria-label="Menú móvil"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <nav
          id="mobile-menu"
          className="md:hidden bg-[#F8F5EF] border-t border-[#147D78] px-4 pt-2 pb-4 space-y-2 font-semibold"
        >
          <a
            href="#explorar"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg hover:bg-[#147D78] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#147D78]"
          >
            Explorar
          </a>
          <a
            href="#como-funciona"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg hover:bg-[#147D78] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#147D78]"
          >
            Cómo funciona
          </a>
          <a
            href="#preguntas-frecuentes"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg hover:bg-[#147D78] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#147D78]"
          >
            Preguntas frecuentes
          </a>
          <button
            className="w-full bg-[#F28B6B] text-white rounded-lg px-4 py-2 hover:bg-[#e07a5f] focus:outline-none focus:ring-2 focus:ring-[#e07a5f]"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Mis favoritos"
          >
            Mis favoritos
          </button>
        </nav>
      )}
    </header>
  )
}
