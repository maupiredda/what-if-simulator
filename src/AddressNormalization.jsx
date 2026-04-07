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
  if (normalized.tw !== record.tw) {
    fields.push({ field: 'tw', from: record.tw || '—', to: normalized.tw })
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

  const cliSugg = suggestions?.find((s) => s.field === 'cliente')
  const addrSugg = suggestions?.find((s) => s.field === 'indirizzo')
  const capSugg = suggestions?.find((s) => s.field === 'cap')
  const cittaSugg = suggestions?.find((s) => s.field === 'citta')
  const twSugg = suggestions?.find((s) => s.field === 'tw')

  return (
    <tr className={rowClass}>
      <td className="cell-id">
        <div className="cell-wrap">#{record.id}</div>
      </td>
      <td>
        <div className="cell-wrap">
          <div className="cell-main">{record.cliente}</div>
          {cliSugg && (
            <div className="suggestion">
              <span className="from">{cliSugg.from}</span>
              <span className="arrow">→</span>
              <span className="to">{cliSugg.to}</span>
            </div>
          )}
        </div>
      </td>
      <td>
        <div className="cell-wrap">
          <div className="cell-main">{record.indirizzo || '—'}</div>
          {addrSugg && (
            <div className="suggestion">
              <span className="from">{addrSugg.from}</span>
              <span className="arrow">→</span>
              <span className="to">{addrSugg.to}</span>
            </div>
          )}
        </div>
      </td>
      <td>
        <div className="cell-wrap">
          <div className="cell-main">{record.cap || '—'}</div>
          {capSugg && (
            <div className="suggestion">
              <span className="from">{capSugg.from}</span>
              <span className="arrow">→</span>
              <span className="to">{capSugg.to}</span>
            </div>
          )}
        </div>
      </td>
      <td>
        <div className="cell-wrap">
          <div className="cell-main">{record.citta || '—'}</div>
          {cittaSugg && (
            <div className="suggestion">
              <span className="from">{cittaSugg.from}</span>
              <span className="arrow">→</span>
              <span className="to">{cittaSugg.to}</span>
            </div>
          )}
        </div>
      </td>
      <td className="cell-tw">
        <div className="cell-wrap">
          <div className="cell-main mono">{record.tw || '—'}</div>
          {twSugg && (
            <div className="suggestion">
              <span className="from mono">{twSugg.from}</span>
              <span className="arrow">→</span>
              <span className="to mono">{twSugg.to}</span>
            </div>
          )}
        </div>
      </td>
      <td className="cell-status">
        <div className="cell-wrap">
          <div className="badges-stack">
            {phase.showIssues &&
              issues.map((issue) => <IssueBadge key={issue} type={issue} />)}
            {phase.showFixes &&
              fixes.map((fix) => <FixBadge key={fix} type={fix} />)}
          </div>
        </div>
      </td>
    </tr>
  )
}

export default function AddressNormalization({ phaseIndex, setPhaseIndex }) {
  const phase = phases[phaseIndex]

  const tableRecords = useMemo(() => {
    return phase.dataset === 'normalized' ? normalizedRecords : rawRecords
  }, [phase.dataset])

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
      </div>

      {/* Records table */}
      <div className="table-container">
        <div className="table-header">
          <h3 className="table-title">{phase.title}</h3>
          <p className="table-desc">{phase.description}</p>
        </div>
        <div className="table-scroll">
          <table className="records-table">
            <colgroup>
              <col className="col-id" />
              <col className="col-cliente" />
              <col className="col-indirizzo" />
              <col className="col-cap" />
              <col className="col-citta" />
              <col className="col-tw" />
              <col className="col-stato" />
            </colgroup>
            <thead>
              <tr>
                <th>#</th>
                <th>Cliente</th>
                <th>Indirizzo</th>
                <th>CAP</th>
                <th>Citta</th>
                <th>Orario (TW)</th>
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
