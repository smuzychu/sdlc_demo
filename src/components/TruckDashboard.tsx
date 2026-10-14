import { useState } from 'react'
import { TruckCard } from './TruckCard'
import { TruckFilters, type TruckFiltersValue } from './TruckFilters'
import { TruckForm } from './TruckForm'
import { TruckStats } from './TruckStats'
import { useTrucks } from '../hooks/useTrucks'
import type { Truck } from '../domain/truck'

const emptyFilters: TruckFiltersValue = {
  search: '',
  status: 'all',
}

export const TruckDashboard = () => {
  const { trucks, stats, createTruck, updateTruck, deleteTruck, resetTrucks } = useTrucks()
  const [filters, setFilters] = useState<TruckFiltersValue>(emptyFilters)
  const [editingTruck, setEditingTruck] = useState<Truck | null>(null)
  const [truckToDelete, setTruckToDelete] = useState<Truck | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  const filteredTrucks = trucks.filter((truck) => {
    const searchLower = filters.search.toLowerCase()
    const matchesSearch =
      filters.search === '' ||
      truck.plate.toLowerCase().includes(searchLower) ||
      truck.driver.toLowerCase().includes(searchLower) ||
      truck.location.toLowerCase().includes(searchLower)

    const matchesStatus = filters.status === 'all' || truck.status === filters.status

    return matchesSearch && matchesStatus
  })

  return (
    <div className="truck-dashboard">
      <header className="truck-dashboard__header">
        <h1>Portal de Monitoreo de Camiones</h1>
        <button onClick={() => setIsCreating(true)}>Nuevo camión</button>
        <button
          onClick={() => {
            resetTrucks()
            setFilters(emptyFilters)
          }}
        >
          Restaurar datos
        </button>
      </header>

      <TruckStats stats={stats} />

      <TruckFilters
        value={filters}
        resultCount={filteredTrucks.length}
        onChange={setFilters}
        onClear={() => setFilters(emptyFilters)}
      />

      {filteredTrucks.length > 0 ? (
        <section className="truck-list">
          {filteredTrucks.map((truck) => (
            <TruckCard
              key={truck.id}
              truck={truck}
              onEdit={setEditingTruck}
              onDelete={setTruckToDelete}
            />
          ))}
        </section>
      ) : (
        <p>No hay camiones que coincidan con los filtros.</p>
      )}

      {isCreating && (
        <TruckForm
          onSubmit={(input) => {
            createTruck(input)
            setIsCreating(false)
          }}
          onCancel={() => setIsCreating(false)}
        />
      )}

      {editingTruck && (
        <TruckForm
          truck={editingTruck}
          onSubmit={(input) => {
            updateTruck(editingTruck.id, input)
            setEditingTruck(null)
          }}
          onCancel={() => setEditingTruck(null)}
        />
      )}

      {truckToDelete && (
        <div className="confirm-dialog">
          <p>¿Eliminar camión {truckToDelete.plate}?</p>
          <button
            onClick={() => {
              deleteTruck(truckToDelete.id)
              setTruckToDelete(null)
            }}
          >
            Confirmar
          </button>
          <button onClick={() => setTruckToDelete(null)}>Cancelar</button>
        </div>
      )}
    </div>
  )
}
