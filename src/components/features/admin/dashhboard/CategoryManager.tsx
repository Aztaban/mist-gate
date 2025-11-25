import { useState } from 'react';
import CategoryForm from '../categories/CategoryForm';
import CategoryList from '../categories/CategoryList';
import { Category, Product } from '@types';

interface Props {
  products?: Product[];
}

const CategoryManager = ({ products = [] }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  return (
    <section className="admin-panel admin-panel--manager users-manager">
      <header className="admin-panel__header">
        <h2 className="admin-panel__title">Category Manager</h2>
      </header>

      <div className="admin-panel__body manager-grid">
        <div className="manager-grid__col manager-grid__col--list">
          <CategoryList onSelectCategory={setSelectedCategory} />
        </div>

        <div className="manager-grid__col manager-grid__col--detail">
          <CategoryForm
            key={selectedCategory?.id ?? 'new'}
            selectedCategory={selectedCategory}
            clearSelection={() => setSelectedCategory(null)}
            products={products}
          />
        </div>
      </div>
    </section>
  );
};

export default CategoryManager;
