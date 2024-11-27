import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../../features/shop/productApiSlice';
import { Product } from '../../../features/shop/productApiSlice';
import EditableField from '../../common/EditableField';

type EditProductParams = {
  productId: string;
};

const EditProduct = () => {
  const { productId } = useParams<EditProductParams>();
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(productId || '');

  const [editableFields, setEditableFields] = useState({
    name: '',
    productType: '',
    price: 0,
    countInStock: 0,
    author: '',
    releaseDate: '',
    description: '',
  });

  useEffect(() => {
    if (product) {
      setEditableFields({
        name: product.name,
        productType: product.productType,
        price: product.price,
        countInStock: product.countInStock,
        author: product.details.author,
        releaseDate: product.details.releaseDate,
        description: product.details.description,
      });
    }
  }, [product]);

  const handleFieldUpdate = (field: string, value: string | number) => {
    setEditableFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!productId) return;
  };

  if (isLoading) return <p>Loading product details...</p>;
  if (isError) return <p>Failed to load product details.</p>;

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="productId">Product Id:</label>
        <p>{product?.id}</p>
        <EditableField
          label="Name"
          value={editableFields.name}
          fieldName="name"
          onUpdate={handleFieldUpdate}
        />
        <EditableField
          label="Product Type"
          value={editableFields.productType}
          fieldName="productType"
          onUpdate={handleFieldUpdate}
        />
        <EditableField
          label="Price"
          value={editableFields.price}
          fieldName="price"
          onUpdate={handleFieldUpdate}
        />
        <label htmlFor="image path">Image:</label>
        <p>{product?.image}</p>
        <EditableField
          label="Count in Stock"
          value={editableFields.countInStock}
          fieldName="countInStock"
          onUpdate={handleFieldUpdate}
        />
        <label htmlFor="unitsSold">Units Sold:</label>
        <p>{product?.unitsSold}</p>
        <fieldset>
          <legend>details</legend>
          <EditableField
            label="Author"
            value={editableFields.author}
            fieldName="author"
            onUpdate={handleFieldUpdate}
          />
          <label htmlFor="releaseDate">Release date:</label>
          <p>{editableFields.releaseDate}</p>
          <EditableField
            label="Description"
            value={editableFields.description}
            fieldName="description"
            onUpdate={handleFieldUpdate}
            isMultiline
          />
        </fieldset>
        <button type="button">Back to Products</button>
        <button type='submit'>Save Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
