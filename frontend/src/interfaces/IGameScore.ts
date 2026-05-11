export interface IGameScore {
  id: number
  trainerId: number
  trainerNickname: string
  score: number
  totalQuestions: number
  accuracy: number
  playedAt: string
}

export interface IGameScoreInput {
  score: number
  totalQuestions: number
}
