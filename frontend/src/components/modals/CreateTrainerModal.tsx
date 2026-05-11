import { useState } from 'react'
import BaseModal from './BaseModal'
import { useTrainer } from '../../contexts/TrainerContext'

interface CreateTrainerModalProps {
  isOpen: boolean
  onClose: () => void
}

function CreateTrainerModal({ isOpen, onClose }: CreateTrainerModalProps) {
  const { addTrainer } = useTrainer()
  const [nickname, setNickname] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function reset() {
    setNickname('')
    setAvatarUrl('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!nickname.trim()) return
    setIsSubmitting(true)
    const created = await addTrainer({
      nickname: nickname.trim(),
      avatarUrl: avatarUrl.trim() || null,
    })
    setIsSubmitting(false)
    if (created) {
      reset()
      onClose()
    }
  }

  return (
    <BaseModal
      isOpen={isOpen}
      title="Novo treinador"
      onClose={() => {
        reset()
        onClose()
      }}
      footer={
        <>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button
            type="submit"
            form="create-trainer-form"
            className="btn btn-primary"
            disabled={!nickname.trim() || isSubmitting}
          >
            {isSubmitting ? 'Criando...' : 'Criar'}
          </button>
        </>
      }
    >
      <form id="create-trainer-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Apelido</label>
          <input
            type="text"
            className="form-control"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            maxLength={50}
            placeholder="Ex.: AshKetchum"
            autoFocus
          />
        </div>
        <div className="mb-3">
          <label className="form-label">URL do avatar (opcional)</label>
          <input
            type="url"
            className="form-control"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="https://i.pravatar.cc/150?u=ash"
          />
        </div>
      </form>
    </BaseModal>
  )
}

export default CreateTrainerModal
