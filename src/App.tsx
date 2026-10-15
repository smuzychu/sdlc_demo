import { useState, useEffect, useRef } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Filters from './components/Filters'
import Catalog from './components/Catalog'
import DetailModal from './components/DetailModal'
import HowItWorks from './components/HowItWorks'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import { escapes, type Escape } from './data/escapes'

function filterEscapes(
  escapes: Escape[],
  destination: string,
  category: string,
  duration: string,
  maxPrice: string,
) {
  return escapes.filter((escape) => {
    if (destination && !escape.destination.toLowerCase().includes(destination.toLowerCase())) {
      return false
    }
    if (category && category !== '' && escape.category !== category) {
      return false
    }
    if (duration) {
      if (duration === '1-3' && (escape.duration < 1 || escape.duration > 3)) {
        return false
      }
      if (duration === '4-6' && (escape.duration < 4 || escape.duration > 6)) {
        return false
      }
      if (duration === '7+' && escape.duration < 7) {
        return false
      }
    }
    if (maxPrice) {
      const max = Number(maxPrice)
      if (escape.price > max) {
        return false
      }
    }
    return true
  })
}

export default function App() {
  const [destination, setDestination] = useState('')
  const [category, setCategory] = useState('')
  const [duration, setDuration] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [selectedEscape, setSelectedEscape] = useState<Escape | null>(null)

  // Load favorites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('summit-escapes-favorites')
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as string[]
        setFavorites(new Set(parsed))
      } catch {
        // ignore
      }
    }
  }, [])

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('summit-escapes-favorites', JSON.stringify(Array.from(favorites)))
  }, [favorites])

  const filteredEscapes = filterEscapes(escapes, destination, category, duration, maxPrice)

  function toggleFavorite(id: string) {
    if (!id) {
      // Used for reset filters button in empty state
      clearFilters()
      return
    }
    setFavorites((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  function clearFilters() {
    setDestination('')
    setCategory('')
    setDuration('')
    setMaxPrice('')
  }

  // Modal focus management
  const lastFocusedButton = useRef<HTMLButtonElement | null>(null)

  function openDetail(escapeItem: Escape) {
    setSelectedEscape(escapeItem)
    // Save the button that opened the modal
    lastFocusedButton.current = document.activeElement as HTMLButtonElement
  }

  function closeDetail() {
    setSelectedEscape(null)
    // Return focus to the button that opened the modal
    lastFocusedButton.current?.focus()
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F8F5EF] text-[#142B35]">
        <Hero />
        <Filters
          destination={destination}
          setDestination={setDestination}
          category={category}
          setCategory={setCategory}
          duration={duration}
          setDuration={setDuration}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          clearFilters={clearFilters}
          resultsCount={filteredEscapes.length}
        />
        <Catalog
          escapes={filteredEscapes}
          onViewDetail={openDetail}
          onToggleFavorite={toggleFavorite}
          favorites={favorites}
        />
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
      {selectedEscape && <DetailModal escape={selectedEscape} onClose={closeDetail} />}
    </>
  )
}
