import { useEffect, useState } from 'react'
import Footer from '../footer/footer'
import Sidebar from '../sidebar/sidebar'
import type { IPokemon } from '../../interfaces/IPokemon'
import type { IWhoIsThatPokemonProps } from '../../interfaces/IWhoIsThatPokemonProps'

function WhoIsThatPokemonMain({ pokemon }: IWhoIsThatPokemonProps) {
  const [currentPokemon, setCurrentPokemon] = useState<IPokemon | null>(null)
  const [guess, setGuess] = useState('')
  const [revealed, setRevealed] = useState(false)
  const [message, setMessage] = useState('')
  const [score, setScore] = useState(0)

  function getRandomPokemon() {
    if (pokemon.length === 0) return

    const randomIndex = Math.floor(Math.random() * pokemon.length)
    const randomPokemon = pokemon[randomIndex]

    setCurrentPokemon(randomPokemon)
    setGuess('')
    setRevealed(false)
    setMessage('')
  }

  function handleCheckAnswer() {
    if (!currentPokemon) return

    const normalizedGuess = guess.trim().toLowerCase()
    const normalizedName = currentPokemon.name.trim().toLowerCase()

    if (normalizedGuess === normalizedName) {
      setMessage('Parabéns! Você acertou!')
      setScore((prev) => prev + 1)
    } else {
      setMessage(`Errado! O pokémon era ${currentPokemon.name}.`)
    }

    setRevealed(true)
  }

  useEffect(() => {
    getRandomPokemon()
  }, [pokemon])

  return (
    <section>
      <h1 className="mb-4">Quem é esse Pokémon?</h1>
      <p className="mb-3 fw-bold">Pontuação: {score}</p>

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
            />
          </div>

          <div className="d-flex justify-content-center gap-2">
            <button
              className="btn btn-primary"
              onClick={handleCheckAnswer}
              disabled={!guess.trim() || revealed}
            >
              Verificar
            </button>

            <button
              className="btn btn-danger btn-secondary"
              onClick={getRandomPokemon}
            >
              Próximo
            </button>
          </div>

          {message && (
            <p className="mt-3 mb-0 fw-bold">{message}</p>
          )}
        </div>
      )}
    </section>
  )
}

function WhoIsThatPokemonContent(props: IWhoIsThatPokemonProps) {
  return (
    <div className="d-flex flex-column flex-md-row">
      <aside className="bg-light p-3 border-end">
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