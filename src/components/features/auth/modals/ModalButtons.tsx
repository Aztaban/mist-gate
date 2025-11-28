// ModalButtons.tsx

interface ModalButtonsProps {
  onClose: () => void;
  isSubmitting?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
}

const ModalButtons = ({
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

      {/* This submits the nearest <form> */}
      <button type="submit" className="btn btn--brand" disabled={isSubmitting}>
        {isSubmitting ? 'Working…' : confirmLabel}
      </button>
    </div>
  );
};

export default ModalButtons;
