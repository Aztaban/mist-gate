import { FormEvent, useState } from 'react';
import { useUpdateProductMutation } from '@features/apiSlices/productApiSlice';
import { useGetCategoriesQuery } from '@features/apiSlices/categoryApiSlice';
import { Product, ProductDetails, UpdateProductPayload } from '@types';

type EditProductFormParams = {
  product: Product;
  onClose: () => void;
};

const EditProductForm = ({ product, onClose }: EditProductFormParams) => {
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const { data: categories = [], isLoading: catsLoading, isError: catsError } = useGetCategoriesQuery();

  // track only modified fields
  const [modifiedFields, setModifiedFields] = useState<Partial<Product>>({});
  const [modifiedDetails, setModifiedDetails] = useState<Partial<ProductDetails>>({});
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(product.category.id);

  const handleFieldUpdate = (field: keyof Product, value: any) => {
    setModifiedFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleDetailUpdate = (field: keyof ProductDetails, value: any) => {
    setModifiedDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const updates: UpdateProductPayload = {};

    if (modifiedFields.name && modifiedFields.name !== product.name) {
      updates.name = modifiedFields.name;
    }

    if (selectedCategoryId !== product.category.id) {
      updates.category = selectedCategoryId;
    }

    if (Object.keys(modifiedDetails).length > 0) {
      updates.details = { ...modifiedDetails };
    }

    const hasBaseUpdates = Object.keys(updates).some((k) => k !== 'details');
    const hasDetailsUpdates = !!updates.details && Object.keys(updates.details).length > 0;

    if (!hasBaseUpdates && !hasDetailsUpdates) {
      onClose();
      return;
    }

    try {
      await updateProduct({ id: product.id, updates }).unwrap();
      alert('Product updated successfully!');
      onClose();
    } catch (err) {
      console.error('Failed to update product:', err);
      alert('Failed to update product.');
    }
  };

  const nameChanged = modifiedFields.name !== undefined && modifiedFields.name !== product.name;
  const categoryChanged = selectedCategoryId !== product.category.id;
  const authorChanged = modifiedDetails.author !== undefined && modifiedDetails.author !== product.details.author;
  const releaseChanged =
    modifiedDetails.releaseDate !== undefined && modifiedDetails.releaseDate !== product.details.releaseDate;
  const descChanged =
    modifiedDetails.description !== undefined && modifiedDetails.description !== product.details.description;

  return (
    <section className="surface-dark section product-editor product-editor--compact">
      <header className="section-bar section-bar--sub">
        <h2 className="section-bar__title section-bar__title--sm">Edit Product</h2>

        <button type="button" onClick={onClose} className="btn btn--ghost btn--sm" disabled={isLoading}>
          Close
        </button>
      </header>

      <form onSubmit={handleSubmit} className="product-editor__form product-editor__form--single">
        <p className="product-editor__note">
          Only changed fields will be saved. Previous values appear below when you make a change.
        </p>

        <div className="product-editor__group">
          <h3 className="product-editor__group-title">Basics</h3>

          <div className="form__field">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              value={modifiedFields.name ?? product.name}
              onChange={(e) => handleFieldUpdate('name', e.target.value)}
              disabled={isLoading}
            />
            {nameChanged && (
              <p className="field-helper field-helper--prev">
                Previous: <span>{product.name}</span>
              </p>
            )}
          </div>

          <div className="form__field">
            <label htmlFor="category">Category</label>
            {catsLoading ? (
              <p>Loading categories…</p>
            ) : catsError ? (
              <p className="errMsg">Failed to load categories.</p>
            ) : (
              <select
                id="category"
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                disabled={isLoading}>
                <option value="">— Select —</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            )}
            {categoryChanged && (
              <p className="field-helper field-helper--prev">
                Previous: <span>{product.category.name}</span>
              </p>
            )}
          </div>
        </div>

        <div className="product-editor__group">
          <h3 className="product-editor__group-title">Details</h3>

          <div className="form__field">
            <label htmlFor="details.author">Author</label>
            <input
              type="text"
              id="details.author"
              value={modifiedDetails.author ?? product.details.author}
              onChange={(e) => handleDetailUpdate('author', e.target.value)}
              disabled={isLoading}
            />
            {authorChanged && (
              <p className="field-helper field-helper--prev">
                Previous: <span>{product.details.author}</span>
              </p>
            )}
          </div>

          <div className="form__field">
            <label htmlFor="details.releaseDate">Release Date</label>
            <input
              type="date"
              id="details.releaseDate"
              value={modifiedDetails.releaseDate ?? (product.details.releaseDate || '')}
              onChange={(e) => handleDetailUpdate('releaseDate', e.target.value)}
              disabled={isLoading}
            />
            {releaseChanged && (
              <p className="field-helper field-helper--prev">
                Previous: <span>{product.details.releaseDate || '—'}</span>
              </p>
            )}
          </div>

          <div className="form__field">
            <label htmlFor="details.description">Description</label>
            <textarea
              id="details.description"
              value={modifiedDetails.description ?? (product.details.description || '')}
              onChange={(e) => handleDetailUpdate('description', e.target.value)}
              placeholder="Product description"
              rows={6}
              disabled={isLoading}
            />
            {descChanged && (
              <p className="field-helper field-helper--prev">
                Previous: <span>{product.details.description || '—'}</span>
              </p>
            )}
          </div>
        </div>

        <div className="product-editor__actions form__actions">
          <button type="button" onClick={onClose} className="btn btn--ghost" disabled={isLoading}>
            Cancel
          </button>
          <button type="submit" className="btn btn--brand" disabled={isLoading}>
            {isLoading ? 'Saving…' : 'Save Product'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditProductForm;
