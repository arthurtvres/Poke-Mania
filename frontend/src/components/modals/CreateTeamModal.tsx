import { useState } from 'react'
import BaseModal from './BaseModal'

interface CreateTeamModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (name: string) => Promise<void> | void
}

function CreateTeamModal({ isOpen, onClose, onConfirm }: CreateTeamModalProps) {
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setIsSubmitting(true)
    try {
      await onConfirm(name.trim())
      setName('')
      onClose()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <BaseModal
      isOpen={isOpen}
      title="Novo time"
      onClose={() => {
        setName('')
        onClose()
      }}
      footer={
        <>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button
            type="submit"
            form="create-team-form"
            className="btn btn-primary"
            disabled={!name.trim() || isSubmitting}
          >
            {isSubmitting ? 'Criando...' : 'Criar time'}
          </button>
        </>
      }
    >
      <form id="create-team-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome do time</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            placeholder="Ex.: Time Elétrico"
            autoFocus
          />
        </div>
      </form>
    </BaseModal>
  )
}

export default CreateTeamModal
