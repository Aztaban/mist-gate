import { Category } from '@types';

interface Props {
  selectedCategory: Category | null;
  onSubmit: () => void;
  onDelete: () => void;
  productCount: number;
  disabled?: boolean;
}

const CategoryFormActions = ({ selectedCategory, onSubmit, onDelete, productCount, disabled = false }: Props) => {
  const canDelete = selectedCategory && productCount === 0 && !disabled;

  return (
    <div style={{ marginTop: '1rem' }}>
      <button type="button" onClick={onSubmit} disabled={disabled}>
        {selectedCategory ? 'Save Changes' : 'Create Category'}
      </button>

      {selectedCategory && (
        <div style={{ marginTop: '0.5rem' }}>
          <button
            type="button"
            onClick={onDelete}
            disabled={!canDelete}
            style={{ marginRight: '0.5rem' }}
            aria-disabled={!canDelete}>
            Delete
          </button>
          <span
            style={{
              fontSize: '0.9rem',
              color: productCount > 0 ? 'red' : 'inherit',
            }}>
            {productCount > 0
              ? `Cannot delete: ${productCount} product${productCount > 1 ? 's' : ''} in this category`
              : 'No products in this category'}
          </span>
        </div>
      )}
    </div>
  );
};

export default CategoryFormActions;
