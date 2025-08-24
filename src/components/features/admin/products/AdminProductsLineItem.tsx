import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { Product } from '@types';
import { eurFormat } from '@utils';

interface AdminProductsLineItemProps {
  product: Product;
  categoryName: string;
}

const AdminProductsLineItem = ({ product, categoryName }: AdminProductsLineItemProps): ReactElement => {
  return (
    <tr>
      <td className="admin-product-link">
        <NavLink to={`/admin/products/edit/${product.id}`}>
          <p>{product.name}</p>
        </NavLink>
      </td>
      <td>{product.countInStock}</td>
      <td>{product.unitsSold}</td>
      <td>{eurFormat(product.price)}</td>
      <td>{categoryName}</td>
      <td>
        <NavLink to={`/admin/products/edit/${product.id}`}>
          <button className="btn save-btn">Product</button>
        </NavLink>
      </td>
    </tr>
  );
};

export default AdminProductsLineItem;
