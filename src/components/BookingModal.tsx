import React, { useEffect, useRef, useState } from 'react'
import type { Escape } from '../data/escapes'

interface BookingModalProps {
  escapeItem: Escape
  onClose: () => void
}

export const BookingModal: React.FC<BookingModalProps> = ({ escapeItem, onClose }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [travelers, setTravelers] = useState(1)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [submitted, setSubmitted] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const firstInputRef = useRef<HTMLInputElement>(null)
  const lastFocusedElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    lastFocusedElement.current = document.activeElement as HTMLElement
    firstInputRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      lastFocusedElement.current?.focus()
    }
  }, [onClose])

  const validate = () => {
    const newErrors: { [key: string]: string } = {}
    if (!name.trim()) newErrors.name = 'El nombre es obligatorio.'
    if (!email.trim()) newErrors.email = 'El correo electrónico es obligatorio.'
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      newErrors.email = 'Correo electrónico inválido.'
    if (!date) newErrors.date = 'La fecha es obligatoria.'
    else if (new Date(date) <= new Date()) newErrors.date = 'La fecha debe ser futura.'
    if (travelers < 1) newErrors.travelers = 'Debe haber al menos un viajero.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal__surface">
          <header className="modal__header">
            <h2 id="modal-title">Reserva confirmada</h2>
            <button onClick={onClose} aria-label="Cerrar modal">
              ×
            </button>
          </header>
          <p>
            Gracias por reservar con Summit Escapes. Esta es una demostración, no se procesan pagos
            ni se envían datos.
          </p>
          <button onClick={onClose} style={{ marginTop: '1rem' }}>
            Cerrar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
    >
      <div className="modal__surface">
        <header className="modal__header">
          <h2 id="modal-title">Reserva para {escapeItem.destination}</h2>
          <button onClick={onClose} aria-label="Cerrar modal">
            ×
          </button>
        </header>
        <form onSubmit={onSubmit} noValidate>
          <div className="field">
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              ref={firstInputRef}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              required
            />
            {errors.name && (
              <div id="name-error" className="field__error">
                {errors.name}
              </div>
            )}
          </div>

          <div className="field">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              required
            />
            {errors.email && (
              <div id="email-error" className="field__error">
                {errors.email}
              </div>
            )}
          </div>

          <div className="field">
            <label htmlFor="date">Fecha</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              aria-invalid={!!errors.date}
              aria-describedby={errors.date ? 'date-error' : undefined}
              required
            />
            {errors.date && (
              <div id="date-error" className="field__error">
                {errors.date}
              </div>
            )}
          </div>

          <div className="field">
            <label htmlFor="travelers">Cantidad de viajeros</label>
            <input
              id="travelers"
              type="number"
              min={1}
              value={travelers}
              onChange={(e) => setTravelers(Number(e.target.value))}
              aria-invalid={!!errors.travelers}
              aria-describedby={errors.travelers ? 'travelers-error' : undefined}
              required
            />
            {errors.travelers && (
              <div id="travelers-error" className="field__error">
                {errors.travelers}
              </div>
            )}
          </div>

          <div className="modal__actions">
            <button
              type="submit"
              style={{
                backgroundColor: '#147D78',
                color: '#F8F5EF',
                borderRadius: 20,
                padding: '0.5rem 1rem',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Reservar
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                backgroundColor: '#F28B6B',
                color: '#F8F5EF',
                borderRadius: 20,
                padding: '0.5rem 1rem',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
