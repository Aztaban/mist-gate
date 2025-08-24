import { FormEvent, useMemo, useState } from 'react';
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

  const handleFieldUpdate = (field: keyof Product, value: any) => {
    setModifiedFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleDetailUpdate = (field: keyof ProductDetails, value: any) => {
    setModifiedDetails((prev) => ({ ...prev, [field]: value }));
  };

  const categoryNameById = useMemo(() => new Map(categories.map((c) => [c.id, c.name])), [categories]);

  const currentCategoryName = categoryNameById.get(product.category) ?? '—';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!product) return;

    const updates: UpdateProductPayload = { ...modifiedFields };
    if (Object.keys(modifiedDetails).length > 0) {
      (updates as any).details = modifiedDetails;
    }

    if (Object.keys(updates).length === 0) {
      onClose();
      return;
    }

    try {
      await updateProduct({ id: product.id, updates }).unwrap();
      alert('Product updated successfully!');
      onClose(); // close only after success
    } catch (err) {
      console.error('Failed to update product:', err);
      alert('Failed to update product.');
    }
  };

  return (
    <div className="admin-order">
      <form onSubmit={handleSubmit} className="admin-order-form">
        <fieldset disabled={isLoading}>
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            value={modifiedFields.name ?? product.name}
            onChange={(e) => handleFieldUpdate('name' as const, e.target.value)}
          />
          {modifiedFields.name && modifiedFields.name !== product.name && <p>Previous: {product.name}</p>}

          <label htmlFor="category">Category:</label>
          {catsLoading ? (
            <p>Loading categories…</p>
          ) : catsError ? (
            <p className="errMsg">Failed to load categories.</p>
          ) : (
            <select
              id="category"
              value={modifiedFields.category ?? product.category}
              onChange={(e) => handleFieldUpdate('category' as const, e.target.value)}>
              <option value="">— Select —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          )}
          {modifiedFields.category && modifiedFields.category !== product.category && (
            <p>Previous: {currentCategoryName}</p>
          )}

          <label htmlFor="details.author">Author:</label>
          <input
            type="text"
            id="details.author"
            value={modifiedDetails.author ?? product.details.author}
            onChange={(e) => handleDetailUpdate('author', e.target.value)}
          />
          {modifiedDetails.author && modifiedDetails.author !== product.details.author && (
            <p>Previous: {product.details.author}</p>
          )}

          <label htmlFor="details.releaseDate">Release Date:</label>
          <input
            type="date"
            id="details.releaseDate"
            value={modifiedDetails.releaseDate ?? (product.details.releaseDate || '')}
            onChange={(e) => handleDetailUpdate('releaseDate', e.target.value)}
          />
          {modifiedDetails.releaseDate && modifiedDetails.releaseDate !== product.details.releaseDate && (
            <p>Previous: {product.details.releaseDate || '—'}</p>
          )}

          <label htmlFor="details.description">Description:</label>
          <textarea
            id="details.description"
            value={modifiedDetails.description ?? (product.details.description || '')}
            onChange={(e) => handleDetailUpdate('description', e.target.value)}
            placeholder="Product Description"
            rows={6}
          />
          {modifiedDetails.description && modifiedDetails.description !== product.details.description && (
            <p>Previous: {product.details.description || '—'}</p>
          )}
        </fieldset>

        <div className="checkout-buttons">
          <button type="button" onClick={onClose} className="btn">
            Cancel
          </button>
          <button type="submit" className="btn back-btn" disabled={isLoading}>
            {isLoading ? 'Saving…' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
