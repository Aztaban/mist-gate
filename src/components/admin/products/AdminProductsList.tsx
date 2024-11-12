import { ReactElement } from 'react';
import { Product } from '../../../features/shop/productSlice';
import AdminProductsLineItem from './AdminProductsLineItem';

interface AdminProductsListProps {
  products: Product[];
}

const AdminProductsList = ({
  products,
}: AdminProductsListProps): ReactElement => {
  if (!products || products.length === 0) {
    return <p>No products to found.</p>;
  }

  return (
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
          <AdminProductsLineItem product={product} />
        ))}
      </tbody>
    </table>
  );
};

export default AdminProductsList;
