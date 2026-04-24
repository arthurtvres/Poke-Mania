import FavoritesContent from '../components/pageContent/favoritesContent'
import type { IPokemon } from '../interfaces/IPokemon'

interface FavoritesProps {
  favoritePokemons: IPokemon[]
  onFavorite: (pokemon: IPokemon) => void
  onAddToTeam: (pokemon: IPokemon) => void
}

function Favorites(props: FavoritesProps) {
  return <FavoritesContent {...props} />
}

export default Favorites