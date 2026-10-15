import type { Escape } from '../data/escapes'

export interface CardProps {
  escape: Escape
  onViewDetail: (escape: Escape) => void
  onToggleFavorite: (id: string) => void
  isFavorite: boolean
}

export default function Card({ escape, onViewDetail, onToggleFavorite, isFavorite }: CardProps) {
  return (
    <article
      className="bg-[#F8F5EF] rounded-[20px] shadow-md p-4 flex flex-col"
      aria-label={`Escapada a ${escape.destination}`}
    >
      <img
        src={escape.image}
        alt={escape.imageAlt}
        className="rounded-[20px] mb-4 object-cover h-40 w-full"
        loading="lazy"
      />
      <h3 className="text-[#142B35] text-xl font-bold mb-1">{escape.destination}</h3>
      <p className="text-[#147D78] font-semibold mb-1">{escape.category}</p>
      <p className="text-[#142B35] mb-1">Duración: {escape.duration} días</p>
      <p className="text-[#142B35] mb-3">Precio: ${escape.price} USD</p>
      <div className="mt-auto flex justify-between">
        <button
          onClick={() => onViewDetail(escape)}
          className="bg-[#147D78] text-white rounded-lg px-4 py-2 hover:bg-[#11605f] focus:outline-none focus:ring-2 focus:ring-[#11605f]"
          aria-label={`Ver detalle de escapada a ${escape.destination}`}
        >
          Ver detalle
        </button>
        <button
          onClick={() => onToggleFavorite(escape.id)}
          className={`rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
            isFavorite
              ? 'bg-[#F28B6B] text-white hover:bg-[#e07a5f] focus:ring-[#e07a5f]'
              : 'bg-[#147D78] text-white hover:bg-[#11605f] focus:ring-[#11605f]'
          }`}
          aria-pressed={isFavorite}
          aria-label={
            isFavorite
              ? `Quitar ${escape.destination} de favoritos`
              : `Guardar ${escape.destination} en favoritos`
          }
        >
          {isFavorite ? 'Guardado' : 'Guardar'}
        </button>
      </div>
    </article>
  )
}
