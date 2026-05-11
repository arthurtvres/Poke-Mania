import { api, type ApiEnvelope } from './api'
import type { ITeam } from '../interfaces/ITeam'

export async function fetchTeamsByTrainer(trainerId: number): Promise<ITeam[]> {
  const response = await api.get<ApiEnvelope<ITeam[]>>(`/trainers/${trainerId}/teams`)
  return response.data.data
}

export async function createTeam(trainerId: number, name: string): Promise<ITeam> {
  const response = await api.post<ApiEnvelope<ITeam>>(`/trainers/${trainerId}/teams`, { name })
  return response.data.data
}

export async function renameTeam(teamId: number, name: string): Promise<ITeam> {
  const response = await api.put<ApiEnvelope<ITeam>>(`/teams/${teamId}`, { name })
  return response.data.data
}

export async function deleteTeam(teamId: number): Promise<void> {
  await api.delete(`/teams/${teamId}`)
}

export async function addPokemonToTeam(teamId: number, pokemonId: number): Promise<ITeam> {
  const response = await api.post<ApiEnvelope<ITeam>>(`/teams/${teamId}/pokemons`, { pokemonId })
  return response.data.data
}

export async function removePokemonFromTeam(teamId: number, pokemonId: number): Promise<ITeam> {
  const response = await api.delete<ApiEnvelope<ITeam>>(
    `/teams/${teamId}/pokemons/${pokemonId}`,
  )
  return response.data.data
}
