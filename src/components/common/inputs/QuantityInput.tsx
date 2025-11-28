import { useEffect, useState, KeyboardEvent, ChangeEvent } from 'react';

interface QuantityInputProps {
  quantity: number;
  onUpdate: (newQuantity: number) => void;
  max: number;
}

/**
 * Clean, accessible quantity control.
 * - Default: horizontal ( –  [input]  + )
 * - In cart rows it becomes vertical automatically via CSS under `.cart-item__qty .qty`.
 */
const QuantityInput = ({ quantity, onUpdate, max }: QuantityInputProps) => {
  const [local, setLocal] = useState(Math.min(quantity, max));

  // Keep in sync with props
  useEffect(() => {
    setLocal(Math.min(quantity, max));
  }, [quantity, max]);

  // Propagate changes (clamped)
  useEffect(() => {
    const clamped = Math.max(0, Math.min(local, max));
    if (clamped !== local) setLocal(clamped);
    else onUpdate(clamped);
  }, [local, max]); // eslint-disable-line react-hooks/exhaustive-deps

  const inc = () => setLocal((v) => Math.min(v + 1, max));
  const dec = () => {
    if (local > 1) setLocal((v) => v - 1);
    else onUpdate(0); // trigger “remove?” flow in parent
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      inc();
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      dec();
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.trim();
    const next = raw === '' ? 0 : Number(raw);
    if (!Number.isNaN(next)) setLocal(Math.max(0, Math.min(next, max)));
  };

  const disabled = max <= 0;

  return (
    <div className="qty" data-disabled={disabled || undefined}>
      <button type="button" className="qty__btn" aria-label="Decrease quantity" onClick={dec} disabled={disabled}>
        –
      </button>

      <input
        type="number"
        inputMode="numeric"
        className="qty__input"
        aria-label="Item Quantity"
        value={local}
        onChange={onChange}
        onKeyDown={onKey}
        min={0}
        max={max}
      />

      <button
        type="button"
        className="qty__btn"
        aria-label="Increase quantity"
        onClick={inc}
        disabled={disabled || local >= max}>
        +
      </button>
    </div>
  );
};

export default QuantityInput;
