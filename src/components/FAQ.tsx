import { useState } from 'react'

const faqs = [
  {
    question: '¿Cómo puedo reservar una escapada?',
    answer:
      'Seleccioná una escapada del catálogo, abrí el detalle y completá el formulario de reserva. La confirmación es solo una demostración.',
  },
  {
    question: '¿Se requiere un backend para esta demo?',
    answer: 'No, toda la experiencia es estática y los datos se manejan localmente.',
  },
  {
    question: '¿Puedo guardar mis escapadas favoritas?',
    answer:
      'Sí, los favoritos se guardan en localStorage y se pueden consultar en cualquier momento.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      id="preguntas-frecuentes"
      className="bg-[#F8F5EF] text-[#142B35] py-16 px-6 max-w-7xl mx-auto rounded-2xl shadow-md"
      aria-label="Preguntas frecuentes"
    >
      <h2 className="text-3xl font-extrabold mb-8 text-center">Preguntas frecuentes</h2>
      <dl className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div key={index}>
            <dt>
              <button
                aria-expanded={openIndex === index}
                aria-controls={`faq-desc-${index}`}
                id={`faq-btn-${index}`}
                onClick={() => toggle(index)}
                className="w-full text-left font-semibold text-[#147D78] rounded-lg p-3 hover:bg-[#147D78] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#147D78]"
              >
                {faq.question}
              </button>
            </dt>
            <dd
              id={`faq-desc-${index}`}
              role="region"
              aria-labelledby={`faq-btn-${index}`}
              className={`overflow-hidden transition-max-height duration-300 ease-in-out px-3 pt-2 text-[#142B35] ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <p>{faq.answer}</p>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
