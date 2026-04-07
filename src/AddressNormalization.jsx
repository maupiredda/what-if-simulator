import { useMemo } from 'react'
import {
  rawRecords,
  normalizedRecords,
  issueLabels,
  fixLabels,
  phases,
} from './data/addresses'

function StatCard({ label, value, color, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <div className="stat-label">{label}</div>
        <div className="stat-value" style={color ? { color } : undefined}>
          {value}
        </div>
      </div>
    </div>
  )
}

function IssueBadge({ type }) {
  const item = issueLabels[type]
  if (!item) return null
  return (
    <span
      className="issue-badge"
      style={{
        backgroundColor: `${item.color}22`,
        color: item.color,
        border: `1px solid ${item.color}55`,
      }}
    >
      {item.label}
    </span>
  )
}

function FixBadge({ type }) {
  const item = fixLabels[type]
  if (!item) return null
  return (
    <span
      className="fix-badge"
      style={{
        backgroundColor: `${item.color}22`,
        color: item.color,
        border: `1px solid ${item.color}55`,
      }}
    >
      {item.label}
    </span>
  )
}

function getSuggestion(record) {
  // Restituisce la versione corretta inline del record per la fase 3
  if (record.issues.length === 0) return null
  const normalized = normalizedRecords.find((r) => r.id === record.id)
  if (!normalized) return null
  const fields = []
  if (normalized.cliente !== record.cliente) {
    fields.push({ field: 'cliente', from: record.cliente, to: normalized.cliente })
  }
  if (normalized.indirizzo !== record.indirizzo) {
    fields.push({ field: 'indirizzo', from: record.indirizzo, to: normalized.indirizzo })
  }
  if (normalized.cap !== record.cap) {
    fields.push({ field: 'cap', from: record.cap || '—', to: normalized.cap })
  }
  if (normalized.citta !== record.citta) {
    fields.push({ field: 'citta', from: record.citta || '—', to: normalized.citta })
  }
  return fields
}

function RecordRow({ record, phase }) {
  const issues = record.issues || []
  const fixes = record.fixes || []
  const isDuplicate = issues.includes('duplicate')
  const hasIssues = issues.length > 0
  const suggestions = phase.showSuggestions && record.issues ? getSuggestion(record) : null

  let rowClass = 'record-row'
  if (phase.showIssues && hasIssues) {
    rowClass += isDuplicate || issues.some((i) =>
      ['typo', 'invalid_number', 'wrong_cap'].includes(i)
    )
      ? ' row-error'
      : ' row-warning'
  }
  if (phase.showFixes && fixes.length > 0) {
    rowClass += ' row-success'
  }

  return (
    <tr className={rowClass}>
      <td className="cell-id">#{record.id}</td>
      <td>
        <div className="cell-main">{record.cliente}</div>
        {suggestions?.find((s) => s.field === 'cliente') && (
          <div className="suggestion">
            <span className="from">{suggestions.find((s) => s.field === 'cliente').from}</span>
            <span className="arrow">→</span>
            <span className="to">{suggestions.find((s) => s.field === 'cliente').to}</span>
          </div>
        )}
      </td>
      <td>
        <div className="cell-main">{record.indirizzo || '—'}</div>
        {suggestions?.find((s) => s.field === 'indirizzo') && (
          <div className="suggestion">
            <span className="from">{suggestions.find((s) => s.field === 'indirizzo').from}</span>
            <span className="arrow">→</span>
            <span className="to">{suggestions.find((s) => s.field === 'indirizzo').to}</span>
          </div>
        )}
      </td>
      <td>
        <div className="cell-main">{record.cap || '—'}</div>
        {suggestions?.find((s) => s.field === 'cap') && (
          <div className="suggestion">
            <span className="from">{suggestions.find((s) => s.field === 'cap').from}</span>
            <span className="arrow">→</span>
            <span className="to">{suggestions.find((s) => s.field === 'cap').to}</span>
          </div>
        )}
      </td>
      <td>
        <div className="cell-main">{record.citta || '—'}</div>
        {suggestions?.find((s) => s.field === 'citta') && (
          <div className="suggestion">
            <span className="from">{suggestions.find((s) => s.field === 'citta').from}</span>
            <span className="arrow">→</span>
            <span className="to">{suggestions.find((s) => s.field === 'citta').to}</span>
          </div>
        )}
      </td>
      <td className="cell-status">
        <div className="badges-stack">
          {phase.showIssues &&
            issues.map((issue) => <IssueBadge key={issue} type={issue} />)}
          {phase.showFixes &&
            fixes.map((fix) => <FixBadge key={fix} type={fix} />)}
        </div>
      </td>
    </tr>
  )
}

function MiniMap({ phase, records }) {
  const pinColors = {
    yellow: '#FFD93D',
    green: '#4ECDC4',
    gray: 'rgba(255,255,255,0.25)',
  }
  const pinFill = pinColors[phase.pinColor] || pinColors.gray

  return (
    <div className="minimap-container">
      <div className="minimap-header">
        <span className="minimap-title">Mappa punti di consegna</span>
        <span className="minimap-meta">Milano</span>
      </div>
      <svg viewBox="0 0 1000 800" className="minimap" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="addr-grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="0.5"
            />
          </pattern>
          <filter id="pinGlow">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect width="1000" height="800" fill="url(#addr-grid)" />

        {/* Schematic streets — solo decorazione */}
        <g stroke="rgba(255,255,255,0.06)" strokeWidth="2" fill="none">
          <line x1="0" y1="200" x2="1000" y2="200" />
          <line x1="0" y1="380" x2="1000" y2="380" />
          <line x1="0" y1="560" x2="1000" y2="560" />
          <line x1="200" y1="0" x2="200" y2="800" />
          <line x1="480" y1="0" x2="480" y2="800" />
          <line x1="720" y1="0" x2="720" y2="800" />
        </g>

        {/* Pin punti consegna */}
        {phase.showPins !== 'none' &&
          records.map((rec) => (
            <g key={rec.id} filter="url(#pinGlow)">
              <circle
                cx={rec.mapX}
                cy={rec.mapY}
                r="14"
                fill={pinFill}
                fillOpacity="0.18"
              />
              <circle
                cx={rec.mapX}
                cy={rec.mapY}
                r="7"
                fill={pinFill}
                stroke="#0a0e1a"
                strokeWidth="2"
              />
              <text
                x={rec.mapX}
                y={rec.mapY - 18}
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill={pinFill}
                fontFamily="Inter, sans-serif"
              >
                {rec.id}
              </text>
            </g>
          ))}
      </svg>
    </div>
  )
}

export default function AddressNormalization({ phaseIndex, setPhaseIndex }) {
  const phase = phases[phaseIndex]

  const tableRecords = useMemo(() => {
    return phase.dataset === 'normalized' ? normalizedRecords : rawRecords
  }, [phase.dataset])

  const mapRecords = useMemo(() => {
    if (phase.showPins === 'all') return normalizedRecords
    if (phase.showPins === 'pending') return rawRecords.filter((r) => r.issues.length === 0 || phase.showSuggestions)
    return []
  }, [phase])

  return (
    <div className="addr-page">
      {/* Header */}
      <header className="header">
        <div className="logo logo-addr">INTELLIGENZA ARTIFICIALE</div>
        <h1>Normalizzazione delle anagrafiche</h1>
        <p className="subtitle">
          L'AI pulisce, deduplica e normalizza i dati prima che entrino nel sistema
        </p>
      </header>

      {/* Stat bar */}
      <div className="stat-bar">
        <StatCard label="Record totali" value={phase.stats.totali} icon="📋" />
        <StatCard
          label="Duplicati"
          value={phase.stats.duplicati}
          color={phase.stats.duplicati > 0 ? '#FF6B6B' : '#8892b0'}
          icon="🔁"
        />
        <StatCard
          label="Conflitti"
          value={phase.stats.conflitti}
          color={phase.stats.conflitti > 0 ? '#FFD93D' : '#8892b0'}
          icon="⚠"
        />
        <StatCard
          label="Validati"
          value={phase.stats.validati}
          color={phase.stats.validati > 0 ? '#4ECDC4' : '#8892b0'}
          icon="✓"
        />
        <StatCard
          label="Geocodificati"
          value={phase.stats.geocodificati}
          color={phase.stats.geocodificati > 0 ? '#4ECDC4' : '#8892b0'}
          icon="📍"
        />
      </div>

      {/* Two-column layout */}
      <div className="addr-grid">
        {/* Left: table */}
        <div className="table-container">
          <div className="table-header">
            <h3 className="table-title">{phase.title}</h3>
            <p className="table-desc">{phase.description}</p>
          </div>
          <div className="table-scroll">
            <table className="records-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Cliente</th>
                  <th>Indirizzo</th>
                  <th>CAP</th>
                  <th>Citta</th>
                  <th>Stato</th>
                </tr>
              </thead>
              <tbody>
                {tableRecords.map((rec) => (
                  <RecordRow key={rec.id} record={rec} phase={phase} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: minimap */}
        <MiniMap phase={phase} records={mapRecords} />
      </div>

      {/* Phase selector */}
      <div className="scenario-selector">
        {phases.map((p, i) => (
          <button
            key={p.id}
            className={`scenario-btn ${i === phaseIndex ? 'active' : ''}`}
            onClick={() => setPhaseIndex(i)}
          >
            <span className="scenario-btn-letter">{p.code}</span>
            <span className="scenario-btn-label">{p.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
