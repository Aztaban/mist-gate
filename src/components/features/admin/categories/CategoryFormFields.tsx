interface Props {
  name: string;
  setName: (value: string) => void;
  disabled?: boolean; // new
}

const CategoryFormFields = ({ name, setName, disabled = false }: Props) => {
  return (
    <div>
      <label htmlFor="category-name" style={{ display: 'block', marginBottom: 4 }}>
        Category Name
      </label>
      <input
        type="text"
        id="category-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={64} // matches BE limit
        disabled={disabled}
        autoComplete="off"
        placeholder="e.g. books"
        style={{ width: '100%', maxWidth: 360 }}
      />
      <div style={{ fontSize: 12, opacity: 0.75, marginTop: 4 }}>{64 - name.length} characters left</div>
    </div>
  );
};

export default CategoryFormFields;
