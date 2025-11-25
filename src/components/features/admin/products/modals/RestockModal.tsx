import { ChangeEvent, useState } from 'react';
import { useUpdateProductMutation } from '@features/apiSlices/productApiSlice';
import ModalButtons from '../../../auth/modals/ModalButtons';

interface RestockModalProps {
  currentStock: number;
  productId: string;
  onClose: () => void;
}

const RestockModal = ({ currentStock, productId, onClose }: RestockModalProps) => {
  const [adjustment, setAdjustment] = useState<string>('');
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAdjustment(e.target.value);
  };

  const handleSubmit = async () => {
    const diff = parseInt(adjustment, 10);

    if (isNaN(diff) || diff === 0) {
      alert('Please enter a non-zero number (positive or negative).');
      return;
    }

    const newStock = currentStock + diff;
    if (newStock < 0) {
      alert('Resulting stock cannot be negative.');
      return;
    }

    try {
      await updateProduct({
        id: productId,
        updates: { countInStock: newStock },
      }).unwrap();
      onClose();
    } catch (err) {
      console.error('Failed to restock product:', err);
      alert('Failed to restock product.');
    }
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content">
        <h2>Restock Product</h2>
        <p>
          Current stock: <strong>{currentStock}</strong>
        </p>

        <label htmlFor="stock-adjustment">Stock adjustment</label>
        <input
          id="stock-adjustment"
          type="text"
          value={adjustment}
          onChange={handleChange}
          className="modal-input"
          placeholder="+10 or -3"
        />
        <p className="field-helper">Positive numbers add stock, negative numbers reduce it.</p>

        <ModalButtons handleSubmit={handleSubmit} onClose={onClose} isSubmitting={isLoading} />
      </div>
    </div>
  );
};

export default RestockModal;
