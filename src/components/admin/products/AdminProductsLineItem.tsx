import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { Product } from '../../../features/shop/productSlice';
import { eurFormat } from '../../../utils/utils';

interface AdminProductsLineItemProps {
  product: Product;
}

const AdminProductsLineItem = ({
  product,
}: AdminProductsLineItemProps): ReactElement => {
  return (
    <tr className="admin-order-line-header">
      <td>{product.name}</td>
      <td>{product.countInStock}</td>
      <td>{product.unitsSold}</td>
      <td>{eurFormat(product.price)}</td>
      <td>{product.productType}</td>
      <td>
        <NavLink to="">
          <button>Product Details</button>
        </NavLink>
      </td>
    </tr>
  );
};

export default AdminProductsLineItem;
