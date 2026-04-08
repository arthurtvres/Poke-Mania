import './App.css'
import { useEffect, useState } from 'react'

import Header from './components/header/header'
import Sidebar from './components/sidebar/sidebar'
import DashboardCards from './components/dashboardCards/dashboardCards'
import type { IPokemon } from './interfaces/IPokemon'
import type { ITeam } from './interfaces/ITeam'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Pokemons from './pages/Pokemons'
import MyTeam from './pages/MyTeam'
import { fetchPokemons } from './services/pokemonService'


// Componente raiz: centraliza estados globais e roteamento da aplicação.
function App() {

  const [total, setTotal] = useState(0)
  const [favoritos, setFavoritos] = useState(0)
  const [teams, setTeams] = useState<ITeam[]>([])
  const totalTeams = teams.length

  // Adiciona um pokémon ao time escolhido, respeitando a regra de até 6 por time.
  function handleAddToTeam(pokemon: IPokemon) {
    if (teams.length === 0) {
      alert('Crie um time antes de adicionar pokémons!')
      return
    }

    // Mostra os times disponíveis para o usuário selecionar onde adicionar o pokémon.
    const teamNames = teams.map((team, index) => {
      return `${index + 1} - ${team.name}`
    }).join('\n')

    const selected = prompt(
      `Escolha o time para adicionar o pokemon:\n${teamNames}`
    )

    const teamIndex = Number(selected) - 1

    if (isNaN(teamIndex) || !teams[teamIndex]) {
      alert('Time inválido.')
      return
    }
    const selectedTeam = teams[teamIndex]

    if (selectedTeam.pokemons.length >= 6) {
      alert('O time já tem 6 pokémons! Crie outro time para adicionar mais pokémons.')
      return
    }

    
    const updatedTeams = teams.map(team => {
      if (team.id !== selectedTeam.id) return team

      return {
        ...team,
        pokemons: [...team.pokemons, pokemon]
      }
    })
    setTeams(updatedTeams)
  }


  // Atualiza o contador global de favoritos ao favoritar ou desfavoritar um pokémon.
  function handleFavorite(isAdd: boolean) {
    if (isAdd) {
      setFavoritos((prev) => prev + 1)
    } else {
      setFavoritos((prev) => prev - 1)
    }
  }

  const [pokemons, setPokemons] = useState<IPokemon[]>([])

  // Carrega os pokémons da API ao iniciar o app e atualiza os indicadores do dashboard.
  useEffect(() => {
    async function loadPokemons() {
      try {
        const pokemonData = await fetchPokemons()
        setPokemons(pokemonData)
        setTotal(pokemonData.length)
      } catch (error) {
        console.error('Erro ao buscar pokémons:', error)
      }
    }

    loadPokemons()
  }, [])

  return (
    <BrowserRouter>
      <Header />

      <main className="container-fluid">
        <div className="row">

          <aside className="col-12 col-md-3 col-lg-2 bg-light p-3">
            <Sidebar />
          </aside>

          <section className="col-12 col-md-9 col-lg-10 p-4">
            <Routes>
              <Route path="/"
                element={
                  <DashboardCards
                    total={total}
                    favoritos={favoritos}
                    time={totalTeams}
                  />
                }
              />

              <Route
                path="/pokemons"
                element={
                  <Pokemons
                    pokemons={pokemons}
                    onFavorite={handleFavorite}
                    onAddToTeam={handleAddToTeam} />} />

              <Route
                path="/my-team"
                element={<MyTeam teams={teams} setTeams={setTeams} />} />
            </Routes>
          </section>

        </div>
      </main>
    </BrowserRouter>
  )
}

export default App
