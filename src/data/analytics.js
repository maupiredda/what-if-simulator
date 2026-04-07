// Dati di esempio per il dashboard "Analisi dati e forecasting".
// Contesto: distribuzione intermedia del farmaco. Mese corrente Apr 2026.
// I valori storici rappresentano gli ultimi 6 mesi (Ott 2025 - Mar 2026)
// e il forecast AI proietta i prossimi 4 mesi (Apr 2026 - Lug 2026).

// KPI sintetici in alto
export const kpis = [
  {
    key: 'consegne',
    label: 'Consegne / mese',
    value: '4.820',
    delta: '+12% vs mese prec.',
    deltaPositive: true,
    icon: '📦',
  },
  {
    key: 'puntualita',
    label: 'Tasso puntualità',
    value: '96,4%',
    delta: '+1,2 pp',
    deltaPositive: true,
    icon: '⏱',
  },
  {
    key: 'flotta',
    label: 'Utilizzo flotta',
    value: '78%',
    delta: '-3 pp',
    deltaPositive: false,
    icon: '🚛',
  },
  {
    key: 'costo',
    label: 'Costo / consegna',
    value: '8,45 €',
    delta: '-0,30 €',
    deltaPositive: true,
    icon: '💰',
  },
];

// Serie temporale: volumi consegna mensili.
// Mesi storici (actual) e futuri (forecast).
// Il picco a Dic-Gen riflette la stagione influenzale tipica del pharma.
export const volumeSeries = [
  { month: 'Ott 25', actual: 4120, forecast: null, lower: null, upper: null },
  { month: 'Nov 25', actual: 4280, forecast: null, lower: null, upper: null },
  { month: 'Dic 25', actual: 4950, forecast: null, lower: null, upper: null },
  { month: 'Gen 26', actual: 5180, forecast: null, lower: null, upper: null },
  { month: 'Feb 26', actual: 4640, forecast: null, lower: null, upper: null },
  { month: 'Mar 26', actual: 4820, forecast: null, lower: null, upper: null },
  // Forecast: bridge dal mese corrente
  { month: 'Apr 26', actual: null, forecast: 4720, lower: 4520, upper: 4920 },
  { month: 'Mag 26', actual: null, forecast: 4580, lower: 4360, upper: 4800 },
  { month: 'Giu 26', actual: null, forecast: 4410, lower: 4170, upper: 4650 },
  { month: 'Lug 26', actual: null, forecast: 4280, lower: 4020, upper: 4540 },
];

// Utilizzo flotta — 8 veicoli con percentuali variabili.
// Verde: 65-85% (ottimo)
// Giallo: >85% (sovraccarico)
// Rosso: <65% (sottoutilizzato)
export const fleetUtilization = [
  { vehicle: 'V1', usage: 78, status: 'ok' },
  { vehicle: 'V2', usage: 92, status: 'over' },
  { vehicle: 'V3', usage: 52, status: 'under' },
  { vehicle: 'V4', usage: 81, status: 'ok' },
  { vehicle: 'V5', usage: 94, status: 'over' },
  { vehicle: 'V6', usage: 76, status: 'ok' },
  { vehicle: 'V7', usage: 58, status: 'under' },
  { vehicle: 'V8', usage: 73, status: 'ok' },
];

// Breakdown costi mensili (EUR)
export const costBreakdown = [
  { label: 'Carburante', value: 18200, color: '#FFD93D' },
  { label: 'Personale', value: 32500, color: '#4D96FF' },
  { label: 'Manutenzione', value: 4300, color: '#FF8B94' },
  { label: 'Altro', value: 2100, color: '#A78BFA' },
];

export const costTotal = costBreakdown.reduce((acc, c) => acc + c.value, 0);

// Insights AI generati automaticamente
export const insights = [
  {
    id: 1,
    type: 'forecast',
    icon: '📈',
    title: 'Picco volumi previsto a Gennaio',
    text: 'Il forecast indica +18% di consegne a Gennaio per la stagione influenzale. Suggerito: aggiungere 1 veicolo temporaneo o pianificare turni extra.',
    color: '#4D96FF',
  },
  {
    id: 2,
    type: 'fleet',
    icon: '🚛',
    title: 'V3 e V7 sotto-utilizzati',
    text: 'Veicoli V3 e V7 al 52% e 58% di utilizzo. Risparmio potenziale: ~4.200 €/mese riassegnando le rotte ai veicoli sovraccarichi (V2, V5).',
    color: '#FFD93D',
  },
  {
    id: 3,
    type: 'cost',
    icon: '💰',
    title: 'Costo medio in calo',
    text: 'Costo medio per consegna -3,4% dopo l\'ottimizzazione delle rotte di Marzo. Trend in linea con l\'obiettivo trimestrale di 8,20 €/consegna.',
    color: '#4ECDC4',
  },
];
