interface Props {
  name: string;
  setName: (value: string) => void;
}

const CategoryFormFields = ({ name, setName }: Props) => {
  return (
    <div>
      <label htmlFor="category-name">Category Name</label>
      <input type="text" id="category-name" value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
};

export default CategoryFormFields;
