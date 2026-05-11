import { api, type ApiEnvelope } from './api'
import type { IPokemon } from '../interfaces/IPokemon'

interface FavoriteResponse {
  id: number
  trainerId: number
  pokemon: IPokemon
  createdAt: string
}

export async function fetchFavorites(trainerId: number): Promise<IPokemon[]> {
  const response = await api.get<ApiEnvelope<FavoriteResponse[]>>(
    `/trainers/${trainerId}/favorites`,
  )
  return response.data.data.map((f) => f.pokemon)
}

export async function addFavorite(trainerId: number, pokemonId: number): Promise<IPokemon> {
  const response = await api.post<ApiEnvelope<FavoriteResponse>>(
    `/trainers/${trainerId}/favorites`,
    { pokemonId },
  )
  return response.data.data.pokemon
}

export async function removeFavorite(trainerId: number, pokemonId: number): Promise<void> {
  await api.delete(`/trainers/${trainerId}/favorites/${pokemonId}`)
}
