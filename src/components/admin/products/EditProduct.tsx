import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from '../../../features/shop/productApiSlice';
import {
  ProductDetails,
  Product,
} from '../../../features/shop/productApiSlice';
import EditableField from '../../common/EditableField';

type EditProductParams = {
  productId: string;
};

const EditProduct = () => {
  const { productId } = useParams<EditProductParams>();
  const [updateProduct] = useUpdateProductMutation();
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(productId || '');

  const [modifiedFields, setModifiedFields] = useState<Partial<Product>>({});
  const [modifiedDetails, setModifiedDetails] = useState<Partial<ProductDetails>>({});

  const handleFieldUpdate = (field: keyof Product, value: any) => {
    setModifiedFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleDetailUpdate = (field: keyof ProductDetails, value: any) => {
    setModifiedDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!productId) return;

    const updatedProduct: Partial<Product> = {
      ...modifiedFields,
      ...(Object.keys(modifiedDetails).length > 0 && { details: modifiedDetails }),
    };

    console.log(updatedProduct)

    try {
      await updateProduct({ id: productId, updates: updatedProduct }).unwrap();
      alert('Product updated succesfully!');
    } catch (err) {
      console.error('Failed to update product:', err);
      alert('Failed to update product.');
    }
  };

  if (isLoading) return <p>Loading product details...</p>;
  if (isError) return <p>Failed to load product details.</p>;

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <p>Product Id: {product?.id}</p>
        <EditableField
          label="Name"
          value={modifiedFields.name || product?.name || ''}
          fieldName="name"
          onUpdate={(field, value) =>
            handleFieldUpdate(field as keyof Product, value)
          }
        />
        <EditableField
          label="Product Type"
          value={modifiedFields.productType || product?.productType || ''}
          fieldName="productType"
          onUpdate={(field, value) =>
            handleFieldUpdate(field as keyof Product, value)
          }
        />
        <EditableField
          label="Price"
          value={modifiedFields.price || product?.price || ''}
          fieldName="price"
          onUpdate={(field, value) =>
            handleFieldUpdate(field as keyof Product, value)
          }
        />
        <p>Image path: {product?.image}</p>
        <EditableField
          label="Count in Stock"
          value={modifiedFields.countInStock || product?.countInStock || ''}
          fieldName="countInStock"
          onUpdate={(field, value) =>
            handleFieldUpdate(field as keyof Product, value)
          }
        />
        <p>Units Sold: {product?.unitsSold}</p>
        <fieldset id="productDetails">
          <legend>details</legend>
          <EditableField
            label="Author"
            value={modifiedDetails.author ?? product?.details?.author ?? ''}
            fieldName="author"
            onUpdate={(field, value) =>
              handleDetailUpdate(field as keyof ProductDetails, value)
            }
          />
          <p>Release date: {product?.details.releaseDate}</p>
          <EditableField
            label="Description"
            value={
              modifiedDetails.description ?? product?.details?.description ?? ''
            }
            fieldName="description"
            onUpdate={(field, value) =>
              handleDetailUpdate(field as keyof ProductDetails, value)
            }
            isMultiline
          />
        </fieldset>
        <button type="button">Back to Products</button>
        <button type="submit">Save Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
