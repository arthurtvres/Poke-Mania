import './style/App.css'
import { useEffect, useState } from 'react'

import Header from './components/header/header'
import type { IPokemon } from './interfaces/IPokemon'
import type { ITeam } from './interfaces/ITeam'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Pokemons from './pages/Pokemons'
import MyTeam from './pages/MyTeam'
import { fetchPokemons } from './services/pokemonService'
import Favorites from './pages/Favorites'
import WhoIsThatPokemon from './pages/WhoIsThatPokemon'

function App() {
  const [total, setTotal] = useState(0)
  const [teams, setTeams] = useState<ITeam[]>([])
  const totalTeams = teams.length
  const [favoritePokemons, setFavoritePokemons] = useState<IPokemon[]>([])
  const [pokemons, setPokemons] = useState<IPokemon[]>([])

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

  //Função para favoritar ou desfavoritar um pokémon.
  function handleFavoritePokemon(pokemon: IPokemon) {
    setFavoritePokemons((prev) => {
      const isAlreadyFavorite = prev.some((fav) => fav.number === pokemon.number)

      if (isAlreadyFavorite) {
        return prev.filter((fav) => fav.number !== pokemon.number)
      }

      return [...prev, pokemon]
    })
  }

  useEffect(() => {
    console.log('FAVORITOS ATUALIZADOS:', favoritePokemons)
  }, [favoritePokemons])

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

      <main className="container-fluid p-0">
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                total={total}
                favoritos={favoritePokemons.length}
                time={totalTeams}
              />
            }
          />

          <Route
            path="/pokemons"
            element={
              <Pokemons
                pokemons={pokemons}
                onFavorite={handleFavoritePokemon}
                onAddToTeam={handleAddToTeam}
                favoritePokemons={favoritePokemons}
              />
            }
          />

          <Route
            path="/my-team"
            element={
              <MyTeam
                teams={teams}
                setTeams={setTeams}
              />
            }
          />

          <Route
            path="/favorites"
            element={
              <Favorites
                favoritePokemons={favoritePokemons}
                onFavorite={handleFavoritePokemon}
                onAddToTeam={handleAddToTeam}
              />
            }
          />

          <Route
            path="/who-is-that-pokemon"
            element={
              <WhoIsThatPokemon
                pokemon={pokemons}
              />
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
