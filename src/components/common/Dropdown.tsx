import { useState, useMemo, ReactElement } from 'react';

export type DropdownOption = { label: string; value: string };

interface DropdownProps {
  title: string;
  options: DropdownOption[]; // [{ label, value }]
  selectedOptions: string[]; // array of values (ids)
  onOptionChange: (updated: string[]) => void;
  disabled?: boolean;
}

const Dropdown = ({
  title,
  options,
  selectedOptions,
  onOptionChange,
  disabled = false,
}: DropdownProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedSet = useMemo(() => new Set(selectedOptions), [selectedOptions]);

  const toggleDropdown = () => {
    if (!disabled) setIsOpen((prev) => !prev);
  };

  const handleCheckboxChange = (value: string) => {
    const updated = selectedSet.has(value) ? selectedOptions.filter((v) => v !== value) : [...selectedOptions, value];
    onOptionChange(updated);
  };

  const summary = selectedOptions.length > 0 ? `${title} (${selectedOptions.length})` : title;

  return (
    <div className="dropdown-container" style={{ minWidth: 180, opacity: disabled ? 0.6 : 1 }}>
      <button type="button" onClick={toggleDropdown} disabled={disabled} aria-expanded={isOpen}>
        {summary} {isOpen ? '▲' : '▼'}
      </button>

      {isOpen && (
        <div className="dropdown-menu" role="listbox" style={{ marginTop: 8 }}>
          {options.map((opt) => (
            <label key={opt.value} style={{ display: 'block', margin: '5px 0' }}>
              <input
                type="checkbox"
                value={opt.value}
                checked={selectedSet.has(opt.value)}
                onChange={() => handleCheckboxChange(opt.value)}
              />{' '}
              {opt.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
