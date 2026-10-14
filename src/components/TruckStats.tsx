type TruckStatsProps = {
  stats: {
    total: number
    activo: number
    detenido: number
    alerta: number
  }
}

export const TruckStats = ({ stats }: TruckStatsProps) => {
  return (
    <section className="stats-section" aria-label="Estadísticas de camiones">
      <div className="stat">
        <strong>{stats.total}</strong>
        <span>Total camiones</span>
      </div>
      <div className="stat">
        <strong>{stats.activo}</strong>
        <span>Activos</span>
      </div>
      <div className="stat">
        <strong>{stats.detenido}</strong>
        <span>Detenidos</span>
      </div>
      <div className="stat">
        <strong>{stats.alerta}</strong>
        <span>Alertas</span>
      </div>
    </section>
  )
}
