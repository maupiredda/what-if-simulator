// Anagrafiche clienti (farmacie fittizie) con problemi mirati per dimostrare
// la normalizzazione AI. Ogni record ha una versione "raw" (cosi come arriva
// dal cliente) e una versione "normalizzata" (cosi come la corregge l'AI).
// La colonna "tw" (time window) e' in formati diversi a ogni riga in fase A,
// e viene normalizzata al formato canonico HH:MM-HH:MM / HH:MM-HH:MM.

export const rawRecords = [
  {
    id: 1,
    cliente: 'farmacia sant ambrogio srl',
    indirizzo: 'via roma 12',
    cap: '20121',
    citta: 'milano',
    tw: '8.30-12.30 / 15.30-19.30',
    issues: ['lowercase', 'inconsistent_tw'],
  },
  {
    id: 2,
    cliente: 'Farmacia Aurora',
    indirizzo: 'C.so Buenos Aires 45',
    cap: '20124',
    citta: 'Milano',
    tw: 'dalle 9 alle 13 e dalle 16 alle 20',
    issues: ['abbreviation', 'inconsistent_tw'],
  },
  {
    id: 3,
    cliente: 'Farmacia Manzoni',
    indirizzo: 'Via Manzon 8',
    cap: '20121',
    citta: 'Milano',
    tw: 'Lun-Sab 8:30/12:30 - 15:30/19:30',
    issues: ['typo', 'inconsistent_tw'],
  },
  {
    id: 4,
    cliente: 'Farmacia Garibaldi',
    indirizzo: 'Via Garibaldi 18',
    cap: '',
    citta: 'Milano',
    tw: '8-13 / 16-19.30',
    issues: ['missing_cap', 'inconsistent_tw'],
  },
  {
    id: 5,
    cliente: 'Farmacia Verdi',
    indirizzo: 'Via Verdi 7',
    cap: '20100',
    citta: 'Milano',
    tw: 'orario continuato 8.30-19.30',
    issues: ['wrong_cap', 'inconsistent_tw'],
  },
  {
    id: 6,
    cliente: 'Farmacia Italia',
    indirizzo: 'Corso Italia 23',
    cap: '',
    citta: '',
    tw: '9:00 13:00 / 16:00 20:00',
    issues: ['ambiguous', 'inconsistent_tw'],
  },
];

// Stato dei record nella fase 4 (normalizzati)
export const normalizedRecords = [
  {
    id: 1,
    cliente: 'Farmacia Sant Ambrogio S.r.l.',
    indirizzo: 'Via Roma 12',
    cap: '20121',
    citta: 'Milano',
    tw: '08:30-12:30 / 15:30-19:30',
    fixes: ['fixed_case', 'normalized_tw'],
    status: 'ok',
  },
  {
    id: 2,
    cliente: 'Farmacia Aurora',
    indirizzo: 'Corso Buenos Aires 45',
    cap: '20124',
    citta: 'Milano',
    tw: '09:00-13:00 / 16:00-20:00',
    fixes: ['expanded_abbreviation', 'normalized_tw'],
    status: 'ok',
  },
  {
    id: 3,
    cliente: 'Farmacia Manzoni',
    indirizzo: 'Via Manzoni 8',
    cap: '20121',
    citta: 'Milano',
    tw: '08:30-12:30 / 15:30-19:30',
    fixes: ['fixed_typo', 'normalized_tw'],
    status: 'ok',
  },
  {
    id: 4,
    cliente: 'Farmacia Garibaldi',
    indirizzo: 'Corso Garibaldi 18',
    cap: '20121',
    citta: 'Milano',
    tw: '08:00-13:00 / 16:00-19:30',
    fixes: ['added_cap', 'normalized_tw'],
    status: 'ok',
  },
  {
    id: 5,
    cliente: 'Farmacia Verdi',
    indirizzo: 'Via Verdi 7',
    cap: '20121',
    citta: 'Milano',
    tw: '08:30-19:30',
    fixes: ['fixed_cap', 'normalized_tw'],
    status: 'ok',
  },
  {
    id: 6,
    cliente: 'Farmacia Italia',
    indirizzo: 'Corso Italia 23',
    cap: '20122',
    citta: 'Milano',
    tw: '09:00-13:00 / 16:00-20:00',
    fixes: ['resolved_ambiguity', 'normalized_tw'],
    status: 'ok',
  },
];

// Etichette dei badge / fix usati nella tabella
export const issueLabels = {
  lowercase: { label: 'Maiuscole errate', color: '#FFD93D' },
  abbreviation: { label: 'Abbreviazione', color: '#FFD93D' },
  typo: { label: 'Typo', color: '#FF6B6B' },
  invalid_number: { label: 'Civico inesistente', color: '#FF6B6B' },
  missing_cap: { label: 'CAP mancante', color: '#FFD93D' },
  wrong_cap: { label: 'CAP errato', color: '#FF6B6B' },
  ambiguous: { label: 'Indirizzo ambiguo', color: '#FFD93D' },
  inconsistent_tw: { label: 'Orario non standard', color: '#FFD93D' },
};

export const fixLabels = {
  fixed_case: { label: 'Maiuscole corrette', color: '#4ECDC4' },
  expanded_abbreviation: { label: 'Abbreviazione espansa', color: '#4ECDC4' },
  fixed_typo: { label: 'Typo corretto', color: '#4ECDC4' },
  fixed_number: { label: 'Civico corretto', color: '#4ECDC4' },
  added_cap: { label: 'CAP aggiunto', color: '#4ECDC4' },
  fixed_cap: { label: 'CAP corretto', color: '#4ECDC4' },
  resolved_ambiguity: { label: 'Ambiguita risolta', color: '#4ECDC4' },
  normalized_tw: { label: 'Orario normalizzato', color: '#4ECDC4' },
};

// Le 4 fasi della normalizzazione
export const phases = [
  {
    id: 1,
    code: 'A',
    title: 'Dati importati',
    description: 'Anagrafiche grezze appena ricevute dal cliente',
    stats: {
      totali: 6,
      conflitti: 0,
      validati: 0,
    },
    showIssues: false,
    showFixes: false,
    showSuggestions: false,
    dataset: 'raw',
  },
  {
    id: 2,
    code: 'B',
    title: 'Rilevamento conflitti AI',
    description: "L'AI analizza i record e identifica i problemi",
    stats: {
      totali: 6,
      conflitti: 12,
      validati: 0,
    },
    showIssues: true,
    showFixes: false,
    showSuggestions: false,
    dataset: 'raw',
  },
  {
    id: 3,
    code: 'C',
    title: 'Suggerimenti AI',
    description: "L'AI propone le correzioni per ogni record problematico",
    stats: {
      totali: 6,
      conflitti: 12,
      validati: 0,
    },
    showIssues: true,
    showFixes: false,
    showSuggestions: true,
    dataset: 'raw',
  },
  {
    id: 4,
    code: 'D',
    title: 'Dati normalizzati',
    description: 'Record corretti, normalizzati e pronti per essere usati',
    stats: {
      totali: 6,
      conflitti: 0,
      validati: 6,
    },
    showIssues: false,
    showFixes: true,
    showSuggestions: false,
    dataset: 'normalized',
  },
];
