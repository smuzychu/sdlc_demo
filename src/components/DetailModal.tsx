import React, { useEffect, useRef, useState } from 'react'
import type { Escape } from '../data/escapes'

export interface DetailModalProps {
  escape: Escape | null
  onClose: () => void
}

export default function DetailModal({ escape, onClose }: DetailModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '', date: '', travelers: 1 })
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
  const [formSubmitted, setFormSubmitted] = useState(false)
  const modalRef = useRef<HTMLDialogElement>(null)
  const lastFocusedElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (escape) {
      lastFocusedElement.current = document.activeElement as HTMLElement
      modalRef.current?.showModal()
    } else {
      modalRef.current?.close()
      setFormData({ name: '', email: '', date: '', travelers: 1 })
      setFormErrors({})
      setFormSubmitted(false)
      lastFocusedElement.current?.focus()
    }
  }, [escape])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    if (escape) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [escape, onClose])

  if (!escape) return null

  function validate() {
    const errors: { [key: string]: string } = {}
    if (!formData.name.trim()) errors.name = 'Nombre es requerido'
    if (!formData.email.trim()) errors.email = 'Email es requerido'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Email inválido'
    if (!formData.date.trim()) errors.date = 'Fecha es requerida'
    else if (new Date(formData.date) <= new Date()) errors.date = 'Fecha debe ser futura'
    if (formData.travelers < 1) errors.travelers = 'Debe haber al menos un viajero'
    return errors
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errors = validate()
    setFormErrors(errors)
    if (Object.keys(errors).length === 0) {
      setFormSubmitted(true)
    }
  }

  return (
    <dialog
      ref={modalRef}
      className="modal"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      onClose={onClose}
    >
      <div className="modal__surface">
        <header className="modal__header">
          <h2 id="modal-title" className="text-[#142B35]">
            Detalle de escapada: {escape.destination}
          </h2>
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="text-[#F28B6B] hover:text-[#e07a5f] focus:outline-none focus:ring-2 focus:ring-[#e07a5f] rounded"
          >
            ×
          </button>
        </header>

        <section id="modal-description" className="p-6 text-[#142B35]">
          <p>{escape.description}</p>
          <h3 className="mt-4 font-semibold">Itinerario</h3>
          <ul className="list-disc list-inside">
            {escape.itinerary.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          {formSubmitted ? (
            <div role="alert" className="mt-6 p-4 bg-[#147D78] text-white rounded-lg font-semibold">
              Reserva confirmada (Demo: no se procesan pagos ni datos).
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
              <div className="field">
                <label htmlFor="name">Nombre</label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  aria-invalid={!!formErrors.name}
                  aria-describedby={formErrors.name ? 'name-error' : undefined}
                  className="rounded-lg border border-gray-300 p-2"
                  required
                />
                {formErrors.name && (
                  <p id="name-error" className="field__error">
                    {formErrors.name}
                  </p>
                )}
              </div>

              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  aria-invalid={!!formErrors.email}
                  aria-describedby={formErrors.email ? 'email-error' : undefined}
                  className="rounded-lg border border-gray-300 p-2"
                  required
                />
                {formErrors.email && (
                  <p id="email-error" className="field__error">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div className="field">
                <label htmlFor="date">Fecha</label>
                <input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  aria-invalid={!!formErrors.date}
                  aria-describedby={formErrors.date ? 'date-error' : undefined}
                  className="rounded-lg border border-gray-300 p-2"
                  required
                />
                {formErrors.date && (
                  <p id="date-error" className="field__error">
                    {formErrors.date}
                  </p>
                )}
              </div>

              <div className="field">
                <label htmlFor="travelers">Cantidad de viajeros</label>
                <input
                  id="travelers"
                  type="number"
                  min={1}
                  value={formData.travelers}
                  onChange={(e) => setFormData({ ...formData, travelers: Number(e.target.value) })}
                  aria-invalid={!!formErrors.travelers}
                  aria-describedby={formErrors.travelers ? 'travelers-error' : undefined}
                  className="rounded-lg border border-gray-300 p-2"
                  required
                />
                {formErrors.travelers && (
                  <p id="travelers-error" className="field__error">
                    {formErrors.travelers}
                  </p>
                )}
              </div>

              <div className="modal__actions">
                <button
                  type="submit"
                  className="bg-[#147D78] text-white rounded-lg px-6 py-2 hover:bg-[#11605f] focus:outline-none focus:ring-2 focus:ring-[#11605f]"
                >
                  Reservar
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-[#F28B6B] text-white rounded-lg px-6 py-2 hover:bg-[#e07a5f] focus:outline-none focus:ring-2 focus:ring-[#e07a5f]"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </dialog>
  )
}
