import React, { useState } from 'react'

const faqs = [
  {
    question: '¿Cómo puedo reservar una escapada?',
    answer:
      'Seleccioná una escapada del catálogo, abrí el detalle y completá el formulario de reserva con tus datos.',
  },
  {
    question: '¿Necesito pagar para hacer una reserva?',
    answer: 'No, esta es una demostración y no se procesan pagos ni se envían datos.',
  },
  {
    question: '¿Puedo guardar mis escapadas favoritas?',
    answer: 'Sí, podés guardar escapadas en favoritos y consultarlas en cualquier momento.',
  },
  {
    question: '¿La página es accesible para personas con discapacidad?',
    answer:
      'Sí, la página cumple con criterios de accesibilidad, incluyendo navegación por teclado y lectores de pantalla.',
  },
]

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      id="faq"
      aria-label="Preguntas frecuentes"
      style={{
        backgroundColor: '#F8F5EF',
        padding: '2rem 1rem',
        maxWidth: 1440,
        margin: '0 auto',
      }}
    >
      <h2 style={{ color: '#142B35', fontSize: '2rem', marginBottom: '1rem' }}>
        Preguntas frecuentes
      </h2>
      <dl>
        {faqs.map((faq, index) => (
          <div key={index} style={{ marginBottom: '1rem' }}>
            <dt>
              <button
                aria-expanded={openIndex === index}
                aria-controls={`faq-desc-${index}`}
                id={`faq-btn-${index}`}
                onClick={() => toggle(index)}
                style={{
                  backgroundColor: '#147D78',
                  color: '#F8F5EF',
                  borderRadius: 20,
                  padding: '0.5rem 1rem',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                {faq.question}
              </button>
            </dt>
            <dd
              id={`faq-desc-${index}`}
              role="region"
              aria-labelledby={`faq-btn-${index}`}
              style={{
                maxHeight: openIndex === index ? '1000px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease',
                backgroundColor: '#F8F5EF',
                padding: openIndex === index ? '0.5rem 1rem' : '0 1rem',
                color: '#142B35',
              }}
            >
              {faq.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
