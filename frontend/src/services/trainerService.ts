import { api, type ApiEnvelope } from './api'
import type { ITrainer, ITrainerInput } from '../interfaces/ITrainer'

interface PageEnvelope<T> {
  content: T[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  first: boolean
  last: boolean
}

export async function fetchTrainers(): Promise<ITrainer[]> {
  const response = await api.get<ApiEnvelope<PageEnvelope<ITrainer>>>('/trainers', {
    params: { size: 100, sort: 'createdAt,asc' },
  })
  return response.data.data.content
}

export async function fetchTrainerById(id: number): Promise<ITrainer> {
  const response = await api.get<ApiEnvelope<ITrainer>>(`/trainers/${id}`)
  return response.data.data
}

export async function createTrainer(input: ITrainerInput): Promise<ITrainer> {
  const response = await api.post<ApiEnvelope<ITrainer>>('/trainers', input)
  return response.data.data
}

export async function updateTrainer(id: number, input: ITrainerInput): Promise<ITrainer> {
  const response = await api.put<ApiEnvelope<ITrainer>>(`/trainers/${id}`, input)
  return response.data.data
}

export async function deleteTrainer(id: number): Promise<void> {
  await api.delete(`/trainers/${id}`)
}
