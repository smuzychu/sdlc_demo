import React, { useState } from 'react'
import './App.css'

export function TranslationConsultancyApp() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sourceLang, setSourceLang] = useState('es')
  const [targetLang, setTargetLang] = useState('en')
  const [sourceText, setSourceText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [isTranslating, setIsTranslating] = useState(false)

  // Form states
  const [formData, setFormData] = useState({ name: '', email: '', service: 'tecnica', message: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState('')

  const handleTranslate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!sourceText.trim()) return
    setIsTranslating(true)
    setTranslatedText('')
    setTimeout(() => {
      // Mock professional translation demo response
      const sampleDictionary: Record<string, string> = {
        'hola mundo': 'Hello World',
        'traducción profesional': 'Professional Translation',
        'calidad garantizada': 'Guaranteed Quality',
        'somos una consultora de traducción experta': 'We are an expert translation consultancy',
        'bienvenidos a linguacraft': 'Welcome to LinguaCraft',
      }
      const key = sourceText.toLowerCase().trim()
      if (sampleDictionary[key]) {
        setTranslatedText(sampleDictionary[key])
      } else {
        setTranslatedText(
          `[${targetLang.toUpperCase()}] Demo translation of: "${sourceText}" (Simulated Professional Output)`,
        )
      }
      setIsTranslating(false)
    }, 600)
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError('Por favor completa todos los campos requeridos.')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setFormError('Por favor introduce un correo electrónico válido.')
      return
    }
    setFormSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Header & Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
              LC
            </span>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 block leading-tight">
                LinguaCraft
              </span>
              <span className="text-xs font-medium text-blue-600 tracking-wide uppercase">
                Consultora de Traducción
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <a href="#servicios" className="hover:text-blue-600 transition">
              Servicios
            </a>
            <a href="#demo" className="hover:text-blue-600 transition">
              Demo en Vivo
            </a>
            <a href="#quienes-somos" className="hover:text-blue-600 transition">
              Quiénes Somos
            </a>
            <a
              href="#contacto"
              className="bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition shadow-sm font-semibold"
            >
              Cotizar Proyecto
            </a>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
            aria-label="Menú móvil"
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
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2">
            <a
              href="#servicios"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50"
            >
              Servicios
            </a>
            <a
              href="#demo"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50"
            >
              Demo en Vivo
            </a>
            <a
              href="#quienes-somos"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50"
            >
              Quiénes Somos
            </a>
            <a
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-semibold bg-blue-600 text-white text-center shadow-sm"
            >
              Cotizar Proyecto
            </a>
          </div>
        )}
      </header>

      <main id="main-content" className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-blue-900 via-blue-800 to-slate-900 text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center space-x-2 bg-blue-500/20 border border-blue-400/30 px-4 py-1.5 rounded-full text-blue-200 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Traducción Profesional & Localización Experta</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-6 leading-tight">
              Conectamos tu negocio con{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-teal-300">
                audiencias globales
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              Consultora de traducción freelance especializada en precisión técnica, rigor jurídico
              y adaptabilidad cultural para impulsar tu expansión internacional.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#contacto"
                className="bg-white text-blue-900 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition shadow-lg text-center"
              >
                Solicitar Cotización Gratuita
              </a>
              <a
                href="#demo"
                className="bg-blue-700/60 border border-blue-400/40 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition text-center backdrop-blur"
              >
                Probar Demo Interactiva
              </a>
            </div>
          </div>
        </section>

        {/* Stats / Trust bar */}
        <section className="bg-white border-b border-slate-200 py-10 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-black text-blue-600 mb-1">+10</p>
              <p className="text-sm font-medium text-slate-500">Idiomas Soportados</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-blue-600 mb-1">99.8%</p>
              <p className="text-sm font-medium text-slate-500">Precisión Garantizada</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-blue-600 mb-1">+250</p>
              <p className="text-sm font-medium text-slate-500">Proyectos Exitosos</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-blue-600 mb-1">24/7</p>
              <p className="text-sm font-medium text-slate-500">Atención y Soporte</p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="servicios" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">
              Nuestros Servicios
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              Soluciones lingüísticas a la medida de tus necesidades
            </h3>
            <p className="text-slate-600 text-lg">
              Cada palabra importa. Ofrecemos rigor académico y naturalidad comercial en cada
              disciplina.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold text-2xl mb-6 shadow-inner">
                  ⚖️
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">
                  Traducción Jurídica y Legal
                </h4>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Contratos, actas notariales, poderes y documentos corporativos con validez legal y
                  estricta confidencialidad.
                </p>
              </div>
              <ul className="text-sm text-slate-500 space-y-2 border-t border-slate-100 pt-4">
                <li className="flex items-center">✓ Traducciones certificadas</li>
                <li className="flex items-center">✓ Confidencialidad NDA</li>
                <li className="flex items-center">✓ Terminología especializada</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-blue-200 shadow-md relative flex flex-col justify-between">
              <div className="absolute -top-3 right-6 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Popular
              </div>
              <div>
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold text-2xl mb-6 shadow-inner">
                  ⚙️
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">
                  Traducción Técnica y Científica
                </h4>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Manuales de ingeniería, especificaciones técnicas, patentes, artículos médicos y
                  documentación de software.
                </p>
              </div>
              <ul className="text-sm text-slate-500 space-y-2 border-t border-slate-100 pt-4">
                <li className="flex items-center">✓ Glosarios personalizados</li>
                <li className="flex items-center">✓ Ingeniería y manufactura</li>
                <li className="flex items-center">✓ Validación por expertos</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold text-2xl mb-6 shadow-inner">
                  🌐
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">
                  Localización de Web & Software
                </h4>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Adaptación cultural completa de sitios web, aplicaciones móviles, interfaces UI/UX
                  y campañas de marketing digital.
                </p>
              </div>
              <ul className="text-sm text-slate-500 space-y-2 border-t border-slate-100 pt-4">
                <li className="flex items-center">✓ SEO multilingüe</li>
                <li className="flex items-center">✓ Formatos JSON, PO, XLIFF</li>
                <li className="flex items-center">✓ Adaptación cultural nativa</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Live Translation Demo Section */}
        <section
          id="demo"
          className="py-20 bg-slate-100 border-y border-slate-200 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">
                Prueba Interactiva
              </h2>
              <h3 className="text-3xl font-extrabold text-slate-900 mb-3">
                Experimenta nuestra calidad
              </h3>
              <p className="text-slate-600">
                Introduce un texto corto para probar nuestra simulación de traducción instantánea.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8">
              <form onSubmit={handleTranslate} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Idioma Origen
                    </label>
                    <select
                      value={sourceLang}
                      onChange={(e) => setSourceLang(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:ring-2 focus:ring-blue-600 outline-none"
                    >
                      <option value="es">Español</option>
                      <option value="en">Inglés</option>
                      <option value="fr">Francés</option>
                      <option value="pt">Portugués</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Idioma Destino
                    </label>
                    <select
                      value={targetLang}
                      onChange={(e) => setTargetLang(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:ring-2 focus:ring-blue-600 outline-none"
                    >
                      <option value="en">Inglés</option>
                      <option value="es">Español</option>
                      <option value="fr">Francés</option>
                      <option value="de">Alemán</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Texto a Traducir
                  </label>
                  <textarea
                    rows={3}
                    value={sourceText}
                    onChange={(e) => setSourceText(e.target.value)}
                    placeholder="Ej. Bienvenidos a LinguaCraft..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-4 text-slate-800 focus:ring-2 focus:ring-blue-600 outline-none resize-none"
                  ></textarea>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">
                    Prueba rápida con diccionarios de muestra.
                  </span>
                  <button
                    type="submit"
                    disabled={isTranslating}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition shadow-md disabled:opacity-50"
                  >
                    {isTranslating ? 'Traduciendo...' : 'Traducir Ahora'}
                  </button>
                </div>
              </form>

              {translatedText && (
                <div className="mt-8 p-5 bg-blue-50 border border-blue-200 rounded-xl">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-800 mb-2">
                    Resultado de la Traducción:
                  </h4>
                  <p className="text-slate-800 font-medium text-lg">{translatedText}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="quienes-somos" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3 block">
                Quiénes Somos
              </span>
              <h3 className="text-3xl font-extrabold text-slate-900 mb-6">
                Pasión por la lingüística y rigor profesional
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                LinguaCraft nació como una consultora de traducción freelance independiente liderada
                por traductores nativos certificados con más de 10 años de trayectoria ayudando a
                corporaciones y startups.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                Creemos que una gran traducción va más allá de cambiar palabras de un idioma a otro:
                requiere entender el contexto, el tono de marca y la intención comercial exacta para
                conectar con tu audiencia.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <p className="font-bold text-slate-900 mb-1">Certificación Oficial</p>
                  <p className="text-xs text-slate-500">Traductores colegiados y nativos.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <p className="font-bold text-slate-900 mb-1">Metodología Ágil</p>
                  <p className="text-xs text-slate-500">
                    Entregas puntuales y control de calidad riguroso.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl"></div>
              <h4 className="text-2xl font-bold mb-6">¿Por qué elegir LinguaCraft?</h4>
              <ul className="space-y-4 text-slate-300">
                <li className="flex items-start space-x-3">
                  <span className="text-teal-400 font-bold">✓</span>
                  <span>
                    <strong>Trato directo:</strong> Sin intermediarios ni agencias impersonales.
                    Hablas directamente con el traductor de tu proyecto.
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-teal-400 font-bold">✓</span>
                  <span>
                    <strong>Tecnología CAT:</strong> Uso de SDL Trados, MemoQ y herramientas
                    modernas para garantizar coherencia en todo tu volumen de documentación.
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-teal-400 font-bold">✓</span>
                  <span>
                    <strong>Revisión cruzada:</strong> Todo documento pasa por un doble filtro de
                    corrección de estilo y control ortotipográfico.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contacto" className="py-20 bg-slate-900 text-white px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">
                Contacto Directo
              </h2>
              <h3 className="text-3xl font-extrabold mb-3">
                Solicita tu presupuesto sin compromiso
              </h3>
              <p className="text-slate-400">
                Responderemos a tu solicitud en menos de 2 horas hábiles.
              </p>
            </div>

            {formSubmitted ? (
              <div className="bg-blue-900/60 border border-blue-500/50 rounded-2xl p-8 text-center backdrop-blur">
                <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  ✓
                </div>
                <h4 className="text-2xl font-bold mb-2">¡Mensaje Enviado con Éxito!</h4>
                <p className="text-slate-300 mb-6">
                  Gracias {formData.name}, hemos recibido tu solicitud para el servicio de
                  traducción {formData.service}. Nos pondremos en contacto a través de{' '}
                  {formData.email} a la brevedad.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false)
                    setFormData({ name: '', email: '', service: 'tecnica', message: '' })
                  }}
                  className="bg-white text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleContactSubmit}
                className="bg-slate-800/80 border border-slate-700 rounded-2xl p-8 shadow-xl space-y-6"
              >
                {formError && (
                  <div className="bg-red-500/20 border border-red-500/40 text-red-200 px-4 py-3 rounded-xl text-sm">
                    {formError}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      Tu Nombre *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej. María Pérez"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ejemplo@empresa.com"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Servicio de Interés
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="tecnica">Traducción Técnica y Científica</option>
                    <option value="juridica">Traducción Jurídica y Legal</option>
                    <option value="localizacion">Localización de Web y Software</option>
                    <option value="general">Otro servicio de traducción</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Detalles del Proyecto *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Cuéntanos sobre los idiomas, volumen aproximado de palabras y plazo de entrega..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  ></textarea>
                </div>

                <div className="text-center pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition shadow-lg"
                  >
                    Enviar Solicitud de Cotización
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              LC
            </span>
            <span className="text-white font-bold tracking-tight">
              LinguaCraft Consultora Freelance
            </span>
          </div>
          <p className="text-xs text-slate-500 text-center sm:text-right">
            © {new Date().getFullYear()} LinguaCraft. Todos los derechos reservados. Diseñado para
            traducción global.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default TranslationConsultancyApp
