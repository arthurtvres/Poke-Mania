import { Link } from 'react-router-dom'
import '../../style/dashboardCards.css'
import type { IDashBoardProps } from "../../interfaces/IDashBoardProps"

// Mostra os principais indicadores resumidos no dashboard.
function DashboardCards({ total, favoritos, time }: IDashBoardProps) {
    return (
        <div className="row g-3 mb-4">
            <div className="col-12 col-sm-6 col-xl-4">
                <Link to="/pokemons" className="text-decoration-none>">
                    <div className="card border-1 shadow-sm h-100 dashboard-card-link">
                        <div className="card-body">
                            <h5 className="card-title">Total de Pokémons</h5>
                            <p className="card-text display-5">{total}</p>
                        </div>
                    </div>
                </Link>
            </div>

            <div className="col-12 col-sm-6 col-xl-4">
                <Link to="/favorites" className="text-decoration-none">
                    <div className="card border-1 shadow-sm h-100 dashboard-card-link">
                        <div className="card-body">
                            <h5 className="card-title text-dark">Pokémons Favoritos</h5>
                            <p className="card-text display-5 text-dark">{favoritos}</p>
                        </div>
                    </div>
                </Link>
            </div>

            <div className="col-12 col-sm-6 col-xl-4">
                <Link to="/my-team" className="text-decoration-none">
                    <div className="card border-1 shadow-sm h-100 dashboard-card-link">
                        <div className="card-body">
                            <h5 className="card-title text-dark">Times Criados</h5>
                            <p className="card-text display-5 text-dark">{time}</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default DashboardCards