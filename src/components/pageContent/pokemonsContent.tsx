import { useState } from 'react'
import PokemonCard from '../pokemonCard/pokemonCard'
import Footer from '../footer/footer'
import Sidebar from '../sidebar/sidebar'
import type { IPokemon } from '../../interfaces/IPokemon'
import { typeIcons } from '../../utils/typeIcons'

interface PokemonsContentProps {
  pokemons: IPokemon[]
  favoritePokemons: IPokemon[]
  onFavorite: (pokemon: IPokemon) => void
  onAddToTeam: (pokemon: IPokemon) => void
}

function PokemonsMain({ pokemons, onFavorite, onAddToTeam, favoritePokemons }: PokemonsContentProps) {
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
    <section>
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
        <div className="dropdown">
          <button
            className="form-select d-flex align-items-center justify-content-between"
            type="button"
            data-bs-toggle="dropdown"
          >
            <div className="d-flex align-items-center gap-2">
              {selectedType && (
                <img
                  src={typeIcons[selectedType]}
                  alt={selectedType}
                  title={selectedType}
                  style={{ width: '24px', height: '24px' }}
                />
              )}
              <span>
                {selectedType
                  ? selectedType.charAt(0).toUpperCase() + selectedType.slice(1)
                  : 'Todos os tipos'}
              </span>
            </div>
          </button>

          <ul className="dropdown-menu w-100">
            <li>
              <button
                type="button"
                className="dropdown-item"
                onClick={() => setSelectedType('')}
              >
                Todos os tipos
              </button>
            </li>

            {Object.keys(typeIcons).map((type) => (
              <li key={type}>
                <button
                  type="button"
                  className="dropdown-item d-flex align-items-center gap-2"
                  onClick={() => setSelectedType(type)}
                >
                  <img
                    src={typeIcons[type]}
                    alt={type}
                    title={type}
                    style={{ width: '24px', height: '24px' }}
                  />
                  <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
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
              isFavorite={favoritePokemons.some((fav) => fav.number === pokemon.number)}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

function PokemonsContent(props: PokemonsContentProps) {
  return (
    <div className="d-flex flex-column flex-md-row">
      <aside>
  <Sidebar />
</aside>

      <div className="flex-grow-1 p-4">
        <PokemonsMain {...props} />
        <Footer />
      </div>
    </div>
  )
}

export default PokemonsContent