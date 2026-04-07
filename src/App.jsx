import { useState, useEffect } from 'react'
import { scenarios, allPoints } from './data/scenarios'
import AddressNormalization from './AddressNormalization'
import AnalyticsForecast from './AnalyticsForecast'
import RoutingComplexity from './RoutingComplexity'
import PharmaVertical from './PharmaVertical'
import AboutUs from './AboutUs'
import Requirements from './Requirements'

function KpiCard({ label, value, unit, icon, prevValue }) {
  const diff = prevValue != null ? value - prevValue : null;
  const pct = prevValue != null && prevValue !== 0
    ? ((value - prevValue) / prevValue * 100).toFixed(1)
    : null;
  const showDiff = diff != null && diff !== 0;

  return (
    <div className="kpi-card">
      <div className="kpi-icon">{icon}</div>
      <div className="kpi-content">
        <div className="kpi-label">{label}</div>
        <div className="kpi-value">
          {typeof value === 'number' ? value.toLocaleString('it-IT') : value}
          <span className="kpi-unit">{unit}</span>
        </div>
        <div
          className={`kpi-diff ${showDiff ? (diff < 0 ? 'positive' : 'negative') : 'placeholder'}`}
          aria-hidden={!showDiff}
        >
          {showDiff
            ? `${diff < 0 ? '' : '+'}${diff.toLocaleString('it-IT')} (${diff < 0 ? '' : '+'}${pct}%)`
            : '\u00A0'}
        </div>
      </div>
    </div>
  );
}

function RouteMap({ scenario, previousScenario }) {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setAnimating(true);
    const timer = setTimeout(() => setAnimating(false), 800);
    return () => clearTimeout(timer);
  }, [scenario.id]);

  const pointsToPath = (points) => {
    if (points.length < 2) return '';
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  };

  return (
    <div className="map-container">
      <svg viewBox="0 0 1000 850" className="route-map" preserveAspectRatio="xMidYMid meet">
        {/* Grid lines for visual depth */}
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"/>
          </pattern>
          {/* Glow filter for warehouses */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          {/* Route animation */}
          {scenario.routes.map((route, i) => (
            <linearGradient key={`grad-${i}`} id={`routeGrad-${i}`}>
              <stop offset="0%" stopColor={route.color} stopOpacity="0.9"/>
              <stop offset="100%" stopColor={route.color} stopOpacity="0.6"/>
            </linearGradient>
          ))}
        </defs>
        <rect width="1000" height="850" fill="url(#grid)"/>

        {/* Routes */}
        {scenario.routes.map((route, i) => {
          const pathD = pointsToPath(route.points);
          const pathLength = 3000;
          return (
            <g key={`route-${scenario.id}-${i}`}>
              {/* Route shadow */}
              <path
                d={pathD}
                fill="none"
                stroke={route.color}
                strokeWidth="4"
                strokeOpacity="0.15"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Main route line */}
              <path
                d={pathD}
                fill="none"
                stroke={route.color}
                strokeWidth="2.5"
                strokeOpacity="0.85"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={animating ? pathLength : 'none'}
                strokeDashoffset={animating ? pathLength : 0}
                className="route-path"
                style={{
                  transition: animating ? `stroke-dashoffset ${0.6 + i * 0.1}s ease-out` : 'none',
                  strokeDashoffset: 0,
                }}
              />
            </g>
          );
        })}

        {/* Delivery points */}
        {allPoints.map((point) => (
          <g key={`point-${point.id}`}>
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill="rgba(255,255,255,0.6)"
              className="delivery-point"
            />
            <circle
              cx={point.x}
              cy={point.y}
              r="2"
              fill="white"
            />
          </g>
        ))}

        {/* Warehouses */}
        {scenario.warehouses.map((wh) => (
          <g key={wh.id} className="warehouse">
            <rect
              x={wh.x - 18}
              y={wh.y - 18}
              width="36"
              height="36"
              rx="4"
              fill="#1a1a2e"
              stroke="#4ECDC4"
              strokeWidth="2.5"
              className="warehouse-rect"
            />
            {/* Warehouse icon */}
            <path
              d={`M ${wh.x - 8} ${wh.y + 8} L ${wh.x - 8} ${wh.y - 4} L ${wh.x} ${wh.y - 12} L ${wh.x + 8} ${wh.y - 4} L ${wh.x + 8} ${wh.y + 8} Z`}
              fill="none"
              stroke="#4ECDC4"
              strokeWidth="1.5"
            />
            <line x1={wh.x - 3} y1={wh.y + 8} x2={wh.x - 3} y2={wh.y} stroke="#4ECDC4" strokeWidth="1.5"/>
            <line x1={wh.x + 3} y1={wh.y + 8} x2={wh.x + 3} y2={wh.y} stroke="#4ECDC4" strokeWidth="1.5"/>
          </g>
        ))}

      </svg>
    </div>
  );
}

function ScenarioChange({ from, to }) {
  if (!from || !to) return null;
  const changes = [];
  const whDiff = to.warehouses.length - from.warehouses.length;
  const vDiff = to.kpis.vehicles - from.kpis.vehicles;
  if (whDiff > 0) changes.push(`+${whDiff} magazzino`);
  if (whDiff < 0) changes.push(`${whDiff} magazzino`);
  if (vDiff > 0) changes.push(`+${vDiff} veicolo`);
  if (vDiff < 0) changes.push(`${vDiff} veicolo`);
  if (changes.length === 0) changes.push('Rotte ottimizzate');
  return (
    <div className="scenario-changes">
      {changes.map((c, i) => (
        <span key={i} className="change-badge">{c}</span>
      ))}
    </div>
  );
}

function WhatIfPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scenario = scenarios[activeIndex];
  const prevScenario = activeIndex > 0 ? scenarios[activeIndex - 1] : null;

  const kpiItems = [
    { key: 'km', label: 'Distanza totale', unit: ' km', icon: '📍' },
    { key: 'hours', label: 'Ore di guida', unit: ' h', icon: '⏱' },
    { key: 'vehicles', label: 'Veicoli', unit: '', icon: '🚛' },
    { key: 'cost', label: 'Costo rotte', unit: ' EUR', icon: '💰' },
    { key: 'emissions', label: 'Emissioni CO2', unit: ' kg', icon: '🌿' },
  ];

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="logo">OPTIVO</div>
        <h1>Simulazione scenari what-if</h1>
        <p className="subtitle">
          Testare scenari complessi prima di prendere decisioni operative
        </p>
      </header>

      {/* KPI Bar */}
      <div className="kpi-bar">
        {kpiItems.map(({ key, label, unit, icon }) => (
          <KpiCard
            key={key}
            label={label}
            value={scenario.kpis[key]}
            unit={unit}
            icon={icon}
            prevValue={prevScenario ? prevScenario.kpis[key] : null}
          />
        ))}
      </div>

      {/* Map */}
      <RouteMap scenario={scenario} previousScenario={prevScenario} />

      {/* Scenario Selector */}
      <div className="scenario-selector">
        {scenarios.map((s, i) => (
          <button
            key={s.id}
            className={`scenario-btn ${i === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(i)}
          >
            <span className="scenario-btn-letter">{s.id}</span>
            <span className="scenario-btn-label">
              {s.id === 'A' && 'Attuale'}
              {s.id === 'B' && '+ Magazzino'}
              {s.id === 'C' && '- 1 Veicolo'}
              {s.id === 'D' && 'Ottimizzato'}
            </span>
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="legend">
        {scenario.routes.map((route, i) => (
          <div key={i} className="legend-item">
            <span className="legend-color" style={{ backgroundColor: route.color }}></span>
            <span className="legend-label">{route.vehicleId}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default function App() {
  const [page, setPage] = useState('about');
  const [phaseIndex, setPhaseIndex] = useState(0);

  return (
    <div className="app">
      {/* Page switcher */}
      <nav className="page-switcher">
        <button
          className={`page-tab ${page === 'about' ? 'active' : ''}`}
          onClick={() => setPage('about')}
        >
          Chi siamo
        </button>
        <button
          className={`page-tab ${page === 'whatif' ? 'active' : ''}`}
          onClick={() => setPage('whatif')}
        >
          Simulazione what-if
        </button>
        <button
          className={`page-tab ${page === 'addresses' ? 'active' : ''}`}
          onClick={() => setPage('addresses')}
        >
          Normalizzazione anagrafiche
        </button>
        <button
          className={`page-tab ${page === 'analytics' ? 'active' : ''}`}
          onClick={() => setPage('analytics')}
        >
          Analytics & Forecasting
        </button>
        <button
          className={`page-tab ${page === 'requirements' ? 'active' : ''}`}
          onClick={() => setPage('requirements')}
        >
          Requisiti
        </button>
        <button
          className={`page-tab ${page === 'complexity' ? 'active' : ''}`}
          onClick={() => setPage('complexity')}
        >
          Complessità routing
        </button>
        <button
          className={`page-tab ${page === 'pharma' ? 'active' : ''}`}
          onClick={() => setPage('pharma')}
        >
          Vincoli pharma
        </button>
      </nav>

      {page === 'about' && <AboutUs />}
      {page === 'whatif' && <WhatIfPage />}
      {page === 'addresses' && (
        <AddressNormalization phaseIndex={phaseIndex} setPhaseIndex={setPhaseIndex} />
      )}
      {page === 'analytics' && <AnalyticsForecast />}
      {page === 'requirements' && <Requirements />}
      {page === 'complexity' && <RoutingComplexity />}
      {page === 'pharma' && <PharmaVertical />}
    </div>
  );
}
