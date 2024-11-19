import { useGetProductsQuery } from '../../../features/shop/productApiSlice';
import { ReactElement } from 'react';
import AdminProductsList from './AdminProductsList';
import { NavLink } from 'react-router-dom';

const AdminProductsPage = () => {
  const {
    data: products,
    isSuccess,
    isLoading,
    isError,
  } = useGetProductsQuery();

  let pageContent: ReactElement | ReactElement[] = <p></p>;

  if (isLoading) {
    pageContent = <p>Loading...</p>;
  }

  if (isError) {
    pageContent = <p>No products found.</p>;
  }

  if (isSuccess) {
    pageContent = <AdminProductsList products={products} />
  }

  return (
    <article className="order">
      <h2 className='orders-header'>Admin Products</h2>
      <button><NavLink to={"/admin/products/product"}>Create Product</NavLink></button>
      {pageContent}
    </article>
  );
};

export default AdminProductsPage;
