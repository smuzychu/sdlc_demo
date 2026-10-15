import React, { useState } from 'react'

const faqs = [
  {
    question: '¿Cómo puedo reservar una escapada?',
    answer: 'Seleccioná una escapada y completá el formulario de reserva en el modal.',
  },
  {
    question: '¿Puedo guardar mis escapadas favoritas?',
    answer: 'Sí, podés guardar escapadas y consultarlas en Mis favoritos.',
  },
  {
    question: '¿Necesito una cuenta para usar Summit Escapes?',
    answer: 'No, esta demo no requiere registro ni backend.',
  },
]

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      id="preguntas-frecuentes"
      style={{
        backgroundColor: '#f8f5ef',
        color: '#142b35',
        padding: '2rem',
        maxWidth: '1440px',
        margin: '0 auto',
      }}
    >
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Preguntas frecuentes</h2>
      <dl>
        {faqs.map((faq, i) => (
          <div key={i} style={{ marginBottom: '1rem' }}>
            <dt>
              <button
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                onClick={() => toggle(i)}
                style={{
                  backgroundColor: '#147d78',
                  color: '#f8f5ef',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.5rem 1rem',
                  width: '100%',
                  textAlign: 'left',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                {faq.question}
              </button>
            </dt>
            {openIndex === i && (
              <dd
                id={`faq-answer-${i}`}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#f28b6b',
                  color: '#f8f5ef',
                  borderRadius: '0 0 8px 8px',
                }}
              >
                {faq.answer}
              </dd>
            )}
          </div>
        ))}
      </dl>
    </section>
  )
}

export default FAQ
