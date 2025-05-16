import { Category } from '@types';

interface Props {
  selectedCategory: Category | null;
  onSubmit: () => void;
  onDelete: () => void;
  productCount: number;
}

const CategoryFormActions = ({ selectedCategory, onSubmit, onDelete, productCount }: Props) => {
  return (
    <div style={{ marginTop: '1rem' }}>
      <button onClick={onSubmit}>{selectedCategory ? 'Save Changes' : 'Create Category'}</button>

      {selectedCategory && (
        <div style={{ marginTop: '0.5rem' }}>
          <button onClick={onDelete} disabled={productCount > 0} style={{ marginRight: '0.5rem' }}>
            Delete
          </button>
          <span style={{ fontSize: '0.9rem', color: productCount > 0 ? 'red' : 'inherit' }}>
            {productCount > 0
              ? `Cannot delete: ${productCount} products in this category`
              : 'No products in this category'}
          </span>
        </div>
      )}
    </div>
  );
};

export default CategoryFormActions;
