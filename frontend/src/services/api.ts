import axios, { type AxiosError } from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api/v1'

export const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

export interface ApiEnvelope<T> {
  data: T
  message?: string
  timestamp: string
}

export interface ApiErrorPayload {
  status: number
  error: string
  message: string
  path?: string
  timestamp: string
  fieldErrors?: Array<{ field: string; message: string; rejectedValue?: unknown }>
}

export function extractErrorMessage(error: unknown): string {
  const axiosError = error as AxiosError<ApiErrorPayload>
  const payload = axiosError?.response?.data
  if (payload?.fieldErrors?.length) {
    return payload.fieldErrors.map((f) => `${f.field}: ${f.message}`).join('; ')
  }
  return payload?.message ?? axiosError?.message ?? 'Erro inesperado.'
}
