export default function Hero() {
  return (
    <section
      id="hero"
      className="bg-[#F8F5EF] text-[#142B35] py-16 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
    >
      <div>
        <p className="text-sm font-semibold text-[#147D78] uppercase mb-2">
          Tu próxima pausa empieza acá
        </p>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
          Escapate de la rutina. Volvé con historias.
        </h1>
        <p className="mb-6 max-w-lg">
          Descubrí destinos únicos y experiencias inolvidables para tu próxima escapada.
        </p>
        <a
          href="#explorar"
          className="inline-block bg-[#F28B6B] text-white rounded-2xl px-8 py-3 font-semibold hover:bg-[#e07a5f] focus:outline-none focus:ring-2 focus:ring-[#e07a5f]"
        >
          Explorar escapadas
        </a>
      </div>
      <div aria-hidden="true" className="flex justify-center">
        <svg
          width="320"
          height="240"
          viewBox="0 0 320 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Ilustración de paisaje con montañas, costa y bosque"
        >
          <rect width="320" height="240" fill="#F8F5EF" />
          {/* Montañas */}
          <polygon points="40,200 80,120 120,200" fill="#147D78" />
          <polygon points="70,200 110,140 150,200" fill="#F28B6B" />
          {/* Costa */}
          <rect x="160" y="160" width="120" height="40" fill="#147D78" />
          <circle cx="220" cy="160" r="20" fill="#F28B6B" />
          {/* Bosque */}
          <rect x="260" y="100" width="40" height="80" fill="#147D78" />
          <polygon points="260,100 280,60 300,100" fill="#F28B6B" />
        </svg>
      </div>
    </section>
  )
}
