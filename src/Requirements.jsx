// Icone SVG custom — disegnate a mano per essere molto piu' eleganti delle emoji

function EfficiencyIcon() {
  return (
    <svg viewBox="0 0 120 120" className="req-icon" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="effBg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#5B9DFF" />
          <stop offset="100%" stopColor="#1E5FD8" />
        </linearGradient>
        <linearGradient id="effArrow" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#FFE066" />
          <stop offset="100%" stopColor="#FFA94D" />
        </linearGradient>
      </defs>
      {/* Background circle */}
      <circle cx="60" cy="60" r="58" fill="url(#effBg)" />
      <circle cx="60" cy="60" r="58" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />

      {/* Target rings */}
      <circle cx="62" cy="62" r="40" fill="none" stroke="rgba(255,255,255,0.95)" strokeWidth="3.5" />
      <circle cx="62" cy="62" r="27" fill="none" stroke="rgba(255,255,255,0.95)" strokeWidth="3.5" />
      <circle cx="62" cy="62" r="13" fill="rgba(255,255,255,0.95)" />
      <circle cx="62" cy="62" r="6" fill="#1E5FD8" />

      {/* Arrow shaft */}
      <line
        x1="14"
        y1="14"
        x2="58"
        y2="58"
        stroke="url(#effArrow)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Arrow head (riempito) */}
      <path d="M 53 52 L 67 60 L 60 67 Z" fill="url(#effArrow)" />
      {/* Arrow fletching */}
      <path
        d="M 10 10 L 22 12 L 12 22 Z"
        fill="url(#effArrow)"
      />
    </svg>
  )
}

function FlexibilityIcon() {
  return (
    <svg viewBox="0 0 120 120" className="req-icon" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="flexBg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#3FE0B0" />
          <stop offset="100%" stopColor="#0E9D74" />
        </linearGradient>
      </defs>
      {/* Background circle */}
      <circle cx="60" cy="60" r="58" fill="url(#flexBg)" />
      <circle cx="60" cy="60" r="58" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />

      {/* 4 sliders simulano "tutti i parametri configurabili" */}
      {[
        { y: 32, fillTo: 78, dotX: 78 },
        { y: 50, fillTo: 50, dotX: 50 },
        { y: 68, fillTo: 88, dotX: 88 },
        { y: 86, fillTo: 38, dotX: 38 },
      ].map((s, i) => (
        <g key={i}>
          {/* Track */}
          <line
            x1="22"
            y1={s.y}
            x2="98"
            y2={s.y}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Filled portion */}
          <line
            x1="22"
            y1={s.y}
            x2={s.fillTo}
            y2={s.y}
            stroke="rgba(255,255,255,0.95)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Knob */}
          <circle
            cx={s.dotX}
            cy={s.y}
            r="7.5"
            fill="#ffffff"
            stroke="#0E9D74"
            strokeWidth="2"
          />
        </g>
      ))}
    </svg>
  )
}

const requirements = [
  {
    id: 'efficiency',
    icon: EfficiencyIcon,
    color: '#4D96FF',
    title: 'Efficienza computazionale',
    paragraphs: [
      'Il motore di calcolo deve avvicinarsi quanto più possibile alla soluzione ottimale.',
      'Altrimenti si perdono soldi.',
    ],
  },
  {
    id: 'flexibility',
    icon: FlexibilityIcon,
    color: '#2BD4A4',
    title: 'Flessibilità',
    paragraphs: [
      'Il sistema deve modellare TUTTI i vincoli reali, nessuno escluso.',
      'Se anche uno solo non è modellato, il piano non sarà applicabile.',
    ],
  },
]

export default function Requirements() {
  return (
    <div className="requirements-page">
      <header className="header">
        <div className="logo logo-planning">PLANNING &amp; ROUTING</div>
        <h1>Due requisiti non negoziabili</h1>
      </header>

      <div className="requirements-grid">
        {requirements.map((r) => {
          const Icon = r.icon
          return (
            <div key={r.id} className="requirement-card">
              <div className="req-icon-wrap">
                <Icon />
              </div>
              <h3 className="req-title" style={{ color: r.color }}>
                {r.title}
              </h3>
              <div className="req-paragraphs">
                {r.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <div className="complexity-footer">
        <p>
          Una soluzione teoricamente perfetta ma non applicabile vale meno di una{' '}
          <span className="highlight-text">leggermente meno efficiente ma eseguibile al 100%</span>.
        </p>
      </div>
    </div>
  )
}
