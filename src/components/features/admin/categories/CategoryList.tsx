import { useState, useMemo } from 'react';
import { Category } from '@types';
import { useGetCategoriesQuery } from '@features/apiSlices/categoryApiSlice';

interface Props {
  onSelectCategory: (category: Category) => void;
  limit?: number;
}

const CategoryList = ({ onSelectCategory, limit = 5 }: Props) => {
  const [search, setSearch] = useState<string>('');
  const { data: categories = [], isLoading, isError } = useGetCategoriesQuery();

  const filteredCategories = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = q ? categories.filter((c) => c.name.toLowerCase().includes(q)) : categories;
    return list.slice(0, limit);
  }, [categories, search, limit]);

  if (isLoading) return <p>Loading categories…</p>;
  if (isError) return <p>Failed to load categories.</p>;

  return (
    <div className="search-user">
      <input
        type="text"
        placeholder="search category"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
        aria-label="Search category"
      />

      {filteredCategories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, marginTop: 8 }}>
          {filteredCategories.map((category) => (
            <li
              key={category.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelectCategory(category)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onSelectCategory(category);
              }}
              style={{ padding: '6px 8px', cursor: 'pointer' }}>
              {category.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryList;
