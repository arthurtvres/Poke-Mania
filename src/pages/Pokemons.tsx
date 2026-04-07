import PokemonCard from '../components/pokemonCard/pokemonCard'
import type { IPokemon } from '../interfaces/IPokemon'

interface PokemonsProps {
  pokemons: IPokemon[]
  onFavorite: (isAdd: boolean) => void
  onAddToTeam: (isAdd: boolean) => void
}

function Pokemons({ pokemons, onFavorite, onAddToTeam }: PokemonsProps) {
  return (
    <section className="p-4">
      <h1 className="mb-4">Pokémons</h1>

      <div className="row g-3">
        {pokemons.map((pokemon) => (
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