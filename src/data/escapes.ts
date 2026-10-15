export interface Escape {
  id: string
  destination: string
  category: 'Montaña' | 'Playa' | 'Naturaleza'
  duration: number // días
  price: number // USD
  image: string
  imageAlt: string
  imageCredit: {
    artist: string
    sourceUrl: string
    licenseUrl: string
  }
  illustration?: string // SVG path if no image
  itinerary: string[]
}

export const escapes: Escape[] = [
  {
    id: '1',
    destination: 'Lago Mylgval',
    category: 'Montaña',
    duration: 5,
    price: 1200,
    image: 'assets/mountain-lake.jpg',
    imageAlt: 'Lago Mylgval en las montañas del Cáucaso al atardecer',
    imageCredit: {
      artist: 'Vyacheslav Argenberg',
      sourceUrl:
        'https://commons.wikimedia.org/wiki/File:Mountain_lake,_Mylgval_mountain_cirque_before_sunset,_Caucasus_Mountains.jpg',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    itinerary: [
      'Día 1: Llegada y aclimatación',
      'Día 2: Caminata por el circo montañoso',
      'Día 3: Día libre para explorar',
      'Día 4: Excursión a la cima',
      'Día 5: Regreso y despedida',
    ],
  },
  {
    id: '2',
    destination: 'Playa Tropical',
    category: 'Playa',
    duration: 7,
    price: 1500,
    image: 'assets/tropical-beach.svg',
    imageAlt: 'Ilustración tropical de playa',
    imageCredit: {
      artist: 'Ilustración propia',
      sourceUrl: '',
      licenseUrl: '',
    },
    itinerary: [
      'Día 1: Llegada y descanso en la playa',
      'Día 2: Snorkel y exploración marina',
      'Día 3: Caminata por la selva cercana',
      'Día 4: Día libre para actividades opcionales',
      'Día 5: Tour cultural',
      'Día 6: Relax y spa',
      'Día 7: Regreso',
    ],
  },
  {
    id: '3',
    destination: 'Cascada Grenjengan',
    category: 'Naturaleza',
    duration: 4,
    price: 900,
    image: 'assets/forest-waterfall.jpg',
    imageAlt: 'Cascada Grenjengan en Indonesia',
    imageCredit: {
      artist: 'Petrusarif',
      sourceUrl:
        'https://commons.wikimedia.org/wiki/File:Grenjengan_Kembar_waterfall_in_Magelang_Regency,_Indonesia.jpg',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    itinerary: [
      'Día 1: Llegada y exploración del área',
      'Día 2: Caminata a la cascada',
      'Día 3: Observación de flora y fauna',
      'Día 4: Regreso',
    ],
  },
  {
    id: '4',
    destination: 'Montaña Nevada',
    category: 'Montaña',
    duration: 6,
    price: 1300,
    image: 'assets/mountain-hero.svg',
    imageAlt: 'Ilustración de montaña nevada',
    imageCredit: {
      artist: 'Ilustración propia',
      sourceUrl: '',
      licenseUrl: '',
    },
    itinerary: [
      'Día 1: Llegada y preparación',
      'Día 2: Esquí y snowboard',
      'Día 3: Caminata con raquetas',
      'Día 4: Día libre',
      'Día 5: Excursión panorámica',
      'Día 6: Regreso',
    ],
  },
  {
    id: '5',
    destination: 'Playa Coral',
    category: 'Playa',
    duration: 3,
    price: 800,
    image: 'assets/coast.jpg',
    imageAlt: 'Playa con coral y aguas claras',
    imageCredit: {
      artist: 'UpstateNYer',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Disney%27s_Caribbean_Beach_Resort.JPG',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    itinerary: ['Día 1: Llegada y descanso', 'Día 2: Buceo y snorkel', 'Día 3: Paseo en bote'],
  },
  {
    id: '6',
    destination: 'Bosque Encantado',
    category: 'Naturaleza',
    duration: 5,
    price: 1100,
    image: 'assets/forest.svg',
    imageAlt: 'Bosque encantado con árboles y niebla',
    imageCredit: {
      artist: 'Ilustración propia',
      sourceUrl: '',
      licenseUrl: '',
    },
    itinerary: [
      'Día 1: Llegada y caminata',
      'Día 2: Observación de aves',
      'Día 3: Picnic y relajación',
      'Día 4: Exploración de senderos',
      'Día 5: Regreso',
    ],
  },
]
