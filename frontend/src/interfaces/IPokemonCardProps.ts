import type { IPokemon } from "./IPokemon";

export interface IPokemonCardProps {
    name: string
    image: string
    types: string[]
    number: number
    onAddToTeam: (pokemon: IPokemon) => void
    onFavorite: (pokemon: IPokemon) => void
    isFavorite: boolean
}