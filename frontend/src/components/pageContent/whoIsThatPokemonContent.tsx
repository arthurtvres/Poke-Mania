import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Footer from '../footer/footer'
import Sidebar from '../sidebar/sidebar'
import type { IPokemon } from '../../interfaces/IPokemon'
import { useTrainer } from '../../contexts/TrainerContext'
import { registerScore } from '../../services/scoreService'
import { extractErrorMessage } from '../../services/api'

interface WhoIsThatPokemonContentProps {
  pokemon: IPokemon[]
  onScoreFinished?: () => void
}

const ROUNDS_PER_GAME = 10

function WhoIsThatPokemonMain({ pokemon, onScoreFinished }: WhoIsThatPokemonContentProps) {
  const { currentTrainer } = useTrainer()

  const [currentPokemon, setCurrentPokemon] = useState<IPokemon | null>(null)
  const [guess, setGuess] = useState('')
  const [revealed, setRevealed] = useState(false)
  const [message, setMessage] = useState('')
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(1)
  const [savedRound, setSavedRound] = useState(false)

  function pickRandom() {
    if (pokemon.length === 0) return
    const idx = Math.floor(Math.random() * pokemon.length)
    setCurrentPokemon(pokemon[idx])
    setGuess('')
    setRevealed(false)
    setMessage('')
  }

  function handleCheck() {
    if (!currentPokemon) return
    const ok = guess.trim().toLowerCase() === currentPokemon.name.trim().toLowerCase()
    if (ok) {
      setScore((p) => p + 1)
      setMessage('Parabéns! Você acertou!')
    } else {
      setMessage(`Errado! O pokémon era ${currentPokemon.name}.`)
    }
    setRevealed(true)
  }

  function handleNext() {
    if (round >= ROUNDS_PER_GAME) {
      finishGame()
      return
    }
    setRound((r) => r + 1)
    pickRandom()
  }

  async function finishGame() {
    if (!currentTrainer) {
      toast.warn('Selecione um treinador para salvar sua pontuação.')
      resetGame()
      return
    }
    if (savedRound) return
    try {
      await registerScore(currentTrainer.id, {
        score,
        totalQuestions: ROUNDS_PER_GAME,
      })
      setSavedRound(true)
      toast.success(`Pontuação salva: ${score}/${ROUNDS_PER_GAME}!`)
      onScoreFinished?.()
    } catch (error) {
      toast.error('Erro ao salvar pontuação: ' + extractErrorMessage(error))
    }
    resetGame()
  }

  function resetGame() {
    setScore(0)
    setRound(1)
    setSavedRound(false)
    pickRandom()
  }

  useEffect(() => {
    pickRandom()
  }, [pokemon])

  return (
    <section>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h1 className="mb-0">Quem é esse Pokémon?</h1>
        <span className="badge bg-secondary fs-6">
          Rodada {round}/{ROUNDS_PER_GAME} · Pontos: {score}
        </span>
      </div>

      {!currentPokemon ? (
        <p>Carregando pokémon...</p>
      ) : (
        <div className="card shadow-sm border-0 p-4 text-center">
          <img
            src={currentPokemon.image}
            alt={currentPokemon.name}
            style={{
              width: '200px',
              height: '200px',
              objectFit: 'contain',
              margin: '0 auto 20px',
              filter: revealed ? 'none' : 'brightness(0)',
              transition: 'filter 0.3s ease',
            }}
          />

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Digite o nome do pokémon"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              disabled={revealed}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !revealed && guess.trim()) handleCheck()
              }}
            />
          </div>

          <div className="d-flex justify-content-center gap-2">
            <button
              className="btn btn-primary"
              onClick={handleCheck}
              disabled={!guess.trim() || revealed}
            >
              Verificar
            </button>

            <button
              className="btn btn-danger btn-secondary"
              onClick={handleNext}
            >
              {round >= ROUNDS_PER_GAME ? 'Finalizar' : 'Próximo'}
            </button>
          </div>

          {message && <p className="mt-3 mb-0 fw-bold">{message}</p>}
        </div>
      )}
    </section>
  )
}

function WhoIsThatPokemonContent(props: WhoIsThatPokemonContentProps) {
  return (
    <div className="d-flex flex-column flex-md-row">
      <aside>
        <Sidebar />
      </aside>

      <div className="flex-grow-1 p-4">
        <WhoIsThatPokemonMain {...props} />
        <Footer />
      </div>
    </div>
  )
}

export default WhoIsThatPokemonContent
