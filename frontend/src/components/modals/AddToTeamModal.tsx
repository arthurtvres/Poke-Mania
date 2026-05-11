import { useEffect, useState } from 'react'
import BaseModal from './BaseModal'
import type { IPokemon } from '../../interfaces/IPokemon'
import type { ITeam } from '../../interfaces/ITeam'

interface AddToTeamModalProps {
  isOpen: boolean
  pokemon: IPokemon | null
  teams: ITeam[]
  onClose: () => void
  onConfirm: (teamId: number) => Promise<void> | void
}

function AddToTeamModal({ isOpen, pokemon, teams, onClose, onConfirm }: AddToTeamModalProps) {
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isOpen && teams.length > 0) {
      setSelectedTeamId(teams[0].id)
    }
  }, [isOpen, teams])

  async function handleConfirm() {
    if (!selectedTeamId) return
    setIsSubmitting(true)
    try {
      await onConfirm(selectedTeamId)
      onClose()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <BaseModal
      isOpen={isOpen}
      title={`Adicionar ${pokemon?.name ?? 'pokémon'} a um time`}
      onClose={onClose}
      footer={
        <>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleConfirm}
            disabled={!selectedTeamId || isSubmitting}
          >
            {isSubmitting ? 'Adicionando...' : 'Adicionar'}
          </button>
        </>
      }
    >
      {teams.length === 0 ? (
        <p className="text-muted mb-0">
          Você ainda não tem times. Crie um time primeiro na página "Meus Times".
        </p>
      ) : (
        <>
          <p className="mb-2">Escolha o time de destino:</p>
          <div className="list-group">
            {teams.map((team) => (
              <label
                key={team.id}
                className="list-group-item d-flex align-items-center gap-2"
              >
                <input
                  type="radio"
                  name="team"
                  value={team.id}
                  checked={selectedTeamId === team.id}
                  onChange={() => setSelectedTeamId(team.id)}
                  className="form-check-input me-2 mt-0"
                />
                <span className="flex-grow-1">{team.name}</span>
                <small className="text-muted">{team.pokemons.length}/6</small>
              </label>
            ))}
          </div>
        </>
      )}
    </BaseModal>
  )
}

export default AddToTeamModal
