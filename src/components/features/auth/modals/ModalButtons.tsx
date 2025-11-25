import React from 'react';

interface ModalButtonsProps {
  handleSubmit: () => void;
  onClose: () => void;
  isSubmitting?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
}

const ModalButtons = ({
  handleSubmit,
  onClose,
  isSubmitting = false,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
}: ModalButtonsProps) => {
  return (
    <div className="modal-actions form__actions">
      <button type="button" onClick={onClose} className="btn btn--ghost" disabled={isSubmitting}>
        {cancelLabel}
      </button>

      <button type="button" onClick={handleSubmit} className="btn btn--brand" disabled={isSubmitting}>
        {isSubmitting ? 'Working…' : confirmLabel}
      </button>
    </div>
  );
};

export default ModalButtons;
