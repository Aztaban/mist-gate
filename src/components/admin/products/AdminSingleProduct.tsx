import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useGetProductByIdQuery } from '../../../features/shop/productApiSlice';
import AdminProductDetail from './AdminProductDetail';
import EditProductForm from './EditProductForm';

type AdminSingleProductParams = {
  productId: string;
};

const AdminSingleProduct = () => {
  const { productId } = useParams<AdminSingleProductParams>();
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(productId || '');

  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) return <p>Loading product details...</p>;
  if (isError || !product) return <p>Failed to load product details.</p>;

  return (
    <article className="orders-main-page">
      <h2 className="header-wraper">
        <p>{!isEditing ? 'Product Detail' : 'Edit Product'}</p>
        {!isEditing && <button className="btn back-btn" onClick={() => setIsEditing(true)}>Edit Product</button>}
      </h2>
      {!isEditing ? <AdminProductDetail product={product} /> : <EditProductForm product={product} onClose={() => setIsEditing(false)} />}
    </article>
  );
};

export default AdminSingleProduct;
