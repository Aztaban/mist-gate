import { useParams, NavLink } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { useGetProductByIdQuery } from '@features/apiSlices/productApiSlice';
import AdminProductDetail from './AdminProductDetail';
import EditProductForm from './EditProductForm';

type AdminSingleProductParams = {
  productId?: string;
};

// simple ObjectId check
const isObjectId = (id?: string) => !!id && /^[a-f0-9]{24}$/i.test(id);

const AdminSingleProduct = () => {
  const { productId } = useParams<AdminSingleProductParams>();

  const validId = useMemo(() => isObjectId(productId), [productId]);

  // If invalid id, skip the query entirely
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(validId ? (productId as string) : '', { skip: !validId });

  const [isEditing, setIsEditing] = useState(false);

  if (!validId) return <p>Invalid product id.</p>;
  if (isLoading) return <p>Loading product details...</p>;
  if (isError || !product) return <p>Failed to load product details.</p>;

  return (
    <article className="orders-main-page">
      <h2 className="header-wraper">
        <p>{!isEditing ? 'Product Detail' : 'Edit Product'}</p>
        <div style={{ display: 'flex', gap: 8 }}>
          <NavLink to="/admin/products" className="btn back-btn">
            Back
          </NavLink>
          {!isEditing && (
            <button className="btn save-btn" onClick={() => setIsEditing(true)}>
              Edit Product
            </button>
          )}
        </div>
      </h2>

      {!isEditing ? (
        <AdminProductDetail product={product} />
      ) : (
        <EditProductForm
          product={product}
          onClose={() => setIsEditing(false)} // ensure your form calls this after successful save
        />
      )}
    </article>
  );
};

export default AdminSingleProduct;
