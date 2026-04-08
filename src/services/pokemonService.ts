import type { IPokemon } from "../interfaces/IPokemon"

// Busca a lista de pokémons e normaliza os campos usados pela interface.
export async function fetchPokemons(): Promise<IPokemon[]> {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1028")
  const data = await response.json()

  const pokemonDetails = await Promise.all(
    // Para cada item da listagem, carrega os detalhes individuais necessários para renderização.
    data.results.map(async (pokemon: { name: string; url: string }) => {
      const detailResponse = await fetch(pokemon.url)
      const detailData = await detailResponse.json()

      return {
        name: detailData.name,
        image: detailData.sprites.front_default,
        number: detailData.id,
        types: detailData.types.map((type: any) => type.type.name),
      }
    })
  )

  return pokemonDetails
}