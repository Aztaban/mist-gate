import { useState } from 'react';
import { eurFormat } from '@utils/currency';
import { useUpdateProductMutation } from '@features/apiSlices/productApiSlice';
import PriceInput from '@components/common/inputs/PriceInput';
import ModalButtons from '../../../auth/modals/ModalButtons';

interface PriceChangeModalProps {
  currentPrice: number;
  productId: string;
  onClose: () => void;
}

const PriceChangeModal = ({ currentPrice, productId, onClose }: PriceChangeModalProps) => {
  const [price, setPrice] = useState<number>(currentPrice);
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const handleSubmit = async () => {
    if (price < 0) {
      alert('Price cannot be negative.');
      return;
    }
    if (price === currentPrice) {
      onClose();
      return;
    }

    try {
      await updateProduct({
        id: productId,
        updates: { price },
      }).unwrap();
      onClose();
    } catch (err) {
      console.error('Failed to update price:', err);
      alert('Failed to update price.');
    }
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content">
        <h2>Change Price</h2>
        <p>
          Current price: <strong>{eurFormat(currentPrice)}</strong>
        </p>

        <label htmlFor="new-price">New price</label>
        <PriceInput value={price} onChange={setPrice} className="modal-input" />

        <ModalButtons handleSubmit={handleSubmit} onClose={onClose} isSubmitting={isLoading} />
      </div>
    </div>
  );
};

export default PriceChangeModal;
