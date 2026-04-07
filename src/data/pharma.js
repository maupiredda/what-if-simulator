// Dati di esempio per la pagina "Iper-verticale sulla farmaceutica"
// Quattro viste: Timeline, Configuratore, Scheda farmacia, Mappa

// ─── 1. Timeline (Gantt) — Schedulazione giornaliera ─────────────
// Veicoli con consegne distribuite nell'arco della giornata
// type: 'standard' | 'cold' | 'urgent' | 'night'
// start in ore (es. 8.5 = 8:30), duration in ore

// Durate includono tempo di consegna + tragitto al cliente successivo
export const ganttVehicles = [
  {
    id: 'V1',
    typeLabel: 'Catena del freddo',
    typeColor: '#4D96FF',
    deliveries: [
      { name: 'Sant Ambrogio', start: 7.0, duration: 1.5, type: 'cold' },
      { name: 'Brera', start: 8.7, duration: 1.4, type: 'cold' },
      { name: 'Manzoni', start: 10.3, duration: 1.5, type: 'cold' },
      { name: 'Aurora', start: 12.0, duration: 1.5, type: 'cold' },
      { name: 'del Duomo', start: 13.7, duration: 1.4, type: 'cold' },
    ],
  },
  {
    id: 'V2',
    typeLabel: 'Urgenze',
    typeColor: '#FF6B6B',
    deliveries: [
      { name: 'Garibaldi', start: 6.8, duration: 1.4, type: 'urgent' },
      { name: 'Italia', start: 8.4, duration: 1.4, type: 'urgent' },
      { name: 'San Marco', start: 10.0, duration: 1.4, type: 'standard' },
      { name: 'Dante', start: 11.6, duration: 1.3, type: 'urgent' },
      { name: 'Roma', start: 13.1, duration: 1.5, type: 'urgent' },
    ],
  },
  {
    id: 'V3',
    typeLabel: 'Standard',
    typeColor: '#4ECDC4',
    deliveries: [
      { name: 'Como', start: 7.5, duration: 1.5, type: 'standard' },
      { name: 'Lecco', start: 9.2, duration: 1.5, type: 'standard' },
      { name: 'Bergamo', start: 10.9, duration: 1.6, type: 'standard' },
      { name: 'Brescia', start: 12.7, duration: 1.6, type: 'standard' },
      { name: 'Mantova', start: 14.5, duration: 1.5, type: 'standard' },
    ],
  },
  {
    id: 'V4',
    typeLabel: 'Standard',
    typeColor: '#4ECDC4',
    deliveries: [
      { name: 'Varese', start: 7.2, duration: 1.5, type: 'standard' },
      { name: 'Busto', start: 8.9, duration: 1.4, type: 'standard' },
      { name: 'Gallarate', start: 10.5, duration: 1.5, type: 'standard' },
      { name: 'Saronno', start: 12.2, duration: 1.4, type: 'standard' },
      { name: 'Legnano', start: 13.8, duration: 1.5, type: 'standard' },
    ],
  },
  {
    id: 'V5',
    typeLabel: 'Catena del freddo',
    typeColor: '#4D96FF',
    deliveries: [
      { name: 'Genova', start: 7.0, duration: 1.6, type: 'cold' },
      { name: 'Savona', start: 8.8, duration: 1.5, type: 'cold' },
      { name: 'La Spezia', start: 10.5, duration: 1.5, type: 'cold' },
      { name: 'Sanremo', start: 12.2, duration: 1.5, type: 'cold' },
      { name: 'Imperia', start: 13.9, duration: 1.5, type: 'cold' },
    ],
  },
  {
    id: 'V6',
    typeLabel: 'Notturna',
    typeColor: '#A78BFA',
    deliveries: [
      { name: 'Osp. Niguarda', start: 21.0, duration: 1.4, type: 'night' },
      { name: 'Osp. S. Raffaele', start: 22.6, duration: 1.3, type: 'night' },
      { name: 'P.S. Centrale', start: 24.1, duration: 1.2, type: 'night' },
      { name: 'G.M. Sud', start: 25.5, duration: 1.2, type: 'night' },
    ],
  },
]

export const ganttTypes = {
  standard: { label: 'Standard', color: '#4ECDC4', icon: '📦' },
  cold: { label: 'Catena del freddo', color: '#4D96FF', icon: '❄' },
  urgent: { label: 'Urgente', color: '#FF6B6B', icon: '⚡' },
  night: { label: 'Notturna', color: '#A78BFA', icon: '🌙' },
}

// ─── 2. Configuratore vincoli pharma ─────────────────────────────
export const configSections = [
  {
    id: 'tw',
    icon: '⏱',
    title: 'Finestre orarie personalizzate',
    desc: 'Per cliente, giorno della settimana, festivita',
    fields: [
      { label: 'Lun-Ven mattino', value: '08:30 - 12:30', type: 'chip' },
      { label: 'Lun-Ven pomeriggio', value: '15:30 - 19:30', type: 'chip' },
      { label: 'Sabato', value: '09:00 - 12:30', type: 'chip' },
      { label: 'Domenica', value: 'Chiuso', type: 'chip-muted' },
    ],
  },
  {
    id: 'unload',
    icon: '📦',
    title: 'Tempi di scarico variabili',
    desc: 'Calibrati per tipo di consegna e volume',
    fields: [
      { label: 'Scarico standard', value: '8 min', type: 'value' },
      { label: 'Scarico voluminoso', value: '15 min', type: 'value' },
      { label: 'Catena del freddo', value: '12 min', type: 'value' },
      { label: 'Stupefacenti', value: '18 min', type: 'value' },
    ],
  },
  {
    id: 'normative',
    icon: '⚖',
    title: 'Vincoli normativi farmaceutici',
    desc: 'Conformita GDP, tracciabilita, custodia',
    fields: [
      { label: 'GDP UE 2013/C 343/01', value: 'Attivo', type: 'toggle-on' },
      { label: 'Catena di custodia', value: 'Attivo', type: 'toggle-on' },
      { label: 'Tracciabilita lotto/scadenza', value: 'Attivo', type: 'toggle-on' },
      { label: 'Firma digitale ricevuta', value: 'Attivo', type: 'toggle-on' },
    ],
  },
  {
    id: 'cold',
    icon: '❄',
    title: 'Gestione catena del freddo',
    desc: 'Monitoraggio temperature in tempo reale',
    fields: [
      { label: 'Refrigerato (+2 / +8 °C)', value: 'Attivo', type: 'toggle-on' },
      { label: 'Congelato (-25 / -15 °C)', value: 'Attivo', type: 'toggle-on' },
      { label: 'Tolleranza max', value: '15 min', type: 'value' },
      { label: 'Alert deviazione', value: '±1 °C', type: 'value' },
    ],
  },
  {
    id: 'multi',
    icon: '🏭',
    title: 'Multi-magazzino',
    desc: 'Gestione di piu hub regionali',
    fields: [
      { label: 'Hub Nord (Milano)', value: 'Attivo', type: 'toggle-on' },
      { label: 'Hub Centro (Bologna)', value: 'Attivo', type: 'toggle-on' },
      { label: 'Hub Sud (Napoli)', value: 'Attivo', type: 'toggle-on' },
      { label: 'Cross-docking', value: 'Attivo', type: 'toggle-on' },
    ],
  },
  {
    id: 'night',
    icon: '🌙',
    title: 'Consegne notturne',
    desc: 'Per ospedali, guardie mediche, h24',
    fields: [
      { label: 'Finestra notturna', value: '21:00 - 06:00', type: 'chip' },
      { label: 'Veicoli dedicati', value: '2 mezzi', type: 'value' },
      { label: 'Fascia urgenza', value: '< 90 min', type: 'value' },
      { label: 'Reperibilita 24/7', value: 'Attivo', type: 'toggle-on' },
    ],
  },
  {
    id: 'urgent',
    icon: '⚡',
    title: 'Priorita consegne urgenti',
    desc: 'Re-ordering automatico delle rotte',
    fields: [
      { label: 'Livello P1 (critico)', value: '< 60 min', type: 'value' },
      { label: 'Livello P2 (urgente)', value: '< 3 ore', type: 'value' },
      { label: 'Livello P3 (priorita)', value: '< 8 ore', type: 'value' },
      { label: 'Re-route automatico', value: 'Attivo', type: 'toggle-on' },
    ],
  },
  {
    id: 'discriminate',
    icon: '👤',
    title: 'Discrimine per recapito',
    desc: 'Modalita di consegna e firmatari',
    fields: [
      { label: 'Solo titolare', value: 'Attivo', type: 'toggle-on' },
      { label: 'Personale autorizzato', value: 'Lista', type: 'value' },
      { label: 'Documento d\'identita', value: 'Richiesto', type: 'value' },
      { label: 'Notifica preconsegna', value: 'SMS + Email', type: 'value' },
    ],
  },
]

// ─── 3. Scheda farmacia dettagliata ──────────────────────────────
export const pharmacyDetail = {
  name: 'Farmacia Sant Ambrogio S.r.l.',
  code: 'PH-00142',
  address: 'Via Roma 12, 20121 Milano (MI)',
  type: 'Farmacia indipendente — Class A',
  manager: 'Dott. Marco Rossi',
  phone: '+39 02 1234567',
  email: 'ordini@farmaciasantambrogio.it',
  partita_iva: 'IT 01234567890',

  sections: [
    {
      id: 'tw',
      icon: '⏱',
      title: 'Finestre orarie',
      rows: [
        { label: 'Lun - Ven', value: '08:30-12:30 / 15:30-19:30' },
        { label: 'Sabato', value: '09:00-12:30' },
        { label: 'Domenica', value: 'Chiuso' },
        { label: 'Festivita', value: 'Chiuso' },
      ],
    },
    {
      id: 'cold',
      icon: '❄',
      title: 'Catena del freddo',
      rows: [
        { label: 'Refrigerato', value: '+2 / +8 °C', highlight: true },
        { label: 'Congelato', value: 'Non richiesto' },
        { label: 'Volume medio', value: '12 colli/giorno' },
        { label: 'Tolleranza scarico', value: 'Max 10 min fuori temperatura' },
      ],
    },
    {
      id: 'normative',
      icon: '⚖',
      title: 'Conformita normativa',
      rows: [
        { label: 'GDP UE 2013', value: 'Conforme', highlight: true },
        { label: 'Catena di custodia', value: 'Richiesta' },
        { label: 'Stupefacenti tab. II', value: 'Autorizzata' },
        { label: 'Tracciabilita lotto', value: 'Sempre attiva' },
      ],
    },
    {
      id: 'delivery',
      icon: '👤',
      title: 'Recapito e firmatari',
      rows: [
        { label: 'Firmatario primario', value: 'Dott. Marco Rossi (titolare)' },
        { label: 'Firmatari autorizzati', value: '2 farmacisti collaboratori' },
        { label: 'Documento richiesto', value: 'Si — verifica obbligatoria' },
        { label: 'Notifiche', value: 'SMS 30 min prima' },
      ],
    },
    {
      id: 'priority',
      icon: '⚡',
      title: 'Priorita e urgenze',
      rows: [
        { label: 'Livello standard', value: 'P3 — < 8 ore' },
        { label: 'Soglia urgenza', value: 'Auto P2 se stock < 5 unita' },
        { label: 'Cliente VIP', value: 'No' },
        { label: 'SLA contrattuale', value: '99,5% on-time' },
      ],
    },
    {
      id: 'logistics',
      icon: '🏭',
      title: 'Logistica',
      rows: [
        { label: 'Hub di partenza', value: 'Milano - Hub Nord' },
        { label: 'Distanza', value: '4,2 km dall hub' },
        { label: 'Tempo di scarico medio', value: '8 min' },
        { label: 'Frequenza', value: 'Lun, Mer, Ven' },
      ],
    },
  ],
}

// ─── 4. Mappa con badge vincoli ──────────────────────────────────
// 10 farmacie con coordinate e flag vincoli applicabili

export const mapPharmacies = [
  { id: 1, name: 'F. Sant Ambrogio', x: 480, y: 360, badges: ['cold', 'tw'] },
  { id: 2, name: 'F. Brera', x: 540, y: 320, badges: ['cold', 'normative'] },
  { id: 3, name: 'F. Aurora', x: 620, y: 380, badges: ['urgent', 'tw'] },
  { id: 4, name: 'F. del Duomo', x: 460, y: 420, badges: ['cold', 'normative'] },
  { id: 5, name: 'F. Manzoni', x: 520, y: 280, badges: ['cold', 'urgent'] },
  { id: 6, name: 'F. San Marco', x: 380, y: 440, badges: ['tw'] },
  { id: 7, name: 'F. Garibaldi', x: 420, y: 280, badges: ['cold', 'tw', 'normative'] },
  { id: 8, name: 'F. Verdi', x: 580, y: 460, badges: ['urgent', 'cold'] },
  { id: 9, name: 'F. Italia', x: 320, y: 400, badges: ['tw'] },
  { id: 10, name: 'Osp. Niguarda', x: 720, y: 240, badges: ['night', 'cold', 'urgent'] },
  { id: 11, name: 'Osp. San Raffaele', x: 760, y: 380, badges: ['night', 'cold'] },
  { id: 12, name: 'Guardia Medica Sud', x: 280, y: 520, badges: ['night'] },
]

export const badgeTypes = {
  cold: { label: 'Catena del freddo', color: '#4D96FF', icon: '❄' },
  tw: { label: 'Finestra oraria stretta', color: '#FFD93D', icon: '⏱' },
  normative: { label: 'Vincolo normativo', color: '#A78BFA', icon: '⚖' },
  urgent: { label: 'Priorita urgente', color: '#FF6B6B', icon: '⚡' },
  night: { label: 'Consegna notturna', color: '#7DD3FC', icon: '🌙' },
}
