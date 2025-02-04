import { FormEvent, useState } from 'react';
import { useUpdateProductMutation } from '../../../features/shop/productApiSlice';
import {
  ProductDetails,
  Product,
} from '../../../features/shop/productApiSlice';
import { productCategories } from '../../../config/productCategories';

type EditProductFormParams = {
  product: Product;
  onClose: () => void;
};

const EditProductForm = ({ product, onClose }: EditProductFormParams) => {
  const [updateProduct] = useUpdateProductMutation();
  const [modifiedFields, setModifiedFields] = useState<Partial<Product>>({});
  const [modifiedDetails, setModifiedDetails] = useState<
    Partial<ProductDetails>
  >({});

  const handleFieldUpdate = (field: keyof Product, value: any) => {
    setModifiedFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleDetailUpdate = (field: keyof ProductDetails, value: any) => {
    setModifiedDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!product) return;

    const updatedProduct: Partial<Product> = {
      ...modifiedFields,
      ...(Object.keys(modifiedDetails).length > 0 && {
        details: modifiedDetails,
      }),
    };

    console.log(updatedProduct);

    try {
      await updateProduct({ id: product.id, updates: updatedProduct }).unwrap();
      alert('Product updated succesfully!');
    } catch (err) {
      console.error('Failed to update product:', err);
      alert('Failed to update product.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='admin-order-form'>
      <label htmlFor="name">Product Name:</label>
      <input
        type="text"
        id="name"
        value={modifiedFields.name ?? product.name}
        onChange={(e) => handleFieldUpdate('name', e.target.value)}
      />
      <label htmlFor="productType">Product Type:</label>
      {modifiedFields.name && modifiedFields.name !== product.name && (
        <p>Previous: {product.name}</p>
      )}
      <select
        id="productType"
        name="productType"
        onChange={(e) => handleFieldUpdate('productType', e.target.value)}
        value={modifiedFields.productType ?? product.productType}
      >
        {productCategories.map((productType) => (
          <option key={productType} value={productType}>
            {productType}
          </option>
        ))}
      </select>
      <label htmlFor="details.author">Author:</label>
      <input
        type="text"
        id="details.author"
        value={modifiedDetails.author ?? product.details.author}
        onChange={(e) => handleDetailUpdate('author', e.target.value)}
      />
      <label htmlFor="details.releaseDate">Release Date:</label>
      <input
        type="date"
        id="details.releaseDate"
        value={modifiedDetails.releaseDate ?? product.details.releaseDate}
        onChange={(e) => handleDetailUpdate('releaseDate', e.target.value)}
      />
      <label htmlFor="details.description">Description:</label>
      <textarea
        id="details.description"
        value={modifiedDetails.description ?? product.details.description}
        onChange={(e) => handleDetailUpdate('releaseDate', e.target.value)}
        placeholder="Product Description"
        rows={6}
      />
      <div>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
        <button type="submit">Save Product</button>
      </div>
    </form>
  );
};

export default EditProductForm;
