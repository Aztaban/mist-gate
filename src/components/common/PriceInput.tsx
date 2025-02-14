import { useState } from 'react';

interface PriceInputProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

const PriceInput = ({ value, onChange, className }: PriceInputProps) => {
  const [inputValue, setInputValue] = useState(String(value));

  const formatDisplayValue = (cents: number) => {
    const euros = (cents / 100).toFixed(2).replace('.', ',');
    return euros;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value.replace(/\D/g, ''); // Remove non-digit characters

    // Prevent leading zeroes unless "0" is the only digit
    if (rawValue.length > 1 && rawValue.startsWith('0')) {
      rawValue = rawValue.slice(1);
    }

    const numericValue = parseInt(rawValue || '0', 10);
    setInputValue(rawValue); // Store raw digits
    onChange(numericValue);
  };

  return (
    <input
      type="text"
      value={formatDisplayValue(parseInt(inputValue || '0', 10))}
      onChange={handleChange}
      className={className}
    />
  );
};

export default PriceInput;
