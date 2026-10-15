import React, { useState, useEffect, useCallback } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Filters from './components/Filters'
import Catalog from './components/Catalog'
import HowItWorks from './components/HowItWorks'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'
import { escapes as initialEscapes } from './data/escapes'
import './index.css'

const App: React.FC = () => {
  const [escapes] = useState(initialEscapes)
  const [filters, setFilters] = useState({
    destination: '',
    category: '',
    maxDuration: 0,
    maxPrice: 0,
  })
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites')
    return saved ? JSON.parse(saved) : []
  })
  const [modalEscapeId, setModalEscapeId] = useState<string | null>(null)

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const filteredEscapes = escapes.filter((escapeItem) => {
    const matchDestination = filters.destination
      ? escapeItem.destination.toLowerCase().includes(filters.destination.toLowerCase())
      : true
    const matchCategory = filters.category ? escapeItem.category === filters.category : true
    const matchDuration = filters.maxDuration ? escapeItem.duration <= filters.maxDuration : true
    const matchPrice = filters.maxPrice ? escapeItem.price <= filters.maxPrice : true
    return matchDestination && matchCategory && matchDuration && matchPrice
  })

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }, [])

  const openModal = useCallback((id: string) => {
    setModalEscapeId(id)
  }, [])

  const closeModal = useCallback(() => {
    setModalEscapeId(null)
  }, [])

  const clearFilters = () => {
    setFilters({ destination: '', category: '', maxDuration: 0, maxPrice: 0 })
  }

  return (
    <>
      <Header favoritesCount={favorites.length} />
      <main>
        <Hero />
        <Filters
          filters={filters}
          setFilters={setFilters}
          clearFilters={clearFilters}
          count={filteredEscapes.length}
        />
        <Catalog
          escapes={filteredEscapes}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          openModal={openModal}
        />
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
      {modalEscapeId && (
        <BookingModal
          escapeItem={escapes.find((e) => e.id === modalEscapeId)!}
          onClose={closeModal}
        />
      )}
    </>
  )
}

export default App
