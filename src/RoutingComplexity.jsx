const rows = [
  {
    points: '5',
    combinations: '60',
    note: null,
  },
  {
    points: '10',
    combinations: '1.814.400',
    note: null,
  },
  {
    points: '13',
    combinations: '3.113.510.400',
    note: {
      main: '5x meno probabile',
      sub: 'di un 6 al Superenalotto',
    },
  },
  {
    points: '100',
    combinations: (
      <>
        4,7 x 10<sup>157</sup>
      </>
    ),
    highlight: true,
    note: {
      main: (
        <>
          10<sup>80</sup> atomi
        </>
      ),
      sub: "nell'universo osservabile",
    },
  },
]

export default function RoutingComplexity() {
  return (
    <div className="complexity-page">
      {/* Header */}
      <header className="header">
        <div className="logo logo-planning">PLANNING &amp; ROUTING</div>
        <h1>La complessità è matematica</h1>
        <p className="subtitle">
          Quante combinazioni di routing esistono per un dato numero di punti di consegna?
        </p>
      </header>

      {/* Table */}
      <div className="complexity-card">
        <table className="complexity-table">
          <thead>
            <tr>
              <th>Punti da visitare</th>
              <th>Possibili combinazioni</th>
              <th className="th-note"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className={r.highlight ? 'row-highlight' : ''}>
                <td className="cell-points">{r.points}</td>
                <td className={`cell-combinations ${r.highlight ? 'highlight' : ''}`}>
                  {r.combinations}
                </td>
                <td className="cell-note">
                  {r.note && (
                    <div className="complexity-note">
                      <div className="note-main">{r.note.main}</div>
                      <div className="note-sub">{r.note.sub}</div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer message */}
      <div className="complexity-footer">
        <p>
          Con centinaia di consegne, trovare la soluzione ottimale è{' '}
          <span className="highlight-text">matematicamente impossibile</span> per la mente umana.
        </p>
        <p className="footer-sub">
          Con migliaia, diventa esponenzialmente più complesso con vincoli e più veicoli.
        </p>
      </div>
    </div>
  )
}
