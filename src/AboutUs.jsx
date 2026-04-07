const products = [
  {
    letter: 'R',
    color: '#4D96FF',
    name: 'OptivoRoute',
    description: 'Ottimizzazione percorsi con AI multi-vincolo',
  },
  {
    letter: 'T',
    color: '#2BD4A4',
    name: 'OptivoTrack',
    description: 'Monitoraggio flotta in tempo reale',
  },
  {
    letter: 'A',
    color: '#F59E0B',
    name: 'App Autista',
    description: 'Navigazione, POD e comunicazione',
  },
  {
    letter: 'C',
    color: '#4D96FF',
    name: 'Control Tower',
    description: "Vista d'insieme e alert automatici",
  },
]

export default function AboutUs() {
  return (
    <div className="about-page">
      <header className="header">
        <div className="logo logo-about">CHI SIAMO</div>
        <h1>
          La gestione della flotta,
          <br />
          semplice e intelligente
        </h1>
        <p className="subtitle subtitle-large">
          Piattaforma AI per l'ottimizzazione last-mile: pianificazione percorsi,
          monitoraggio flotta e gestione consegne in un'unica soluzione.
          <br />
          Operativi in 15+ settori merceologici.
        </p>
      </header>

      <div className="products-grid">
        {products.map((p) => (
          <div key={p.letter} className="product-card">
            <div
              className="product-icon"
              style={{
                backgroundColor: p.color,
                boxShadow: `0 0 0 6px ${p.color}1f`,
              }}
            >
              {p.letter}
            </div>
            <h3 className="product-name">{p.name}</h3>
            <p className="product-desc">{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
