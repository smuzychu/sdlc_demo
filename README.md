# Portal de Monitoreo de Camiones

Este proyecto es un prototipo de un portal web para monitorear camiones conectados a sensores de movimiento y otros tipos de telemetría.

## Stack

- React 19
- TypeScript
- Vite

## Funcionalidades

- Visualización de camiones con estado, ubicación, velocidad y sensores.
- Filtros por búsqueda y estado.
- Simulación de datos de sensores con actualización automática (polling cada 5 segundos).
- Alta, edición y eliminación de camiones.

## Requisitos

- Node.js 24 o superior.
- npm 10 o superior.

## Ejecución local

1. Instalar dependencias:

```bash
npm ci
```

2. Ejecutar la aplicación:

```bash
npm run dev
```

3. Abrir en el navegador la URL que muestra Vite (por defecto http://localhost:5173).

## Simulación de sensores

Para simular datos de sensores y enviar telemetría al backend (endpoint HTTP), se incluye un script básico:

```bash
node scripts/simulateSensors.ts
```

Este script envía datos aleatorios cada 5 segundos al endpoint configurado en `scripts/simulateSensors.ts`.

## Estructura relevante

- `src/domain/truck.ts`: Modelos de datos para camiones y sensores.
- `src/data/initialTrucks.ts`: Datos iniciales de ejemplo.
- `src/hooks/useTrucks.ts`: Lógica de estado y simulación de telemetría.
- `src/components/TruckDashboard.tsx`: Componente principal del dashboard.
- `src/components/TruckCard.tsx`: Tarjeta individual de camión.
- `src/components/TruckFilters.tsx`: Filtros para la lista de camiones.
- `src/components/TruckForm.tsx`: Formulario para crear/editar camiones.
- `src/components/TruckStats.tsx`: Estadísticas de la flota.

## Notas

- El backend para recibir telemetría no está implementado en este prototipo.
- La simulación de sensores se realiza localmente en el frontend y con el script de simulación.
- No se incluye autenticación ni mapas avanzados.
