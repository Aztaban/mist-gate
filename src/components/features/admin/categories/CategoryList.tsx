import { useState } from 'react';
import { Category } from '@types';
import { useGetCategoriesQuery } from '@features/apiSlices/categoryApiSlice';

interface Props {
  onSelectCategory: (category: Category) => void;
}

const CategoryList = ({ onSelectCategory }: Props) => {
  const [search, setSearch] = useState<string>('');
  const { data: categories = [] } = useGetCategoriesQuery();

  const filteredCategories = categories
    .filter((category) => category.name.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 5);

  return (
    <div className="search-user">
      <input
        type="text"
        placeholder="search category"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      {filteredCategories.length === 0 || search === '' ? (
        <p>No categories found.</p>
      ) : (
        <ul>
          {filteredCategories.map((category) => (
            <li key={category.id} onClick={() => onSelectCategory(category)}>
              {category.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryList;
