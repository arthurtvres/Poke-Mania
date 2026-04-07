import { useState } from "react"

function MyTeam() {
    const [teams, setTeams] = useState([])

    function handleCreateTeam() {
        const newTeamName = 'Time ' + (teams.length + 1)
        setTeams([...teams, { id: teams.length + 1, name: newTeamName, pokemons: [] }])
    }

    return (
        <section className="p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h1 className="mb-0">Meus Times</h1>
                <button className="btn btn-primary" onClick={handleCreateTeam}>
                    Criar Time</button>
            </div>

            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <h2 className="h5 mb-3">Seus Times</h2>

                    {teams.length === 0 ? (
                        <p className="text-muted mb-0">Nenhum time criado ainda.</p>
                    ) : (
                        <div className="row g-3">
                            {teams.map((team, index) => (
                                <div key={index} className="col-12 col-md-6">
                                    <div className="border rounded p-3 bg-light">
                                        <h3 className="h6 mb-2">{team.name}</h3>
                                        <p className="text-muted mb-0">0/6 Pokémons</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>

    )
}

export default MyTeam