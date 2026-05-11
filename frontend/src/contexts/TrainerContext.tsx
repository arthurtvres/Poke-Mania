import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { toast } from 'react-toastify'
import type { ITrainer, ITrainerInput } from '../interfaces/ITrainer'
import {
  createTrainer,
  deleteTrainer,
  fetchTrainers,
} from '../services/trainerService'
import { extractErrorMessage } from '../services/api'

const STORAGE_KEY = 'poke-mania-current-trainer-id'

interface TrainerContextValue {
  trainers: ITrainer[]
  currentTrainer: ITrainer | null
  isLoading: boolean
  selectTrainer: (id: number) => void
  refreshTrainers: () => Promise<ITrainer[]>
  addTrainer: (input: ITrainerInput) => Promise<ITrainer | null>
  removeTrainer: (id: number) => Promise<void>
}

const TrainerContext = createContext<TrainerContextValue | undefined>(undefined)

export function TrainerProvider({ children }: { children: ReactNode }) {
  const [trainers, setTrainers] = useState<ITrainer[]>([])
  const [currentTrainerId, setCurrentTrainerId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshTrainers = useCallback(async () => {
    const list = await fetchTrainers()
    setTrainers(list)
    return list
  }, [])

  useEffect(() => {
    let cancelled = false
    async function init() {
      setIsLoading(true)
      try {
        const list = await refreshTrainers()
        if (cancelled) return
        const savedId = Number(window.localStorage.getItem(STORAGE_KEY))
        const exists = list.find((t) => t.id === savedId)
        if (exists) {
          setCurrentTrainerId(exists.id)
        } else if (list.length > 0) {
          setCurrentTrainerId(list[0].id)
          window.localStorage.setItem(STORAGE_KEY, String(list[0].id))
        }
      } catch (error) {
        toast.error('Erro ao carregar treinadores: ' + extractErrorMessage(error))
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }
    init()
    return () => {
      cancelled = true
    }
  }, [refreshTrainers])

  const selectTrainer = useCallback((id: number) => {
    setCurrentTrainerId(id)
    window.localStorage.setItem(STORAGE_KEY, String(id))
  }, [])

  const addTrainer = useCallback(
    async (input: ITrainerInput): Promise<ITrainer | null> => {
      try {
        const created = await createTrainer(input)
        const list = await refreshTrainers()
        const stillExists = list.find((t) => t.id === currentTrainerId)
        if (!stillExists) {
          selectTrainer(created.id)
        }
        toast.success(`Treinador "${created.nickname}" criado!`)
        return created
      } catch (error) {
        toast.error('Erro ao criar treinador: ' + extractErrorMessage(error))
        return null
      }
    },
    [currentTrainerId, refreshTrainers, selectTrainer],
  )

  const removeTrainer = useCallback(
    async (id: number) => {
      try {
        await deleteTrainer(id)
        const list = await refreshTrainers()
        if (currentTrainerId === id) {
          const next = list[0]?.id ?? null
          setCurrentTrainerId(next)
          if (next) window.localStorage.setItem(STORAGE_KEY, String(next))
          else window.localStorage.removeItem(STORAGE_KEY)
        }
        toast.info('Treinador removido.')
      } catch (error) {
        toast.error('Erro ao remover treinador: ' + extractErrorMessage(error))
      }
    },
    [currentTrainerId, refreshTrainers],
  )

  const value = useMemo<TrainerContextValue>(
    () => ({
      trainers,
      currentTrainer: trainers.find((t) => t.id === currentTrainerId) ?? null,
      isLoading,
      selectTrainer,
      refreshTrainers,
      addTrainer,
      removeTrainer,
    }),
    [trainers, currentTrainerId, isLoading, selectTrainer, refreshTrainers, addTrainer, removeTrainer],
  )

  return <TrainerContext.Provider value={value}>{children}</TrainerContext.Provider>
}

export function useTrainer(): TrainerContextValue {
  const ctx = useContext(TrainerContext)
  if (!ctx) {
    throw new Error('useTrainer deve ser usado dentro de TrainerProvider')
  }
  return ctx
}
