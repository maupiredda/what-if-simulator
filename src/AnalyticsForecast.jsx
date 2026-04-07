import {
  kpis,
  volumeSeries,
  fleetUtilization,
  costBreakdown,
  costTotal,
  insights,
} from './data/analytics'

function KpiStat({ label, value, delta, deltaPositive, icon }) {
  return (
    <div className="kpi-card">
      <div className="kpi-icon">{icon}</div>
      <div className="kpi-content">
        <div className="kpi-label">{label}</div>
        <div className="kpi-value">{value}</div>
        <div className={`kpi-diff ${deltaPositive ? 'positive' : 'negative'}`}>{delta}</div>
      </div>
    </div>
  )
}

function VolumeChart() {
  // SVG line chart fatto a mano. Coordinate in viewBox 0..1000 (W) x 0..400 (H)
  const W = 1000
  const H = 400
  const padL = 60
  const padR = 30
  const padT = 30
  const padB = 50

  const data = volumeSeries
  const n = data.length

  // Range Y dinamico
  const allValues = data.flatMap((d) =>
    [d.actual, d.forecast, d.lower, d.upper].filter((v) => v != null)
  )
  const minY = Math.floor(Math.min(...allValues) / 500) * 500 - 200
  const maxY = Math.ceil(Math.max(...allValues) / 500) * 500 + 200
  const rangeY = maxY - minY

  const xFor = (i) => padL + ((W - padL - padR) * i) / (n - 1)
  const yFor = (v) => padT + (H - padT - padB) * (1 - (v - minY) / rangeY)

  // Linea actual: solo dove actual non e' null
  const actualPoints = data.map((d, i) => ({ i, v: d.actual })).filter((p) => p.v != null)
  const actualPath = actualPoints
    .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${xFor(p.i)} ${yFor(p.v)}`)
    .join(' ')

  // Linea forecast: collega l'ultimo actual al primo forecast e prosegue
  const lastActual = actualPoints[actualPoints.length - 1]
  const forecastPoints = data.map((d, i) => ({ i, v: d.forecast })).filter((p) => p.v != null)
  const forecastChain = lastActual ? [lastActual, ...forecastPoints] : forecastPoints
  const forecastPath = forecastChain
    .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${xFor(p.i)} ${yFor(p.v)}`)
    .join(' ')

  // Banda confidenza (poligono lower + upper)
  const bandPoints = data.filter((d) => d.lower != null && d.upper != null)
  const bandPolyTop = bandPoints.map((d) => `${xFor(data.indexOf(d))},${yFor(d.upper)}`).join(' ')
  const bandPolyBottom = bandPoints
    .slice()
    .reverse()
    .map((d) => `${xFor(data.indexOf(d))},${yFor(d.lower)}`)
    .join(' ')
  const bandPoly = `${bandPolyTop} ${bandPolyBottom}`

  // Y ticks (5 livelli)
  const tickCount = 5
  const yTicks = Array.from({ length: tickCount }, (_, i) => {
    const v = minY + (rangeY * i) / (tickCount - 1)
    return Math.round(v)
  })

  // Indice di separazione actual/forecast (per linea verticale "oggi")
  const todayIdx = lastActual ? lastActual.i : 0

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Volumi consegna — Storico e forecast AI</h3>
          <p className="chart-desc">Ultimi 6 mesi + previsione 4 mesi (banda confidenza ±)</p>
        </div>
        <div className="chart-legend">
          <span className="legend-pill">
            <span className="legend-line solid"></span>Storico
          </span>
          <span className="legend-pill">
            <span className="legend-line dashed"></span>Forecast AI
          </span>
          <span className="legend-pill">
            <span className="legend-band"></span>Confidenza
          </span>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="volume-chart" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="bandGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#4D96FF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#4D96FF" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="actualGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#4ECDC4" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Y grid lines + labels */}
        {yTicks.map((t) => (
          <g key={`yt-${t}`}>
            <line
              x1={padL}
              x2={W - padR}
              y1={yFor(t)}
              y2={yFor(t)}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
            <text
              x={padL - 10}
              y={yFor(t) + 5}
              fill="#8892b0"
              fontSize="15"
              textAnchor="end"
              fontFamily="Inter, sans-serif"
            >
              {t.toLocaleString('it-IT')}
            </text>
          </g>
        ))}

        {/* X labels (mesi) */}
        {data.map((d, i) => (
          <text
            key={`xl-${i}`}
            x={xFor(i)}
            y={H - padB + 24}
            fill="#8892b0"
            fontSize="15"
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
          >
            {d.month}
          </text>
        ))}

        {/* Linea verticale "oggi" */}
        <line
          x1={xFor(todayIdx)}
          x2={xFor(todayIdx)}
          y1={padT}
          y2={H - padB}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <text
          x={xFor(todayIdx) + 8}
          y={padT + 16}
          fill="#8892b0"
          fontSize="14"
          fontFamily="Inter, sans-serif"
        >
          oggi
        </text>

        {/* Banda confidenza */}
        {bandPoints.length > 1 && (
          <polygon points={bandPoly} fill="url(#bandGrad)" stroke="none" />
        )}

        {/* Linea actual */}
        <path
          d={actualPath}
          fill="none"
          stroke="#4ECDC4"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Linea forecast (tratteggiata) */}
        <path
          d={forecastPath}
          fill="none"
          stroke="#4D96FF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="6 6"
        />

        {/* Punti actual */}
        {actualPoints.map((p) => (
          <circle key={`pa-${p.i}`} cx={xFor(p.i)} cy={yFor(p.v)} r="4" fill="#4ECDC4" />
        ))}

        {/* Punti forecast */}
        {forecastPoints.map((p) => (
          <circle
            key={`pf-${p.i}`}
            cx={xFor(p.i)}
            cy={yFor(p.v)}
            r="4"
            fill="#0F1923"
            stroke="#4D96FF"
            strokeWidth="2"
          />
        ))}

        {/* Annotation per il picco di Gennaio */}
        {(() => {
          const peakIdx = data.findIndex((d) => d.month === 'Gen 26')
          if (peakIdx < 0) return null
          const v = data[peakIdx].actual
          return (
            <g>
              <circle cx={xFor(peakIdx)} cy={yFor(v)} r="8" fill="none" stroke="#FFD93D" strokeWidth="2" />
              <text
                x={xFor(peakIdx)}
                y={yFor(v) - 16}
                fill="#FFD93D"
                fontSize="14"
                fontWeight="600"
                textAnchor="middle"
                fontFamily="Inter, sans-serif"
              >
                Picco stagione influenzale
              </text>
            </g>
          )
        })()}
      </svg>
    </div>
  )
}

function FleetPanel() {
  const colorFor = (status) => {
    if (status === 'over') return '#FF6B6B'
    if (status === 'under') return '#FFD93D'
    return '#4ECDC4'
  }
  // Aggregate stats for card sub-headline
  const overCount = fleetUtilization.filter((v) => v.status === 'over').length
  const underCount = fleetUtilization.filter((v) => v.status === 'under').length
  const okCount = fleetUtilization.filter((v) => v.status === 'ok').length
  const avgUsage = Math.round(
    fleetUtilization.reduce((acc, v) => acc + v.usage, 0) / fleetUtilization.length
  )

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Utilizzo flotta</h3>
          <p className="chart-desc">% capacità impiegata per veicolo — utilizzo medio {avgUsage}%</p>
        </div>
        <div className="chart-legend">
          <span className="legend-pill">
            <span className="dot" style={{ backgroundColor: '#FFD93D' }}></span>Sotto-utilizzato ({underCount})
          </span>
          <span className="legend-pill">
            <span className="dot" style={{ backgroundColor: '#4ECDC4' }}></span>Ottimo ({okCount})
          </span>
          <span className="legend-pill">
            <span className="dot" style={{ backgroundColor: '#FF6B6B' }}></span>Sovraccarico ({overCount})
          </span>
        </div>
      </div>
      <div className="fleet-bars-grid">
        {fleetUtilization.map((v) => (
          <div key={v.vehicle} className="fleet-row">
            <div className="fleet-label">{v.vehicle}</div>
            <div className="fleet-bar-track">
              <div
                className="fleet-bar-fill"
                style={{
                  width: `${v.usage}%`,
                  backgroundColor: colorFor(v.status),
                }}
              />
            </div>
            <div className="fleet-pct" style={{ color: colorFor(v.status) }}>
              {v.usage}%
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CostsPanel() {
  // Stacked horizontal bar SVG so the panel fills the same space as the volume chart
  const W = 1000
  const H = 400
  const padL = 60
  const padR = 30
  const padT = 30
  const padB = 60

  const barH = 80
  const barY = padT + 40
  const barW = W - padL - padR
  const cumPct = []
  let acc = 0
  costBreakdown.forEach((c) => {
    const pct = (c.value / costTotal) * 100
    cumPct.push({ ...c, start: acc, pct })
    acc += pct
  })

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Simulazione costi mensili</h3>
          <p className="chart-desc">
            Breakdown costi operativi flotta — totale {costTotal.toLocaleString('it-IT')} €/mese
          </p>
        </div>
        <div className="chart-legend">
          {costBreakdown.map((c) => (
            <span key={c.label} className="legend-pill">
              <span className="dot" style={{ backgroundColor: c.color }}></span>
              {c.label}
            </span>
          ))}
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="volume-chart" preserveAspectRatio="xMidYMid meet">
        {/* Stacked bar */}
        {cumPct.map((c) => {
          const x = padL + (barW * c.start) / 100
          const w = (barW * c.pct) / 100
          return (
            <g key={c.label}>
              <rect x={x} y={barY} width={w} height={barH} fill={c.color} rx="6" />
              <text
                x={x + w / 2}
                y={barY + barH / 2 + 8}
                textAnchor="middle"
                fill="#0F1923"
                fontSize="22"
                fontWeight="700"
                fontFamily="Inter, sans-serif"
              >
                {c.pct.toFixed(0)}%
              </text>
            </g>
          )
        })}

        {/* Detail rows below */}
        {costBreakdown.map((c, i) => {
          const colW = (W - padL - padR) / costBreakdown.length
          const x = padL + colW * i + colW / 2
          const y = barY + barH + 60
          return (
            <g key={`d-${c.label}`}>
              <circle cx={x - 80} cy={y - 7} r="6" fill={c.color} />
              <text
                x={x - 66}
                y={y}
                fill="#8892b0"
                fontSize="17"
                fontFamily="Inter, sans-serif"
              >
                {c.label}
              </text>
              <text
                x={x - 66}
                y={y + 28}
                fill="#ffffff"
                fontSize="24"
                fontWeight="700"
                fontFamily="Inter, sans-serif"
              >
                {c.value.toLocaleString('it-IT')} €
              </text>
            </g>
          )
        })}

        {/* Totale a destra */}
        <text
          x={W - padR}
          y={padT + 20}
          fill="#8892b0"
          fontSize="16"
          textAnchor="end"
          fontFamily="Inter, sans-serif"
        >
          Totale mensile
        </text>
        <text
          x={W - padR}
          y={padT + 48}
          fill="#ffffff"
          fontSize="26"
          fontWeight="700"
          textAnchor="end"
          fontFamily="Inter, sans-serif"
        >
          {costTotal.toLocaleString('it-IT')} €
        </text>
      </svg>
    </div>
  )
}

function InsightsPanel() {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Insights AI</h3>
          <p className="chart-desc">Raccomandazioni generate automaticamente dai dati operativi</p>
        </div>
      </div>
      <div className="insights-grid">
        {insights.map((ins) => (
          <div key={ins.id} className="insight-card" style={{ borderLeftColor: ins.color }}>
            <div className="insight-icon" style={{ backgroundColor: `${ins.color}22`, color: ins.color }}>
              {ins.icon}
            </div>
            <div className="insight-content">
              <div className="insight-title" style={{ color: ins.color }}>
                {ins.title}
              </div>
              <div className="insight-text">{ins.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AnalyticsForecast() {
  return (
    <div className="analytics-page">
      {/* Header */}
      <header className="header">
        <div className="logo logo-addr">INTELLIGENZA ARTIFICIALE</div>
        <h1>Analisi dati e forecasting</h1>
        <p className="subtitle">
          Analisi massiva dei dati operativi per prendere decisioni informate
        </p>
      </header>

      {/* KPI bar */}
      <div className="kpi-bar">
        {kpis.map((k) => (
          <KpiStat key={k.key} {...k} />
        ))}
      </div>

      {/* All panels stacked vertically with identical dimensions */}
      <div className="analytics-stack">
        <VolumeChart />
        <FleetPanel />
        <CostsPanel />
        <InsightsPanel />
      </div>
    </div>
  )
}
