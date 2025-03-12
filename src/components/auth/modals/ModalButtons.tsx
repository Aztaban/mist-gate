interface ModalButtonsProps {
  handleSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

const ModalButtons = ({ handleSubmit, onClose }: ModalButtonsProps) => {
  return (
    <div className="modal-actions">
      <button onClick={handleSubmit} className="btn modal-confirm">
        Confirm
      </button>
      <button onClick={onClose} className="btn modal-cancel">
        Cancel
      </button>
    </div>
  );
};

export default ModalButtons;
