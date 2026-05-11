import DashboardCards from '../dashboardCards/dashboardCards'
import Footer from '../footer/footer'
import Sidebar from '../sidebar/sidebar'

interface DashboardContentProps {
  total: number
  favoritos: number
  time: number
  bestScore: number | null
  gamesPlayed: number
}

function DashboardMain({ total, favoritos, time, bestScore, gamesPlayed }: DashboardContentProps) {
  return (
    <section>
      <h1 className="mb-4">Dashboard</h1>

      <DashboardCards total={total} favoritos={favoritos} time={time} />

      <div className="row g-3 mt-3">
        <div className="col-12 col-md-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h2 className="h6 text-muted text-uppercase mb-2">Melhor pontuação</h2>
              <p className="display-6 mb-0">
                {bestScore !== null ? bestScore : <span className="text-muted">—</span>}
              </p>
              <small className="text-muted">Quem é esse Pokémon?</small>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h2 className="h6 text-muted text-uppercase mb-2">Partidas jogadas</h2>
              <p className="display-6 mb-0">{gamesPlayed}</p>
              <small className="text-muted">Histórico do minigame</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DashboardContent(props: DashboardContentProps) {
  return (
    <div className="d-flex flex-column flex-md-row">
      <aside>
        <Sidebar />
      </aside>

      <div className="flex-grow-1 p-4">
        <DashboardMain {...props} />
        <Footer />
      </div>
    </div>
  )
}

export default DashboardContent
