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
    pageContent = <AdminProductsList products={products} />;
  }

  return (
    <article className="orders-main-page">
      <h2 className="header-wraper">
        <p>Admin Products</p>
        <button className='btn back-btn'>
          <NavLink to={'/admin/products/product'}>New Product</NavLink>
        </button>
      </h2>
      {pageContent}
    </article>
  );
};

export default AdminProductsPage;
