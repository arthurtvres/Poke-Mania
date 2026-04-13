import PokemonCard from '../components/pokemonCard/pokemonCard'
import type { IPokemon } from '../interfaces/IPokemon'

interface FavoritesProps {
  favoritePokemons: IPokemon[]
  onFavorite: (pokemon: IPokemon) => void
  onAddToTeam: (pokemon: IPokemon) => void
}

function Favorites({ favoritePokemons, onFavorite, onAddToTeam }: FavoritesProps) {
  return (
    <section className="p-4">
      <h1 className="mb-4">Pokémons Favoritos</h1>

      {favoritePokemons.length === 0 ? (
        <p className="text-muted">Nenhum pokémon favoritado ainda.</p>
      ) : (
        <div className="row g-3">
          {favoritePokemons.map((pokemon) => (
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
                isFavorite={true}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Favorites