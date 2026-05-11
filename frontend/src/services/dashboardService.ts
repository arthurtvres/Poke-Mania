import { api, type ApiEnvelope } from './api'
import type { IDashboard } from '../interfaces/IDashboard'

export async function fetchDashboard(trainerId: number): Promise<IDashboard> {
  const response = await api.get<ApiEnvelope<IDashboard>>(
    `/trainers/${trainerId}/dashboard`,
  )
  return response.data.data
}
