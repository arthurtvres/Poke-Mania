import { api, type ApiEnvelope } from './api'
import type { IGameScore, IGameScoreInput } from '../interfaces/IGameScore'

export async function fetchScoresByTrainer(trainerId: number): Promise<IGameScore[]> {
  const response = await api.get<ApiEnvelope<IGameScore[]>>(
    `/trainers/${trainerId}/scores`,
  )
  return response.data.data
}

export async function registerScore(
  trainerId: number,
  input: IGameScoreInput,
): Promise<IGameScore> {
  const response = await api.post<ApiEnvelope<IGameScore>>(
    `/trainers/${trainerId}/scores`,
    input,
  )
  return response.data.data
}

export async function fetchRanking(limit = 10): Promise<IGameScore[]> {
  const response = await api.get<ApiEnvelope<IGameScore[]>>('/scores/ranking', {
    params: { limit },
  })
  return response.data.data
}
