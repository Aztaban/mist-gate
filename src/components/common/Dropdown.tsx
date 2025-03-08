import { useState, ReactElement, ReactNode } from 'react';

interface DropdownProps<T extends ReactNode> {
  title: string;
  options: T[];
  selectedOptions: T[];
  onOptionChange: (updatedSelected: T[]) => void;
}

const Dropdown = <T extends string | number>({
  title,
  options,
  selectedOptions,
  onOptionChange,
}: DropdownProps<T>): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    console.log('Dropdown toggled');
    setIsOpen((prev) => !prev);
    console.log('Dropdown toggled', isOpen);
  };

  const handleCheckboxChange = (option: T) => {
    const updatedSelected = selectedOptions.includes(option)
      ? selectedOptions.filter((selected) => selected !== option)
      : [...selectedOptions, option];
    onOptionChange(updatedSelected);
  };

  return (
    <div className="dropdown-container">
      <div onClick={toggleDropdown}>
        {title}{isOpen ? '▲' : '▼'}
      </div>
      {isOpen && (
        <div>
          {options.map((option) => (
            <label key={String(option)} style={{ display: 'block', margin: '5px 0' }}>
              <input
                type="checkbox"
                value={String(option)}
                checked={selectedOptions.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              {' '}
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
