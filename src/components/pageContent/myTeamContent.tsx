import { type Dispatch, type SetStateAction } from 'react'
import Footer from '../footer/footer'
import Sidebar from '../sidebar/sidebar'
import type { ITeam } from '../../interfaces/ITeam'
import { typeIcons } from '../../utils/typeIcons'

interface MyTeamContentProps {
  teams: ITeam[]
  setTeams: Dispatch<SetStateAction<ITeam[]>>
}

function MyTeamMain({ teams, setTeams }: MyTeamContentProps) {
  function handleCreateTeam() {
    const newTeamName = 'Time ' + (teams.length + 1)
    setTeams([...teams, { id: teams.length + 1, name: newTeamName, pokemons: [] }])
  }

  function handleDeleteTeam(teamId: number) {
    const updatedTeams = teams.filter((team) => team.id !== teamId)
    setTeams(updatedTeams)
  }

  function handleRemovePokemon(teamId: number, pokemonNumber: number) {
    const updatedTeams = teams.map((team) => {
      if (team.id !== teamId) return team

      return {
        ...team,
        pokemons: team.pokemons.filter(
          (pokemon) => pokemon.number !== pokemonNumber,
        ),
      }
    })
    setTeams(updatedTeams)
  }

  return (
    <section>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h1 className="mb-0">Meus Times</h1>

        <button className="btn btn-primary" onClick={handleCreateTeam}>
          <i className="bi bi-plus"></i> Criar Time
        </button>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h2 className="h5 mb-3">Seus Times</h2>

          {teams.length === 0 ? (
            <p className="text-muted mb-0">Nenhum time criado ainda.</p>
          ) : (
            <div className="row g-3">
              {teams.map((team) => (
                <div key={team.id} className="col-12 col-md-6">
                  <div className="border rounded p-3 bg-light">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h3 className="h6 mb-0">{team.name}</h3>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteTeam(team.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                    <p className="text-muted mb-3">{team.pokemons.length}/6 Pokémons</p>

                    <div className="d-flex flex-wrap gap-2">
                      {team.pokemons.length === 0 ? (
                        <p className="text-muted mb-0">Nenhum pokémon no time.</p>
                      ) : (
                        team.pokemons.map((pokemon) => (
                          <div
                            key={pokemon.number}
                            className="border rounded p-2 bg-white text-center"
                          >
                            <img
                              src={pokemon.image}
                              alt={pokemon.name}
                              className="img-fluid"
                              style={{ maxWidth: '80px', height: '80px', objectFit: 'contain' }}
                            />

                            <h4 className="h6 mb-2 text-capitalize">{pokemon.name}</h4>

                            <div className="d-flex justify-content-center gap-2 flex-wrap mb-2">
                              {pokemon.types.map((type) => (
                                <img
                                  key={type}
                                  src={typeIcons[type]}
                                  alt={type}
                                  title={type}
                                  style={{ width: '20px', height: '20px' }}
                                />
                              ))}
                            </div>

                            <button
                              className="btn btn-outline-danger btn-sm mt-2"
                              onClick={() => handleRemovePokemon(team.id, pokemon.number)}
                            >
                              Remover
                            </button>
                          </div>
                        ))
                      )}
                    </div>
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

function MyTeamContent(props: MyTeamContentProps) {
  return (
    <div className="d-flex flex-column flex-md-row">
      <aside>
        <Sidebar />
      </aside>

      <div className="flex-grow-1 p-4">
        <MyTeamMain {...props} />
        <Footer />
      </div>
    </div>
  )
}

export default MyTeamContent