import { useState } from 'react';
import { useUpdateProductMutation } from '@features/apiSlices/productApiSlice';
import ModalButtons from '../../../auth/modals/ModalButtons';

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
  const [updateProduct] = useUpdateProductMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^-?\d*$/.test(value)) {
      setAdjustment(value);
    }
  };

  const handleSubmit = () => {
    const adjustmentValue = Number(adjustment);
    if (isNaN(adjustmentValue)) {
      alert('Invalid stock adjustment value.');
      return;
    }

    if (currentStock + adjustmentValue < 0) {
      alert('Stock cannot be negative.');
      return;
    }

    try {
      updateProduct({
        id: productId,
        updates: { countInStock: adjustmentValue },
      }).unwrap();
    } catch (err) {
      console.error('Failed to update product:', err);
      alert('An error occurred while updating the product.');
    }
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
        <ModalButtons handleSubmit={handleSubmit} onClose={onClose} />
      </div>
    </div>
  );
};

export default RestockModal;
