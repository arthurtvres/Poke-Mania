import { useState } from 'react'
import PokemonCard from '../components/pokemonCard/pokemonCard'
import type { IPokemon } from '../interfaces/IPokemon'

interface PokemonsProps {
  pokemons: IPokemon[]
  onFavorite: (isAdd: boolean) => void
  onAddToTeam: (pokemon: IPokemon) => void
}

// Renderiza catálogo de pokémons com filtros por nome e tipo.
function Pokemons({ pokemons, onFavorite, onAddToTeam }: PokemonsProps) {
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('')

  // Aplica os filtros de busca digitada e tipo selecionado na lista recebida.
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
          <option value="grass">Grass</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="electric">Electric</option>
          <option value="psychic">Psychic</option>
          <option value="ice">Ice</option>
          <option value="dragon">Dragon</option>
          <option value="dark">Dark</option>
          <option value="fairy">Fairy</option>
          <option value="normal">Normal</option>
          <option value="fighting">Fighting</option>
          <option value="flying">Flying</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="rock">Rock</option>
          <option value="bug">Bug</option>
          <option value="ghost">Ghost</option>
          <option value="steel">Steel</option>

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