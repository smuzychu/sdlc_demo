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

- Node.js 22.13 o superior.
- pnpm 10.15.0.

## Ejecución local

1. Instalar dependencias:

```bash
pnpm install --frozen-lockfile
```

2. Ejecutar la aplicación:

```bash
pnpm run dev
```

3. Abrir en el navegador la URL que muestra Vite (por defecto http://localhost:5173).

## Simulación de sensores

La demo de GitHub Pages es estática: el frontend simula telemetría cada cinco segundos y guarda la flota en `localStorage`. No recibe datos de sensores externos.

El script genera un evento JSON, sin dependencias adicionales ni llamadas a un backend inexistente:

```bash
node --experimental-strip-types scripts/simulateSensors.ts
```

Para generar eventos cada cinco segundos:

```bash
node --experimental-strip-types scripts/simulateSensors.ts --watch
```

Si disponés de un receptor HTTP real, podés enviarle eventos configurando `TELEMETRY_API_URL`. Ese receptor es una integración externa y no está alojado en GitHub Pages.

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
- El script genera eventos independientes; no modifica el estado de la demo del navegador.
- No se incluye autenticación ni mapas avanzados.
