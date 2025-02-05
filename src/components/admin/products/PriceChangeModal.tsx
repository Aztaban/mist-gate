import { useState } from "react";
import { eurFormat } from "../../../utils/utils";

interface PriceChangeModalProps {
  currentPrice: number;
  productId: string;
  onClose: () => void;
}

const PriceChangeModal = ({ currentPrice, productId, onClose }: PriceChangeModalProps) => {
  const [price, setPrice] = useState(currentPrice);

  const handleSubmit = () => {
    console.log(price);
    onClose();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, ''); // Remove non-numeric characters
    const formattedPrice = Number(value);
    setPrice(formattedPrice);
  }
  
  const displayPrice = (price / 100).toFixed(2).replace('.', ',');

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Change Price</h2>
        <p>Current Price: <strong>{eurFormat(currentPrice)}</strong></p>

        <label>New Price:</label>
        <input
          type="text"
          value={displayPrice}
          onChange={handleChange}
          className="modal-input"
        />

        <div className="modal-actions">
          <button onClick={handleSubmit} className="modal-confirm">Confirm</button>
          <button onClick={onClose} className="modal-cancel">Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default PriceChangeModal
