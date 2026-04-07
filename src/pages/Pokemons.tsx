import { useState } from 'react'
import PokemonCard from '../components/pokemonCard/pokemonCard'
import type { IPokemon } from '../interfaces/IPokemon'

interface PokemonsProps {
  pokemons: IPokemon[]
  onFavorite: (isAdd: boolean) => void
  onAddToTeam: (isAdd: boolean) => void
}

function Pokemons({ pokemons, onFavorite, onAddToTeam }: PokemonsProps) {
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('')

  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesType = selectedType ? pokemon.types.includes(selectedType) : true

    return matchesSearch && matchesType
  })

  return (
    <section className="p-4">
      <h1 className="mb-4">Pokémons</h1>

      <div className="row mb-3">
        <div className="col-12 col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar Pokémon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="col-12 col-md-6 mb-2">
        <select
          className="form-select"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">Todos os tipos</option>
          <option value="Grass">Grass</option>
          <option value="Fire">Fire</option>
          <option value="Water">Water</option>
          <option value="Electric">Electric</option>
          <option value="Psychic">Psychic</option>
          <option value="Ice">Ice</option>
          <option value="Dragon">Dragon</option>
          <option value="Dark">Dark</option>
          <option value="Fairy">Fairy</option>
          <option value="Normal">Normal</option>
          <option value="Fighting">Fighting</option>
          <option value="Flying">Flying</option>
          <option value="Poison">Poison</option>
          <option value="Ground">Ground</option>
          <option value="Rock">Rock</option>
          <option value="Bug">Bug</option>
          <option value="Ghost">Ghost</option>
          <option value="Steel">Steel</option>

        </select>
      </div>


      <div className="row g-3">
        {filteredPokemons.map((pokemon) => (
          <div
            key={pokemon.number}
            className="col-6 col-md-4 col-lg-3 col-xl-2"
          >
            <PokemonCard
              name={pokemon.name}
              image={pokemon.image}
              number={pokemon.number}
              types={pokemon.types}
              onFavorite={onFavorite}
              onAddToTeam={onAddToTeam}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Pokemons