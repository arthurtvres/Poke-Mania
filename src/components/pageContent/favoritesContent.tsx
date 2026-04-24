import PokemonCard from '../pokemonCard/pokemonCard'
import Footer from '../footer/footer'
import Sidebar from '../sidebar/sidebar'
import type { IPokemon } from '../../interfaces/IPokemon'

interface FavoritesContentProps {
  favoritePokemons: IPokemon[]
  onFavorite: (pokemon: IPokemon) => void
  onAddToTeam: (pokemon: IPokemon) => void
}

function FavoritesMain({ favoritePokemons, onFavorite, onAddToTeam }: FavoritesContentProps) {
  return (
    <section>
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

function FavoritesContent(props: FavoritesContentProps) {
  return (
    <div className="d-flex flex-column flex-md-row">
      <aside>
        <Sidebar />
      </aside>

      <div className="flex-grow-1 p-4">
        <FavoritesMain {...props} />
        <Footer />
      </div>
    </div>
  )
}

export default FavoritesContent