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

const PriceChangeModal = ({
  currentPrice,
  productId,
  onClose,
}: PriceChangeModalProps) => {
  const [updateProduct] = useUpdateProductMutation();
  const [price, setPrice] = useState(currentPrice);

  const handleSubmit = () => {
    try {
      updateProduct({ id: productId, updates: { price } }).unwrap();
    } catch (err) {
      console.error('Failed to update product:', err);
    }
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Change Price</h2>
        <p>
          Current Price: <strong>{eurFormat(currentPrice)}</strong>
        </p>

        <label>New Price:</label>
        <PriceInput value={price} onChange={setPrice} className="modal-input" />
        <ModalButtons handleSubmit={handleSubmit} onClose={onClose} />
      </div>
    </div>
  );
};

export default PriceChangeModal;
