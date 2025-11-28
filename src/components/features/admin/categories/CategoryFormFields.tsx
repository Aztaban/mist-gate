interface Props {
  name: string;
  setName: (value: string) => void;
  disabled?: boolean;
}

const CategoryFormFields = ({ name, setName, disabled = false }: Props) => {
  const remaining = 64 - name.length;

  return (
    <div className="form__field category-form__field">
      <label htmlFor="category-name">Category Name</label>

      <input
        type="text"
        id="category-name"
        className="category-form__input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={64}
        disabled={disabled}
        autoComplete="off"
        placeholder="e.g. fantasy"
      />

      <div className="category-form__helper">{remaining} characters left</div>
    </div>
  );
};

export default CategoryFormFields;
