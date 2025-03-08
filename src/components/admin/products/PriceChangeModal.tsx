import { useState } from "react";
import { eurFormat } from "../../../utils/utils";
import { useUpdateProductMutation } from "../../../features/apiSlices/productApiSlice";
import PriceInput from "../../common/PriceInput";

interface PriceChangeModalProps {
  currentPrice: number;
  productId: string;
  onClose: () => void;
}

const PriceChangeModal = ({ currentPrice, productId, onClose }: PriceChangeModalProps) => {
  const [updateProduct] = useUpdateProductMutation();
  const [price, setPrice] = useState(currentPrice);

  const handleSubmit = () => {
    try {
      updateProduct({ id: productId, updates: { price } }).unwrap();
    } catch (err) {
      console.error('Failed to update product:', err);
    }
    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Change Price</h2>
        <p>Current Price: <strong>{eurFormat(currentPrice)}</strong></p>

        <label>New Price:</label>
        <PriceInput value={price} onChange={setPrice} className="modal-input" />

        <div className="modal-actions">
          <button onClick={handleSubmit} className="modal-confirm">Confirm</button>
          <button onClick={onClose} className="modal-cancel">Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default PriceChangeModal
