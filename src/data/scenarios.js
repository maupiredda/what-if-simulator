// Delivery points spread across the map area (x, y in SVG coordinates 0-1000)
// Grouped by zone for realistic route clustering

const allPoints = [
  // North-West zone
  { id: 1, x: 150, y: 120 }, { id: 2, x: 100, y: 180 }, { id: 3, x: 200, y: 80 },
  { id: 4, x: 170, y: 200 }, { id: 5, x: 80, y: 130 },
  // North-East zone
  { id: 6, x: 750, y: 100 }, { id: 7, x: 820, y: 150 }, { id: 8, x: 700, y: 170 },
  { id: 9, x: 780, y: 200 }, { id: 10, x: 850, y: 110 },
  // East zone
  { id: 11, x: 880, y: 350 }, { id: 12, x: 920, y: 420 }, { id: 13, x: 850, y: 380 },
  { id: 14, x: 900, y: 300 }, { id: 15, x: 870, y: 450 },
  // South-East zone
  { id: 16, x: 800, y: 600 }, { id: 17, x: 750, y: 650 }, { id: 18, x: 830, y: 680 },
  { id: 19, x: 780, y: 550 }, { id: 20, x: 860, y: 620 },
  // South zone
  { id: 21, x: 500, y: 700 }, { id: 22, x: 450, y: 750 }, { id: 23, x: 550, y: 720 },
  { id: 24, x: 480, y: 680 }, { id: 25, x: 520, y: 760 },
  // South-West zone
  { id: 26, x: 150, y: 650 }, { id: 27, x: 100, y: 700 }, { id: 28, x: 200, y: 680 },
  { id: 29, x: 130, y: 600 }, { id: 30, x: 180, y: 730 },
  // West zone
  { id: 31, x: 80, y: 400 }, { id: 32, x: 120, y: 350 }, { id: 33, x: 100, y: 450 },
  { id: 34, x: 150, y: 380 }, { id: 35, x: 70, y: 320 },
  // Central-North
  { id: 36, x: 450, y: 200 }, { id: 37, x: 520, y: 180 }, { id: 38, x: 480, y: 250 },
  // Central-South
  { id: 39, x: 400, y: 500 }, { id: 40, x: 550, y: 480 },
  // Extra scattered
  { id: 41, x: 350, y: 350 }, { id: 42, x: 650, y: 400 },
];

const routeColors = [
  '#FF6B6B', // red
  '#4ECDC4', // teal
  '#FFD93D', // yellow
  '#6BCB77', // green
  '#4D96FF', // blue
  '#FF8B94', // salmon
  '#A78BFA', // purple
  '#F97316', // orange
];

// ─── SCENARIO A ─────────────────────────────────────────────
// Baseline: 1 warehouse (center), 8 vehicles, 8 routes
const scenarioA = {
  id: 'A',
  title: 'Scenario A - Configurazione attuale',
  description: '1 magazzino, 8 veicoli, configurazione attuale delle rotte',
  warehouses: [
    { id: 'w1', x: 480, y: 420, label: 'Magazzino Centrale' }
  ],
  kpis: {
    km: 824,
    hours: 34,
    vehicles: 8,
    cost: 2060,
    emissions: 206,
  },
  routes: [
    { color: routeColors[0], vehicleId: 'V1', points: [
      { x: 480, y: 420 }, { x: 350, y: 350 }, { x: 200, y: 80 }, { x: 150, y: 120 },
      { x: 100, y: 180 }, { x: 170, y: 200 }, { x: 80, y: 130 }, { x: 480, y: 420 }
    ]},
    { color: routeColors[1], vehicleId: 'V2', points: [
      { x: 480, y: 420 }, { x: 520, y: 180 }, { x: 750, y: 100 }, { x: 820, y: 150 },
      { x: 700, y: 170 }, { x: 780, y: 200 }, { x: 850, y: 110 }, { x: 480, y: 420 }
    ]},
    { color: routeColors[2], vehicleId: 'V3', points: [
      { x: 480, y: 420 }, { x: 650, y: 400 }, { x: 880, y: 350 }, { x: 920, y: 420 },
      { x: 850, y: 380 }, { x: 900, y: 300 }, { x: 870, y: 450 }, { x: 480, y: 420 }
    ]},
    { color: routeColors[3], vehicleId: 'V4', points: [
      { x: 480, y: 420 }, { x: 800, y: 600 }, { x: 750, y: 650 }, { x: 830, y: 680 },
      { x: 780, y: 550 }, { x: 860, y: 620 }, { x: 480, y: 420 }
    ]},
    { color: routeColors[4], vehicleId: 'V5', points: [
      { x: 480, y: 420 }, { x: 550, y: 480 }, { x: 500, y: 700 }, { x: 450, y: 750 },
      { x: 550, y: 720 }, { x: 480, y: 680 }, { x: 520, y: 760 }, { x: 480, y: 420 }
    ]},
    { color: routeColors[5], vehicleId: 'V6', points: [
      { x: 480, y: 420 }, { x: 400, y: 500 }, { x: 150, y: 650 }, { x: 100, y: 700 },
      { x: 200, y: 680 }, { x: 130, y: 600 }, { x: 180, y: 730 }, { x: 480, y: 420 }
    ]},
    { color: routeColors[6], vehicleId: 'V7', points: [
      { x: 480, y: 420 }, { x: 150, y: 380 }, { x: 80, y: 400 }, { x: 120, y: 350 },
      { x: 100, y: 450 }, { x: 70, y: 320 }, { x: 480, y: 420 }
    ]},
    { color: routeColors[7], vehicleId: 'V8', points: [
      { x: 480, y: 420 }, { x: 450, y: 200 }, { x: 480, y: 250 }, { x: 520, y: 180 },
      { x: 480, y: 420 }
    ]},
  ],
};

// ─── SCENARIO B ─────────────────────────────────────────────
// Add second warehouse: routes reorganized, shorter distances
const scenarioB = {
  id: 'B',
  title: 'Scenario B - Aggiunta magazzino',
  description: '2 magazzini, 8 veicoli, rotte riorganizzate per prossimita',
  warehouses: [
    { id: 'w1', x: 300, y: 350, label: 'Magazzino Ovest' },
    { id: 'w2', x: 750, y: 380, label: 'Magazzino Est' },
  ],
  kpis: {
    km: 586,
    hours: 24,
    vehicles: 8,
    cost: 1465,
    emissions: 147,
  },
  routes: [
    // Routes from West warehouse
    { color: routeColors[0], vehicleId: 'V1', points: [
      { x: 300, y: 350 }, { x: 200, y: 80 }, { x: 150, y: 120 }, { x: 100, y: 180 },
      { x: 170, y: 200 }, { x: 80, y: 130 }, { x: 300, y: 350 }
    ]},
    { color: routeColors[5], vehicleId: 'V6', points: [
      { x: 300, y: 350 }, { x: 150, y: 650 }, { x: 100, y: 700 }, { x: 200, y: 680 },
      { x: 130, y: 600 }, { x: 180, y: 730 }, { x: 300, y: 350 }
    ]},
    { color: routeColors[6], vehicleId: 'V7', points: [
      { x: 300, y: 350 }, { x: 350, y: 350 }, { x: 150, y: 380 }, { x: 80, y: 400 }, { x: 120, y: 350 },
      { x: 100, y: 450 }, { x: 70, y: 320 }, { x: 300, y: 350 }
    ]},
    { color: routeColors[4], vehicleId: 'V5', points: [
      { x: 300, y: 350 }, { x: 400, y: 500 }, { x: 500, y: 700 }, { x: 450, y: 750 },
      { x: 550, y: 720 }, { x: 480, y: 680 }, { x: 520, y: 760 }, { x: 300, y: 350 }
    ]},
    // Routes from East warehouse
    { color: routeColors[1], vehicleId: 'V2', points: [
      { x: 750, y: 380 }, { x: 750, y: 100 }, { x: 820, y: 150 }, { x: 700, y: 170 },
      { x: 780, y: 200 }, { x: 850, y: 110 }, { x: 750, y: 380 }
    ]},
    { color: routeColors[2], vehicleId: 'V3', points: [
      { x: 750, y: 380 }, { x: 880, y: 350 }, { x: 920, y: 420 }, { x: 850, y: 380 },
      { x: 900, y: 300 }, { x: 870, y: 450 }, { x: 750, y: 380 }
    ]},
    { color: routeColors[3], vehicleId: 'V4', points: [
      { x: 750, y: 380 }, { x: 800, y: 600 }, { x: 750, y: 650 }, { x: 830, y: 680 },
      { x: 780, y: 550 }, { x: 860, y: 620 }, { x: 750, y: 380 }
    ]},
    { color: routeColors[7], vehicleId: 'V8', points: [
      { x: 750, y: 380 }, { x: 650, y: 400 }, { x: 550, y: 480 }, { x: 450, y: 200 },
      { x: 480, y: 250 }, { x: 520, y: 180 }, { x: 750, y: 380 }
    ]},
  ],
};

// ─── SCENARIO C ─────────────────────────────────────────────
// Back to 1 warehouse, but only 7 vehicles
const scenarioC = {
  id: 'C',
  title: 'Scenario C - Riduzione flotta',
  description: '1 magazzino, 7 veicoli (-1), rotte ridistribuite',
  warehouses: [
    { id: 'w1', x: 480, y: 420, label: 'Magazzino Centrale' }
  ],
  kpis: {
    km: 762,
    hours: 32,
    vehicles: 7,
    cost: 1905,
    emissions: 191,
  },
  routes: [
    { color: routeColors[0], vehicleId: 'V1', points: [
      { x: 480, y: 420 }, { x: 350, y: 350 }, { x: 200, y: 80 }, { x: 150, y: 120 },
      { x: 100, y: 180 }, { x: 170, y: 200 }, { x: 80, y: 130 },
      { x: 450, y: 200 }, { x: 480, y: 250 }, { x: 480, y: 420 }
    ]},
    { color: routeColors[1], vehicleId: 'V2', points: [
      { x: 480, y: 420 }, { x: 520, y: 180 }, { x: 750, y: 100 }, { x: 820, y: 150 },
      { x: 700, y: 170 }, { x: 780, y: 200 }, { x: 850, y: 110 }, { x: 480, y: 420 }
    ]},
    { color: routeColors[2], vehicleId: 'V3', points: [
      { x: 480, y: 420 }, { x: 650, y: 400 }, { x: 880, y: 350 }, { x: 920, y: 420 },
      { x: 850, y: 380 }, { x: 900, y: 300 }, { x: 870, y: 450 }, { x: 480, y: 420 }
    ]},
    { color: routeColors[3], vehicleId: 'V4', points: [
      { x: 480, y: 420 }, { x: 800, y: 600 }, { x: 750, y: 650 }, { x: 830, y: 680 },
      { x: 780, y: 550 }, { x: 860, y: 620 }, { x: 550, y: 480 }, { x: 480, y: 420 }
    ]},
    { color: routeColors[4], vehicleId: 'V5', points: [
      { x: 480, y: 420 }, { x: 500, y: 700 }, { x: 450, y: 750 }, { x: 550, y: 720 },
      { x: 480, y: 680 }, { x: 520, y: 760 }, { x: 480, y: 420 }
    ]},
    { color: routeColors[5], vehicleId: 'V6', points: [
      { x: 480, y: 420 }, { x: 400, y: 500 }, { x: 150, y: 650 }, { x: 100, y: 700 },
      { x: 200, y: 680 }, { x: 130, y: 600 }, { x: 180, y: 730 }, { x: 480, y: 420 }
    ]},
    { color: routeColors[6], vehicleId: 'V7', points: [
      { x: 480, y: 420 }, { x: 150, y: 380 }, { x: 80, y: 400 }, { x: 120, y: 350 },
      { x: 100, y: 450 }, { x: 70, y: 320 }, { x: 480, y: 420 }
    ]},
  ],
};

// ─── SCENARIO D ─────────────────────────────────────────────
// 1 warehouse, 7 vehicles, optimized routes
const scenarioD = {
  id: 'D',
  title: 'Scenario D - Rotte ottimizzate',
  description: '1 magazzino, 7 veicoli, rotte ottimizzate con algoritmo',
  warehouses: [
    { id: 'w1', x: 480, y: 420, label: 'Magazzino Centrale' }
  ],
  kpis: {
    km: 618,
    hours: 26,
    vehicles: 7,
    cost: 1545,
    emissions: 155,
  },
  routes: [
    // Optimized: tighter clusters, less backtracking
    { color: routeColors[0], vehicleId: 'V1', points: [
      { x: 480, y: 420 }, { x: 350, y: 350 }, { x: 150, y: 380 }, { x: 80, y: 400 },
      { x: 70, y: 320 }, { x: 120, y: 350 }, { x: 100, y: 450 }, { x: 480, y: 420 }
    ]},
    { color: routeColors[1], vehicleId: 'V2', points: [
      { x: 480, y: 420 }, { x: 450, y: 200 }, { x: 200, y: 80 }, { x: 150, y: 120 },
      { x: 80, y: 130 }, { x: 100, y: 180 }, { x: 170, y: 200 }, { x: 480, y: 250 },
      { x: 480, y: 420 }
    ]},
    { color: routeColors[2], vehicleId: 'V3', points: [
      { x: 480, y: 420 }, { x: 520, y: 180 }, { x: 700, y: 170 }, { x: 750, y: 100 },
      { x: 850, y: 110 }, { x: 820, y: 150 }, { x: 780, y: 200 },
      { x: 900, y: 300 }, { x: 480, y: 420 }
    ]},
    { color: routeColors[3], vehicleId: 'V4', points: [
      { x: 480, y: 420 }, { x: 650, y: 400 }, { x: 850, y: 380 }, { x: 880, y: 350 },
      { x: 920, y: 420 }, { x: 870, y: 450 }, { x: 480, y: 420 }
    ]},
    { color: routeColors[4], vehicleId: 'V5', points: [
      { x: 480, y: 420 }, { x: 550, y: 480 }, { x: 780, y: 550 }, { x: 800, y: 600 },
      { x: 860, y: 620 }, { x: 830, y: 680 }, { x: 750, y: 650 },
      { x: 500, y: 700 }, { x: 480, y: 420 }
    ]},
    { color: routeColors[5], vehicleId: 'V6', points: [
      { x: 480, y: 420 }, { x: 400, y: 500 }, { x: 480, y: 680 }, { x: 450, y: 750 },
      { x: 520, y: 760 }, { x: 550, y: 720 }, { x: 480, y: 420 }
    ]},
    { color: routeColors[6], vehicleId: 'V7', points: [
      { x: 480, y: 420 }, { x: 200, y: 680 }, { x: 150, y: 650 }, { x: 130, y: 600 },
      { x: 100, y: 700 }, { x: 180, y: 730 }, { x: 480, y: 420 }
    ]},
  ],
};

export const scenarios = [scenarioA, scenarioB, scenarioC, scenarioD];
export { allPoints, routeColors };
