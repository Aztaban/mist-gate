import { useParams } from 'react-router-dom';
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

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(validId ? (productId as string) : '', {
    skip: !validId,
  });

  const [isEditing, setIsEditing] = useState(false);

  if (!validId) return <p>Invalid product id.</p>;
  if (isLoading) return <p>Loading product details...</p>;
  if (isError || !product) return <p>Failed to load product details.</p>;

  return (
    <article className="page-stack">
      {!isEditing ? (
        <AdminProductDetail product={product} onEdit={() => setIsEditing(true)} />
      ) : (
        <EditProductForm product={product} onClose={() => setIsEditing(false)} />
      )}
    </article>
  );
};

export default AdminSingleProduct;
