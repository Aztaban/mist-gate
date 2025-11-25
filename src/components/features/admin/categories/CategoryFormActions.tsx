import { Category } from '@types';

interface Props {
  selectedCategory: Category | null;
  onSubmit: () => void;
  onDelete: () => void;
  productCount: number;
  disabled?: boolean;
}

const CategoryFormActions = ({ selectedCategory, onSubmit, onDelete, productCount, disabled = false }: Props) => {
  const canDelete = !!selectedCategory && productCount === 0 && !disabled;

  return (
    <div className="form__actions category-form__actions">
      <button type="button" onClick={onSubmit} disabled={disabled} className="btn btn--brand btn--sm">
        {selectedCategory ? 'Save Changes' : 'Create Category'}
      </button>

      {selectedCategory && (
        <div className="category-form__delete">
          <button
            type="button"
            onClick={onDelete}
            disabled={!canDelete}
            className="btn btn--del btn--sm"
            aria-disabled={!canDelete}>
            Delete Category
          </button>

          <span
            className={productCount > 0 ? 'category-form__hint category-form__hint--danger' : 'category-form__hint'}>
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
