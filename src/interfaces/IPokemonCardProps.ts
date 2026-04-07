export interface IPokemonCardProps {
    name: string
    image: string
    types: string
    number: number
    onAddToTeam: (isAdd: boolean) => void
    onFavorite: (isAdd: boolean) => void
}