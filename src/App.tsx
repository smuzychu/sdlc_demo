import React, { useState, useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Filters } from './components/Filters'
import { Catalog } from './components/Catalog'
import { BookingModal } from './components/BookingModal'
import { HowItWorks } from './components/HowItWorks'
import { FAQ } from './components/FAQ'
import { Footer } from './components/Footer'
import { escapes, type Escape } from './data/escapes'

export const App: React.FC = () => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [filters, setFilters] = useState({
    destination: '',
    category: '',
    duration: null as number | null,
    maxPrice: null as number | null,
  })
  const [filteredEscapes, setFilteredEscapes] = useState<Escape[]>(escapes)
  const [modalEscape, setModalEscape] = useState<Escape | null>(null)

  useEffect(() => {
    // Load favorites from localStorage
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

  useEffect(() => {
    // Save favorites to localStorage
    localStorage.setItem('summit-escapes-favorites', JSON.stringify(Array.from(favorites)))
  }, [favorites])

  useEffect(() => {
    // Filter escapes
    let result = escapes
    if (filters.destination.trim()) {
      const destLower = filters.destination.toLowerCase()
      result = result.filter((e) => e.destination.toLowerCase().includes(destLower))
    }
    if (filters.category) {
      result = result.filter((e) => e.category === filters.category)
    }
    if (filters.duration !== null) {
      result = result.filter((e) => e.duration === filters.duration)
    }
    if (filters.maxPrice !== null) {
      result = result.filter((e) => e.price <= filters.maxPrice!)
    }
    setFilteredEscapes(result)
  }, [filters])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) newSet.delete(id)
      else newSet.add(id)
      return newSet
    })
  }

  const clearFilters = () => {
    setFilters({ destination: '', category: '', duration: null, maxPrice: null })
  }

  return (
    <>
      <Navbar
        favoritesCount={favorites.size}
        onFavoritesClick={() => setFilters({ ...filters, category: '', destination: '' })}
      />
      <Hero />
      <main id="main-content">
        <Filters
          destination={filters.destination}
          setDestination={(value) => setFilters({ ...filters, destination: value })}
          category={filters.category}
          setCategory={(value) => setFilters({ ...filters, category: value })}
          duration={filters.duration}
          setDuration={(value) => setFilters({ ...filters, duration: value })}
          maxPrice={filters.maxPrice}
          setMaxPrice={(value) => setFilters({ ...filters, maxPrice: value })}
          onClear={clearFilters}
        />
        <p
          style={{
            maxWidth: 1440,
            margin: '0 auto 1rem auto',
            padding: '0 1rem',
            color: '#142B35',
          }}
        >
          Resultados: {filteredEscapes.length}
        </p>
        <Catalog
          escapes={filteredEscapes}
          favorites={favorites}
          onViewDetail={(id) => {
            const found = escapes.find((e) => e.id === id)
            if (found) setModalEscape(found)
          }}
          onToggleFavorite={toggleFavorite}
        />
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
      {modalEscape && (
        <BookingModal escapeItem={modalEscape} onClose={() => setModalEscape(null)} />
      )}
    </>
  )
}
