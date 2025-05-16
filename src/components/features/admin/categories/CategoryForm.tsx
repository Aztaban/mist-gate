import { useState, useEffect } from 'react';
import { Category, Product } from '@types';
import {
  useAddNewCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from '@features/apiSlices/categoryApiSlice';
import CategoryFormFields from './CategoryFormFields';
import CategoryFormActions from './CategoryFormActions';

interface Props {
  selectedCategory: Category | null;
  clearSelection: () => void;
  products: Product[];
}

const CategoryForm = ({ selectedCategory, products, clearSelection }: Props) => {
  const [name, setName] = useState('');
  const [addCategory] = useAddNewCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  useEffect(() => {
    setName(selectedCategory?.name || '');
  }, [selectedCategory]);

  const productCount = selectedCategory ? products.filter((p) => p.category?.id === selectedCategory.id).length : 0;

  const handleSubmit = () => {
    if (name.trim() === '') return;

    if (selectedCategory) {
      updateCategory({ ...selectedCategory, name }).unwrap();
    } else {
      addCategory({ name }).unwrap();
    }

    clearSelection();
    setName('');
  };

  const handleDelete = () => {
    if (!selectedCategory) return;
    if (productCount > 0) {
      alert('Cannot delete category with products.');
      return;
    }

    deleteCategory(selectedCategory.id).unwrap();
    clearSelection();
    setName('');
  };

  return (
    <div>
      {selectedCategory && (
        <div style={{ textAlign: 'right', marginBottom: '0.5rem' }}>
          <button onClick={clearSelection}>+ New Category</button>
        </div>
      )}

      <h3>{selectedCategory ? 'Edit Category' : 'Create New Category'}</h3>

      <CategoryFormFields name={name} setName={setName} />
      <CategoryFormActions
        selectedCategory={selectedCategory}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        productCount={productCount}
      />
    </div>
  );
};

export default CategoryForm;
