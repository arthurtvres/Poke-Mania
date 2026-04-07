import type { IDashBoardProps } from "../../interfaces/IDashBoardProps"

function DashboardCards({ total, favoritos, time, analisados }: IDashBoardProps) {
    return (
        <div className="row g-3 mb-4">
            <div className="col-12 col-sm-6 col-xl-3">
                <div className="card border-1 shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title">Total de Pokémons</h5>
                        <p className="card-text display-5">{total}</p>
                    </div>
                </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
                <div className="card border-1 shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title">Pokémons Favoritos</h5>
                        <p className="card-text display-5">{favoritos}</p>
                    </div>
                </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
                <div className="card border-1 shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title">Meus Times</h5>
                        <p className="card-text display-5">{time}</p>
                    </div>
                </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
                <div className="card border-1 shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title">Pokémons Analisados</h5>
                        <p className="card-text display-5">{analisados}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardCards