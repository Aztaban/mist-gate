import { useState, useEffect, useMemo } from 'react';
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

// Safely extract a category id from either a string or populated object
const getCategoryId = (p: Product): string => {
  const cat: any = (p as any).category;
  if (typeof cat === 'string') return cat;
  if (cat && typeof cat === 'object') return cat.id ?? cat._id ?? '';
  return '';
};

const CategoryForm = ({ selectedCategory, products, clearSelection }: Props) => {
  const [name, setName] = useState('');

  const [addCategory, { isLoading: adding }] = useAddNewCategoryMutation();
  const [updateCategory, { isLoading: updating }] = useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: deleting }] = useDeleteCategoryMutation();

  useEffect(() => {
    setName(selectedCategory?.name || '');
  }, [selectedCategory]);

  // Build counts once for current products list
  const countsByCategoryId = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of products) {
      const id = getCategoryId(p);
      if (!id) continue;
      map.set(id, (map.get(id) ?? 0) + 1);
    }
    return map;
  }, [products]);

  const productCount = selectedCategory ? countsByCategoryId.get(selectedCategory.id) ?? 0 : 0;

  const busy = adding || updating || deleting;

  const handleSubmit = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;

    try {
      if (selectedCategory) {
        await updateCategory({ id: selectedCategory.id, name: trimmed }).unwrap();
      } else {
        await addCategory({ name: trimmed }).unwrap();
      }
      clearSelection();
      setName('');
    } catch (err: any) {
      alert(err?.data?.message ?? 'Action failed');
    }
  };

  const handleDelete = async () => {
    if (!selectedCategory) return;

    // Client-side guard; server also blocks with 409 if products exist
    if (productCount > 0) {
      alert('Cannot delete category with products.');
      return;
    }

    try {
      await deleteCategory(selectedCategory.id).unwrap();
      clearSelection();
      setName('');
    } catch (err: any) {
      // If BE returns 409, show a clear message
      alert(err?.data?.message ?? 'Delete failed');
    }
  };

  return (
    <div>
      {selectedCategory && (
        <div style={{ textAlign: 'right', marginBottom: '0.5rem' }}>
          <button onClick={clearSelection} disabled={busy}>
            + New Category
          </button>
        </div>
      )}

      <h3>{selectedCategory ? 'Edit Category' : 'Create New Category'}</h3>

      <CategoryFormFields name={name} setName={setName} disabled={busy} />

      <CategoryFormActions
        selectedCategory={selectedCategory}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        productCount={productCount}
        disabled={busy}
      />
    </div>
  );
};

export default CategoryForm;
