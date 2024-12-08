import { useState, useEffect } from 'react';

interface QuantityInputProps {
  quantity: number;
  onUpdate: (newQuantity: number) => void;
}

const QuantityInput = ({ quantity, onUpdate }: QuantityInputProps) => {
  const [localQuantity, setLocalQuantity] = useState(quantity);

  useEffect(() => {
    setLocalQuantity(quantity);
  }, [quantity]);

  useEffect(() => {
    if (localQuantity >= 0) {
      onUpdate(localQuantity)
    }
  },[localQuantity, onUpdate])

  const handleIncrease = () => setLocalQuantity((prev) => prev + 1);
  const handleDecrease = () => {
    if (localQuantity > 1) {
      setLocalQuantity((prev) => prev - 1);
    } else {
      onUpdate(0);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 0 : Math.max(Number(e.target.value), 0);
    setLocalQuantity(value);
  };

  return (
    <div className="quantity-container">
      <button
        type="button"
        className="quantity-button"
        onClick={handleDecrease}
      >
        -
      </button>
      <input
        type="number"
        className="quantity-input"
        value={localQuantity}
        onChange={handleInputChange}
        aria-label="Item Quantity"
        min="1"
      />
      <button
        type="button"
        className="quantity-button"
        onClick={handleIncrease}
      >
        +
      </button>
    </div>
  );
};

export default QuantityInput;
