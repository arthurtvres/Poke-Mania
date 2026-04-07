import './App.css'
import { useEffect, useState } from 'react'

import Header from './components/header/header'
import Sidebar from './components/sidebar/sidebar'
import DashboardCards from './components/dashboardCards/dashboardCards'
import type { IPokemon } from './interfaces/IPokemon'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Pokemons from './pages/Pokemons'
import MyTeam from './pages/MyTeam'

function App() {

  const [total, setTotal] = useState(0)
  const [favoritos, setFavoritos] = useState(0)
  const [time, setTime] = useState(0)
  const [analisados, setAnalisados] = useState(0)

  function handleAddToTeam(isAdd: boolean) {
    if (isAdd) {
      if (time >= 6) {
        alert('Time completo! Remova um Pokémon para adicionar outro.')
        return
      }
      setTime((prev) => prev + 1)
    } else {
      setTime((prev) => prev - 1)
    }
  }

  function handleFavorite(isAdd: boolean) {
    if (isAdd) {
      setFavoritos((prev) => prev + 1)
    } else {
      setFavoritos((prev) => prev - 1)
    }
  }

  const [pokemons, setPokemons] = useState<IPokemon[]>([])

  async function fetchPokemons() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=900')

      const data = await response.json()

      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon: { name: string; url: string }) => {
          const detailResponse = await fetch(pokemon.url)
          const detailData = await detailResponse.json()

          return {
            name: detailData.name,
            image: detailData.sprites.front_default,
            number: detailData.id,
            types: detailData.types.map((type: any) => type.type.name),
          }
        })
      )

      setPokemons(pokemonDetails)
      setTotal(pokemonDetails.length)
      setAnalisados(pokemonDetails.length)
    } catch (error) {
      console.error('Erro ao buscar pokémons:', error)
    }
  }

  useEffect(() => {
    fetchPokemons()
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
                    time={time}
                    analisados={analisados}
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

                    <Route path="/my-team" element={<MyTeam />} />
            </Routes>
          </section>

        </div>
      </main>
    </BrowserRouter>
  )
}

export default App
