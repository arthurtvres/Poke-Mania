import type { ReactNode } from 'react'

interface BaseModalProps {
  isOpen: boolean
  title: string
  onClose: () => void
  children: ReactNode
  footer?: ReactNode
  size?: 'sm' | 'lg' | 'xl'
}

/**
 * Modal Bootstrap controlado por React (sem dependência do bundle JS do Bootstrap).
 * Substitui prompts/alerts nativos com aparência profissional.
 */
function BaseModal({ isOpen, title, onClose, children, footer, size }: BaseModalProps) {
  if (!isOpen) return null

  const sizeClass = size ? `modal-${size}` : ''

  return (
    <>
      <div
        className="modal fade show d-block"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose()
        }}
      >
        <div className={`modal-dialog modal-dialog-centered ${sizeClass}`}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Fechar"
                onClick={onClose}
              />
            </div>
            <div className="modal-body">{children}</div>
            {footer && <div className="modal-footer">{footer}</div>}
          </div>
        </div>
      </div>
      <div
        className="modal-backdrop fade show"
        style={{ zIndex: 1040 }}
        onClick={onClose}
      />
    </>
  )
}

export default BaseModal
