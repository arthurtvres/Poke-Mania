import { api, type ApiEnvelope } from './api'
import type { IPokemon } from '../interfaces/IPokemon'

interface BackendPokemon {
  number: number
  name: string
  image: string
  types: string[]
}

interface PageEnvelope<T> {
  content: T[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  first: boolean
  last: boolean
}

export interface PokemonSearchParams {
  name?: string
  type?: string
  page?: number
  size?: number
  sort?: string
}

/** Lista pokémons do back-end (com filtros opcionais e paginação). */
export async function fetchPokemons(params: PokemonSearchParams = {}): Promise<IPokemon[]> {
  const { name, type, page = 0, size = 1500, sort = 'id,asc' } = params
  const response = await api.get<ApiEnvelope<PageEnvelope<BackendPokemon>>>('/pokemons', {
    params: { name, type, page, size, sort },
  })
  return response.data.data.content
}

export async function fetchPokemonById(id: number): Promise<IPokemon> {
  const response = await api.get<ApiEnvelope<BackendPokemon>>(`/pokemons/${id}`)
  return response.data.data
}
