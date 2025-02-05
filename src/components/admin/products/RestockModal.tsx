import { useState } from 'react';

interface RestockModalProps {
  currentStock: number;
  productId: string;
  onClose: () => void;
}
const RestockModal = ({
  currentStock,
  productId,
  onClose,
}: RestockModalProps) => {
  const [adjustment, setAdjustment] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^-?\d*$/.test(value)) {
      setAdjustment(value);
    }
  };

  const handleSubmit = () => {
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Restock Product</h2>
        <p>
          Current Stock: <strong>{currentStock}</strong>
        </p>

        <label>Stock Adjustment:</label>
        <input
          type="text"
          value={adjustment}
          onChange={handleChange}
          className="modal-input"
        />

        <div className="modal-actions">
          <button onClick={handleSubmit} className="modal-confirm">
            Confirm
          </button>
          <button onClick={onClose} className="modal-cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestockModal;
