import PokemonsContent from '../components/pageContent/pokemonsContent'
import type { IPokemon } from '../interfaces/IPokemon'

interface PokemonsProps {
  pokemons: IPokemon[]
  favoritePokemons: IPokemon[]
  onFavorite: (pokemon: IPokemon) => void
  onAddToTeam: (pokemon: IPokemon) => void
}

function Pokemons(props: PokemonsProps) {
  return <PokemonsContent {...props} />
}

export default Pokemons