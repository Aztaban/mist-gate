import { ReactElement } from 'react';
import { Product } from '../../../features/shop/productApiSlice';
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
    <table className="admin-products-list">
      <thead>
        <tr>
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
          <AdminProductsLineItem key={product.id} product={product} />
        ))}
      </tbody>
    </table>
  );
};

export default AdminProductsList;
