import { useState, useEffect } from 'react';

interface QuantityInputProps {
  quantity: number;
  onUpdate: (newQuantity: number) => void;
  max: number;
}

const QuantityInput = ({ quantity, onUpdate, max }: QuantityInputProps) => {
  const [localQuantity, setLocalQuantity] = useState(Math.min(quantity, max));

  useEffect(() => {
    setLocalQuantity(Math.min(quantity, max));
  }, [quantity, max]);

  useEffect(() => {
    if (localQuantity >= 0 && localQuantity <= max) {
      onUpdate(localQuantity);
    }
  }, [localQuantity, onUpdate, max]);

  const handleIncrease = () => {
    if (localQuantity < max) {
      setLocalQuantity((prev) => Math.min(prev + 1, max));
    }
  };
  const handleDecrease = () => {
    if (localQuantity > 1) {
      setLocalQuantity((prev) => prev - 1);
    } else {
      onUpdate(0);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 0 : Math.max(Math.min(Number(e.target.value), max), 0);
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
        max={max}
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
