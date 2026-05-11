import WhoIsThatPokemonContent from '../components/pageContent/whoIsThatPokemonContent'
import type { IPokemon } from '../interfaces/IPokemon'

interface WhoIsThatPokemonProps {
  pokemon: IPokemon[]
  onScoreFinished?: () => void
}

function WhoIsThatPokemon(props: WhoIsThatPokemonProps) {
  return <WhoIsThatPokemonContent {...props} />
}

export default WhoIsThatPokemon
