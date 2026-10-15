import React, { useEffect, useRef, useState } from 'react'
import type { Escape } from '../data/escapes'

interface BookingModalProps {
  escapeItem: Escape
  onClose: () => void
}

const BookingModal: React.FC<BookingModalProps> = ({ escapeItem, onClose }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [travelers, setTravelers] = useState(1)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [submitted, setSubmitted] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const lastFocusedButton = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        if (lastFocusedButton.current) {
          lastFocusedButton.current.focus()
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  useEffect(() => {
    lastFocusedButton.current = document.activeElement as HTMLElement
    if (modalRef.current) {
      modalRef.current.focus()
    }
  }, [])

  const validate = () => {
    const newErrors: { [key: string]: string } = {}
    if (!name.trim()) newErrors.name = 'El nombre es obligatorio'
    if (!email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      newErrors.email = 'Email inválido'
    if (!date || new Date(date) <= new Date()) newErrors.date = 'Fecha debe ser futura'
    if (travelers < 1) newErrors.travelers = 'Debe haber al menos un viajero'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
        <div className="modal__surface" tabIndex={-1} ref={modalRef}>
          <h2 id="confirm-title">Confirmación de reserva</h2>
          <p>Esta es una demostración. No se procesarán pagos ni se enviarán datos.</p>
          <button
            onClick={onClose}
            style={{
              backgroundColor: '#147d78',
              color: '#f8f5ef',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              fontWeight: '600',
              cursor: 'pointer',
              border: 'none',
            }}
          >
            Cerrar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
      <div className="modal__surface" tabIndex={-1} ref={modalRef}>
        <header className="modal__header">
          <h2 id="booking-title">Reserva para {escapeItem.destination}</h2>
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
          >
            ×
          </button>
        </header>
        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              required
            />
            {errors.name && (
              <p id="name-error" className="field__error">
                {errors.name}
              </p>
            )}
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
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
              <p id="email-error" className="field__error">
                {errors.email}
              </p>
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
              <p id="date-error" className="field__error">
                {errors.date}
              </p>
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
              <p id="travelers-error" className="field__error">
                {errors.travelers}
              </p>
            )}
          </div>
          <div className="modal__actions">
            <button
              type="submit"
              style={{
                backgroundColor: '#147d78',
                color: '#f8f5ef',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                fontWeight: '600',
                cursor: 'pointer',
                border: 'none',
              }}
            >
              Reservar
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                backgroundColor: '#f28b6b',
                color: '#f8f5ef',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                fontWeight: '600',
                cursor: 'pointer',
                border: 'none',
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

export default BookingModal
