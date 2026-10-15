export interface Escape {
  id: string
  destination: string
  category: 'Montaña' | 'Playa' | 'Naturaleza'
  duration: number // days
  price: number // USD
  image: string // local SVG or image path
  alt: string
  description: string
  itinerary: string[]
}

export const escapes: Escape[] = [
  {
    id: 'escape1',
    destination: 'Los Andes',
    category: 'Montaña',
    duration: 5,
    price: 1200,
    image: '/escapes/mountains.svg',
    alt: 'Ilustración de montañas nevadas',
    description: 'Explora los majestuosos picos de Los Andes y disfruta de caminatas inolvidables.',
    itinerary: [
      'Día 1: Llegada y aclimatación en el campamento base.',
      'Día 2: Caminata por senderos panorámicos.',
      'Día 3: Ascenso a un mirador emblemático.',
      'Día 4: Día libre para actividades opcionales.',
      'Día 5: Regreso y despedida.',
    ],
  },
  {
    id: 'escape2',
    destination: 'Costa Caribe',
    category: 'Playa',
    duration: 7,
    price: 1500,
    image: '/escapes/coast.svg',
    alt: 'Ilustración de playa caribeña con palmeras',
    description: 'Relájate en las playas de arena blanca y aguas cristalinas del Caribe.',
    itinerary: [
      'Día 1: Llegada y bienvenida en el resort.',
      'Día 2: Tour en barco por la costa.',
      'Día 3: Día libre para disfrutar la playa.',
      'Día 4: Snorkel y exploración marina.',
      'Día 5: Visita a pueblos locales.',
      'Día 6: Tiempo libre y spa.',
      'Día 7: Regreso.',
    ],
  },
  {
    id: 'escape3',
    destination: 'Bosque Encantado',
    category: 'Naturaleza',
    duration: 4,
    price: 900,
    image: '/escapes/forest.svg',
    alt: 'Ilustración de bosque frondoso',
    description: 'Sumérgete en la tranquilidad del bosque y conecta con la naturaleza.',
    itinerary: [
      'Día 1: Llegada y caminata introductoria.',
      'Día 2: Observación de flora y fauna.',
      'Día 3: Taller de supervivencia en la naturaleza.',
      'Día 4: Despedida y regreso.',
    ],
  },
  {
    id: 'escape4',
    destination: 'Montañas Rocosas',
    category: 'Montaña',
    duration: 6,
    price: 1300,
    image: '/escapes/mountains.svg',
    alt: 'Ilustración de montañas rocosas',
    description: 'Aventúrate en las Montañas Rocosas con paisajes impresionantes y aire puro.',
    itinerary: [
      'Día 1: Llegada y descanso.',
      'Día 2: Caminata por senderos naturales.',
      'Día 3: Escalada y exploración.',
      'Día 4: Día libre para actividades.',
      'Día 5: Visita a lagos.',
      'Día 6: Regreso.',
    ],
  },
  {
    id: 'escape5',
    destination: 'Playa del Sol',
    category: 'Playa',
    duration: 3,
    price: 700,
    image: '/escapes/coast.svg',
    alt: 'Ilustración de playa soleada',
    description: 'Disfruta de un fin de semana relajante en la Playa del Sol.',
    itinerary: [
      'Día 1: Llegada y puesta de sol en la playa.',
      'Día 2: Día completo de descanso y actividades acuáticas.',
      'Día 3: Despedida y regreso.',
    ],
  },
  {
    id: 'escape6',
    destination: 'Reserva Natural Verde',
    category: 'Naturaleza',
    duration: 5,
    price: 1100,
    image: '/escapes/forest.svg',
    alt: 'Ilustración de reserva natural',
    description:
      'Explora la biodiversidad de la reserva natural y participa en actividades ecológicas.',
    itinerary: [
      'Día 1: Llegada y orientación.',
      'Día 2: Caminata ecológica guiada.',
      'Día 3: Taller de conservación.',
      'Día 4: Observación de aves.',
      'Día 5: Regreso.',
    ],
  },
]
