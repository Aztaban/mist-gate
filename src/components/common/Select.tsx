interface SelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  optionLabel: (option: string) => string;
}

const Select = ({ id, label, value, onChange, options, optionLabel }: SelectProps) => {
  return (
    <>
      <label htmlFor={id}>{label}:</label>
      <select id={id} value={value} onChange={onChange}>
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {optionLabel(option)}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;