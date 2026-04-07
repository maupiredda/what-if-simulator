import { useState } from 'react'
import {
  ganttVehicles,
  ganttTypes,
  configSections,
  pharmacyDetail,
  mapPharmacies,
  badgeTypes,
} from './data/pharma'

// ─── 1. Timeline (Gantt) ─────────────────────────────────────────
function GanttTimeline() {
  const W = 1000
  const H = 540
  const padL = 130
  const padR = 30
  const padT = 70
  const padB = 50

  const startHour = 6
  const endHour = 26 // 02:00 del giorno dopo
  const hourW = (W - padL - padR) / (endHour - startHour)
  const rowH = (H - padT - padB) / ganttVehicles.length
  const blockH = rowH * 0.62

  const xFor = (h) => padL + (h - startHour) * hourW
  const yFor = (i) => padT + i * rowH + (rowH - blockH) / 2

  const formatHour = (h) => {
    const hh = Math.floor(h % 24)
    return `${String(hh).padStart(2, '0')}:00`
  }

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Schedulazione giornaliera</h3>
          <p className="chart-desc">8 veicoli × 16 ore — vincoli farmaceutici applicati in tempo reale</p>
        </div>
        <div className="chart-legend">
          {Object.entries(ganttTypes).map(([key, t]) => (
            <span key={key} className="legend-pill">
              <span className="dot" style={{ backgroundColor: t.color }}></span>
              {t.label}
            </span>
          ))}
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="volume-chart" preserveAspectRatio="xMidYMid meet">
        {/* Vertical hour grid */}
        {Array.from({ length: endHour - startHour + 1 }, (_, i) => {
          const h = startHour + i
          return (
            <g key={`gh-${h}`}>
              <line
                x1={xFor(h)}
                x2={xFor(h)}
                y1={padT - 14}
                y2={H - padB + 4}
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1"
              />
              {i % 2 === 0 && (
                <text
                  x={xFor(h)}
                  y={padT - 22}
                  fill="#8892b0"
                  fontSize="13"
                  textAnchor="middle"
                  fontFamily="Inter, sans-serif"
                >
                  {formatHour(h)}
                </text>
              )}
            </g>
          )
        })}

        {/* Vehicle rows */}
        {ganttVehicles.map((veh, i) => (
          <g key={veh.id}>
            {/* Row label */}
            <text
              x={padL - 16}
              y={yFor(i) + blockH / 2 + 5}
              fill="#ffffff"
              fontSize="14"
              fontWeight="600"
              textAnchor="end"
              fontFamily="Inter, sans-serif"
            >
              {veh.label}
            </text>
            {/* Row separator */}
            <line
              x1={padL}
              x2={W - padR}
              y1={padT + (i + 1) * rowH}
              y2={padT + (i + 1) * rowH}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
            />
            {/* Deliveries */}
            {veh.deliveries.map((d, j) => {
              const t = ganttTypes[d.type]
              const x = xFor(d.start)
              const w = d.duration * hourW
              return (
                <g key={`d-${i}-${j}`}>
                  <rect
                    x={x}
                    y={yFor(i)}
                    width={w}
                    height={blockH}
                    rx="6"
                    fill={t.color}
                    fillOpacity="0.85"
                  />
                  <text
                    x={x + 8}
                    y={yFor(i) + blockH / 2 + 4}
                    fill="#0F1923"
                    fontSize="10"
                    fontWeight="700"
                    fontFamily="Inter, sans-serif"
                  >
                    {d.name.length > 16 ? d.name.slice(0, 14) + '…' : d.name}
                  </text>
                </g>
              )
            })}
          </g>
        ))}
      </svg>
    </div>
  )
}

// ─── 2. Configuratore vincoli pharma ─────────────────────────────
function ConfigPanel() {
  const renderField = (f, idx) => {
    if (f.type === 'chip') {
      return (
        <div key={idx} className="cfg-field">
          <span className="cfg-field-label">{f.label}</span>
          <span className="cfg-chip">{f.value}</span>
        </div>
      )
    }
    if (f.type === 'chip-muted') {
      return (
        <div key={idx} className="cfg-field">
          <span className="cfg-field-label">{f.label}</span>
          <span className="cfg-chip muted">{f.value}</span>
        </div>
      )
    }
    if (f.type === 'toggle-on') {
      return (
        <div key={idx} className="cfg-field">
          <span className="cfg-field-label">{f.label}</span>
          <span className="cfg-toggle on">
            <span className="cfg-toggle-dot"></span>
          </span>
        </div>
      )
    }
    return (
      <div key={idx} className="cfg-field">
        <span className="cfg-field-label">{f.label}</span>
        <span className="cfg-value">{f.value}</span>
      </div>
    )
  }

  return (
    <div className="chart-card config-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Configuratore vincoli farmaceutici</h3>
          <p className="chart-desc">140+ parametri configurabili per modellare ogni vincolo reale</p>
        </div>
        <span className="cfg-badge">140+ parametri</span>
      </div>

      <div className="config-grid">
        {configSections.map((s) => (
          <div key={s.id} className="config-section">
            <div className="config-section-head">
              <span className="config-section-icon">{s.icon}</span>
              <div>
                <div className="config-section-title">{s.title}</div>
                <div className="config-section-desc">{s.desc}</div>
              </div>
            </div>
            <div className="config-section-fields">
              {s.fields.map((f, i) => renderField(f, i))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── 3. Scheda farmacia dettagliata ──────────────────────────────
function PharmacyDetailPanel() {
  return (
    <div className="chart-card pharmacy-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Anagrafica cliente — vista completa</h3>
          <p className="chart-desc">Tutti i parametri operativi di una farmacia in un colpo d'occhio</p>
        </div>
        <span className="cfg-badge">Codice {pharmacyDetail.code}</span>
      </div>

      <div className="pharmacy-body">
        {/* Top header con anagrafica */}
        <div className="pharmacy-header">
          <div className="pharmacy-avatar">RX</div>
          <div className="pharmacy-meta">
            <div className="pharmacy-name">{pharmacyDetail.name}</div>
            <div className="pharmacy-type">{pharmacyDetail.type}</div>
            <div className="pharmacy-info">
              <span>📍 {pharmacyDetail.address}</span>
              <span>👤 {pharmacyDetail.manager}</span>
              <span>📞 {pharmacyDetail.phone}</span>
            </div>
          </div>
        </div>

        {/* Sezioni in griglia 3x2 */}
        <div className="pharmacy-sections">
          {pharmacyDetail.sections.map((s) => (
            <div key={s.id} className="pharmacy-section">
              <div className="ph-section-head">
                <span className="ph-section-icon">{s.icon}</span>
                <span className="ph-section-title">{s.title}</span>
              </div>
              <div className="ph-section-rows">
                {s.rows.map((r, i) => (
                  <div key={i} className="ph-section-row">
                    <span className="ph-row-label">{r.label}</span>
                    <span className={`ph-row-value ${r.highlight ? 'highlight' : ''}`}>
                      {r.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── 4. Mappa con badge vincoli ──────────────────────────────────
function MapBadgesPanel() {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Mappa territoriale dei vincoli</h3>
          <p className="chart-desc">Ogni cliente ha la sua combinazione di vincoli applicabili</p>
        </div>
        <div className="chart-legend">
          {Object.entries(badgeTypes).map(([key, t]) => (
            <span key={key} className="legend-pill">
              <span className="dot" style={{ backgroundColor: t.color }}></span>
              {t.label}
            </span>
          ))}
        </div>
      </div>

      <svg viewBox="0 0 1000 600" className="volume-chart" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="pharma-grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="1000" height="600" fill="url(#pharma-grid)" />

        {/* Streets schematici */}
        <g stroke="rgba(255,255,255,0.06)" strokeWidth="2" fill="none">
          <line x1="0" y1="200" x2="1000" y2="200" />
          <line x1="0" y1="400" x2="1000" y2="400" />
          <line x1="200" y1="0" x2="200" y2="600" />
          <line x1="500" y1="0" x2="500" y2="600" />
          <line x1="800" y1="0" x2="800" y2="600" />
        </g>

        {/* Pharmacies */}
        {mapPharmacies.map((p) => (
          <g key={p.id}>
            {/* Pin */}
            <circle cx={p.x} cy={p.y} r="14" fill="#ffffff" />
            <circle cx={p.x} cy={p.y} r="6" fill="#0F1923" />
            <text
              x={p.x}
              y={p.y - 22}
              fill="#ffffff"
              fontSize="13"
              fontWeight="600"
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
            >
              {p.name}
            </text>
            {/* Badges */}
            {p.badges.map((b, i) => {
              const bt = badgeTypes[b]
              const bx = p.x + 22 + i * 26
              const by = p.y - 8
              return (
                <g key={`b-${p.id}-${i}`}>
                  <circle cx={bx} cy={by} r="11" fill={bt.color} />
                  <text
                    x={bx}
                    y={by + 5}
                    fill="#0F1923"
                    fontSize="13"
                    fontWeight="700"
                    textAnchor="middle"
                    fontFamily="Inter, sans-serif"
                  >
                    {bt.icon}
                  </text>
                </g>
              )
            })}
          </g>
        ))}
      </svg>
    </div>
  )
}

// ─── Main page con sub-tabs ──────────────────────────────────────
const SUB_TABS = [
  { id: 'gantt', label: 'Schedulazione giornaliera', component: GanttTimeline },
  { id: 'config', label: 'Configuratore vincoli', component: ConfigPanel },
  { id: 'pharmacy', label: 'Scheda farmacia', component: PharmacyDetailPanel },
  { id: 'map', label: 'Mappa vincoli', component: MapBadgesPanel },
]

export default function PharmaVertical() {
  const [activeTab, setActiveTab] = useState('gantt')
  const ActiveComponent = SUB_TABS.find((t) => t.id === activeTab).component

  return (
    <div className="pharma-page">
      <header className="header">
        <div className="logo">OPTIVO</div>
        <h1>Iper-verticale sulla farmaceutica</h1>
        <p className="subtitle">
          Un prodotto costruito sulle specificita del vostro settore — 140+ parametri per modellare ogni vincolo reale
        </p>
      </header>

      <div className="sub-tabs">
        {SUB_TABS.map((t) => (
          <button
            key={t.id}
            className={`sub-tab ${activeTab === t.id ? 'active' : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="analytics-stack">
        <ActiveComponent />
      </div>
    </div>
  )
}
