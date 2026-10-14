const API_URL = process.env.TELEMETRY_API_URL

const simulateSensorData = () => {
  const sensorId = `sens-${Math.floor(Math.random() * 900) + 100}`
  const types = ['movimiento', 'velocidad', 'temperatura']
  const type = types[Math.floor(Math.random() * types.length)]
  const value = type === 'movimiento' ? Math.round(Math.random()) : Math.random() * 100
  const unit = type === 'movimiento' ? 'bool' : type === 'velocidad' ? 'km/h' : '°C'
  const status = value > 80 ? 'warning' : 'normal'
  const timestamp = new Date().toISOString()

  return { sensorId, type, value, unit, status, timestamp }
}

const sendTelemetry = async () => {
  const data = simulateSensorData()
  if (!API_URL) {
    console.log(JSON.stringify(data))
    return
  }
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      console.error('Error enviando telemetría:', response.statusText)
    } else {
      console.log('Telemetría enviada:', data)
    }
  } catch (error) {
    console.error('Error en fetch:', error)
  }
}

await sendTelemetry()
if (process.argv.includes('--watch')) setInterval(sendTelemetry, 5000)
