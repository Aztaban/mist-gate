import { useState } from 'react';
import CategoryForm from '../categories/CategoryForm';
import CategoryList from '../categories/CategoryList';
import { Category, Product } from '@types';

interface Props {
  products: Product[];
}

const CategoryManager = ({ products }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  return (
    <div className="users-manager">
      <h2>Category Manager</h2>
      <div className="users-grid">
        <CategoryList onSelectCategory={setSelectedCategory} />
        <CategoryForm selectedCategory={selectedCategory} products={products} />
      </div>
    </div>
  );
};

export default CategoryManager;
