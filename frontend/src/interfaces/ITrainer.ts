export interface ITrainer {
  id: number
  nickname: string
  avatarUrl?: string | null
  createdAt: string
  teamsCount: number
  favoritesCount: number
}

export interface ITrainerInput {
  nickname: string
  avatarUrl?: string | null
}
