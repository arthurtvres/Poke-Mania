import './style/App.css'
import { useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

import type { IPokemon } from './interfaces/IPokemon'
import type { ITeam } from './interfaces/ITeam'
import type { IDashboard } from './interfaces/IDashboard'

import Dashboard from './pages/Dashboard'
import Pokemons from './pages/Pokemons'
import MyTeam from './pages/MyTeam'
import Favorites from './pages/Favorites'
import WhoIsThatPokemon from './pages/WhoIsThatPokemon'

import { TrainerProvider, useTrainer } from './contexts/TrainerContext'
import { fetchPokemons } from './services/pokemonService'
import { fetchFavorites, addFavorite, removeFavorite } from './services/favoriteService'
import {
  fetchTeamsByTrainer,
  createTeam as apiCreateTeam,
  deleteTeam as apiDeleteTeam,
  addPokemonToTeam as apiAddPokemonToTeam,
  removePokemonFromTeam as apiRemovePokemonFromTeam,
} from './services/teamService'
import { fetchDashboard } from './services/dashboardService'
import { extractErrorMessage } from './services/api'
import AddToTeamModal from './components/modals/AddToTeamModal'

interface AppShellState {
  pokemons: IPokemon[]
  teams: ITeam[]
  favoritePokemons: IPokemon[]
  dashboard: IDashboard | null
  isLoadingPokemons: boolean
}

function AppRoutes() {
  const { currentTrainer, isLoading: isLoadingTrainer } = useTrainer()
  const trainerId = currentTrainer?.id ?? null

  const [state, setState] = useState<AppShellState>({
    pokemons: [],
    teams: [],
    favoritePokemons: [],
    dashboard: null,
    isLoadingPokemons: true,
  })

  const [pokemonToAdd, setPokemonToAdd] = useState<IPokemon | null>(null)

  useEffect(() => {
    let cancelled = false
    async function loadCatalog() {
      try {
        const list = await fetchPokemons()
        if (!cancelled) {
          setState((prev) => ({ ...prev, pokemons: list, isLoadingPokemons: false }))
        }
      } catch (error) {
        if (!cancelled) {
          setState((prev) => ({ ...prev, isLoadingPokemons: false }))
          toast.error('Erro ao carregar pokémons: ' + extractErrorMessage(error))
        }
      }
    }
    loadCatalog()
    return () => {
      cancelled = true
    }
  }, [])

  const refreshTrainerData = useCallback(async () => {
    if (!trainerId) {
      setState((prev) => ({ ...prev, teams: [], favoritePokemons: [], dashboard: null }))
      return
    }
    try {
      const [teams, favoritePokemons, dashboard] = await Promise.all([
        fetchTeamsByTrainer(trainerId),
        fetchFavorites(trainerId),
        fetchDashboard(trainerId),
      ])
      setState((prev) => ({ ...prev, teams, favoritePokemons, dashboard }))
    } catch (error) {
      toast.error('Erro ao carregar dados do treinador: ' + extractErrorMessage(error))
    }
  }, [trainerId])

  useEffect(() => {
    refreshTrainerData()
  }, [refreshTrainerData])

  function requireTrainer(): number | null {
    if (!trainerId) {
      toast.warn('Selecione ou crie um treinador antes de continuar.')
      return null
    }
    return trainerId
  }

  async function handleFavoritePokemon(pokemon: IPokemon) {
    const tid = requireTrainer()
    if (!tid) return
    const isAlready = state.favoritePokemons.some((p) => p.number === pokemon.number)
    try {
      if (isAlready) {
        await removeFavorite(tid, pokemon.number)
        toast.info(`${pokemon.name} removido dos favoritos.`)
      } else {
        await addFavorite(tid, pokemon.number)
        toast.success(`${pokemon.name} adicionado aos favoritos!`)
      }
      refreshTrainerData()
    } catch (error) {
      toast.error('Erro: ' + extractErrorMessage(error))
    }
  }

  function handleStartAddToTeam(pokemon: IPokemon) {
    const tid = requireTrainer()
    if (!tid) return
    if (state.teams.length === 0) {
      toast.warn('Crie um time antes de adicionar pokémons!')
      return
    }
    setPokemonToAdd(pokemon)
  }

  async function handleConfirmAddToTeam(teamId: number) {
    if (!pokemonToAdd) return
    try {
      await apiAddPokemonToTeam(teamId, pokemonToAdd.number)
      toast.success(`${pokemonToAdd.name} adicionado ao time!`)
      setPokemonToAdd(null)
      refreshTrainerData()
    } catch (error) {
      toast.error('Erro ao adicionar pokémon: ' + extractErrorMessage(error))
    }
  }

  async function handleCreateTeam(name: string) {
    const tid = requireTrainer()
    if (!tid) return
    try {
      await apiCreateTeam(tid, name)
      toast.success(`Time "${name}" criado!`)
      refreshTrainerData()
    } catch (error) {
      toast.error('Erro ao criar time: ' + extractErrorMessage(error))
    }
  }

  async function handleDeleteTeam(teamId: number) {
    try {
      await apiDeleteTeam(teamId)
      toast.info('Time removido.')
      refreshTrainerData()
    } catch (error) {
      toast.error('Erro ao remover time: ' + extractErrorMessage(error))
    }
  }

  async function handleRemovePokemonFromTeam(teamId: number, pokemonNumber: number) {
    try {
      await apiRemovePokemonFromTeam(teamId, pokemonNumber)
      toast.info('Pokémon removido do time.')
      refreshTrainerData()
    } catch (error) {
      toast.error('Erro: ' + extractErrorMessage(error))
    }
  }

  const totalPokemons = state.dashboard?.totalPokemons ?? state.pokemons.length

  return (
    <BrowserRouter>
      <main className="container-fluid p-0">
        {isLoadingTrainer && (
          <div className="position-fixed top-0 end-0 m-3 alert alert-info py-2">
            Carregando...
          </div>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                total={totalPokemons}
                favoritos={state.favoritePokemons.length}
                time={state.teams.length}
                bestScore={state.dashboard?.bestScore ?? null}
                gamesPlayed={state.dashboard?.gamesPlayed ?? 0}
              />
            }
          />

          <Route
            path="/pokemons"
            element={
              <Pokemons
                pokemons={state.pokemons}
                onFavorite={handleFavoritePokemon}
                onAddToTeam={handleStartAddToTeam}
                favoritePokemons={state.favoritePokemons}
                isLoading={state.isLoadingPokemons}
              />
            }
          />

          <Route
            path="/my-team"
            element={
              <MyTeam
                teams={state.teams}
                onCreateTeam={handleCreateTeam}
                onDeleteTeam={handleDeleteTeam}
                onRemovePokemon={handleRemovePokemonFromTeam}
              />
            }
          />

          <Route
            path="/favorites"
            element={
              <Favorites
                favoritePokemons={state.favoritePokemons}
                onFavorite={handleFavoritePokemon}
                onAddToTeam={handleStartAddToTeam}
              />
            }
          />

          <Route
            path="/who-is-that-pokemon"
            element={
              <WhoIsThatPokemon
                pokemon={state.pokemons}
                onScoreFinished={() => refreshTrainerData()}
              />
            }
          />
        </Routes>

        <AddToTeamModal
          isOpen={pokemonToAdd !== null}
          pokemon={pokemonToAdd}
          teams={state.teams}
          onClose={() => setPokemonToAdd(null)}
          onConfirm={handleConfirmAddToTeam}
        />
      </main>
    </BrowserRouter>
  )
}

function App() {
  return (
    <TrainerProvider>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        pauseOnHover
        theme="colored"
      />
    </TrainerProvider>
  )
}

export default App
