import { FormEvent, useState } from 'react';
import { eurFormat } from '@utils/currency';
import { useUpdateProductMutation } from '@features/apiSlices/productApiSlice';
import PriceInput from '@components/common/inputs/PriceInput';
import ModalButtons from '@components/features/auth/modals/ModalButtons';

interface PriceChangeModalProps {
  currentPrice: number;
  productId: string;
  onClose: () => void;
}

const PriceChangeModal = ({ currentPrice, productId, onClose }: PriceChangeModalProps) => {
  const [price, setPrice] = useState<number>(currentPrice);
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

        <form onSubmit={handleSubmit}>
          <p>
            Current price: <strong>{eurFormat(currentPrice)}</strong>
          </p>

          <label htmlFor="new-price">New price</label>
          <PriceInput value={price} onChange={setPrice} className="modal-input" />

          <ModalButtons onClose={onClose} isSubmitting={isLoading} />
        </form>
      </div>
    </div>
  );
};

export default PriceChangeModal;
