export default function Footer() {
  return (
    <footer className="bg-[#142B35] text-[#F8F5EF] py-8 px-6 mt-16">
      <nav className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="font-bold text-xl">Summit Escapes</div>
        <div className="flex space-x-6">
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
        </div>
      </nav>
      <p className="text-center text-sm mt-6">Demo: destinos y reservas de ejemplo</p>
    </footer>
  )
}
