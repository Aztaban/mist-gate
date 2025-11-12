import { NavLink } from 'react-router-dom';
import { OrderItem } from '@types';
import { eurFormat } from '@utils';

interface OrderProductLineItemProps {
  product: OrderItem;
}

const OrderProductLineItem = ({ product }: OrderProductLineItemProps) => {
  const lineTotal = product.price * product.quantity;

  return (
    <tr>
      <td>
        <NavLink to={`/shop/product/${product.product}`}>{product.name}</NavLink>
      </td>
      <td>{product.quantity}</td>
      <td className="hidden-ss-cell">{eurFormat(product.price)}</td>
      <td>{eurFormat(lineTotal)}</td>
    </tr>
  );
};

export default OrderProductLineItem;
