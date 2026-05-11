import { useState } from 'react'
import { useTrainer } from '../../contexts/TrainerContext'
import CreateTrainerModal from '../modals/CreateTrainerModal'

function TrainerSelector() {
  const { trainers, currentTrainer, selectTrainer, removeTrainer } = useTrainer()
  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <div className="trainer-selector">
      <label htmlFor="trainer-select" className="trainer-selector-label">
        Treinador
      </label>

      {trainers.length === 0 ? (
        <button
          type="button"
          className="btn btn-light btn-sm w-100"
          onClick={() => setModalOpen(true)}
        >
          <i className="bi bi-plus-circle"></i> Criar primeiro treinador
        </button>
      ) : (
        <>
          <select
            id="trainer-select"
            className="form-select form-select-sm"
            value={currentTrainer?.id ?? ''}
            onChange={(e) => selectTrainer(Number(e.target.value))}
          >
            {trainers.map((trainer) => (
              <option key={trainer.id} value={trainer.id}>
                {trainer.nickname}
              </option>
            ))}
          </select>

          <div className="d-flex gap-1 mt-2">
            <button
              type="button"
              className="btn btn-light btn-sm flex-grow-1"
              onClick={() => setModalOpen(true)}
              title="Novo treinador"
            >
              <i className="bi bi-person-plus"></i>
            </button>
            {currentTrainer && (
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => {
                  if (window.confirm(`Remover treinador "${currentTrainer.nickname}"? Isso apagará seus times e favoritos.`)) {
                    removeTrainer(currentTrainer.id)
                  }
                }}
                title="Remover treinador atual"
              >
                <i className="bi bi-person-x"></i>
              </button>
            )}
          </div>
        </>
      )}

      <CreateTrainerModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}

export default TrainerSelector
