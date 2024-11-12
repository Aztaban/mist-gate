import { useGetProductsQuery } from '../../../features/shop/productSlice';
import { ReactElement } from 'react';
import { eurFormat } from '../../../utils/utils';

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
    pageContent = (
      <table className="admin-orders-list">
        <thead>
          <tr className="admin-order-line-header bold green">
            <th>Product name</th>
            <th>In stock</th>
            <th>Items Sold</th>
            <th>Price</th>
            <th>Category</th>
            <th>Tools</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr className="admin-order-line-header">
              <td>{product.name}</td>
              <td>{product.countInStock}</td>
              <td>{product.countInStock}</td>
              <td>{eurFormat(product.price)}</td>
              <td>{product.productType}</td>
              <td>
                <button>Product Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <article className="order">
      <h2 className='orders-header'>Admin Products</h2>
      {pageContent}
    </article>
  );
};

export default AdminProductsPage;
