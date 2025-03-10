import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { Order } from '../../types';
import { eurFormat } from '../../utils/utils';

interface OrderLineItemProps {
  order: Order;
}

const OrderLineItem = ({ order }: OrderLineItemProps): ReactElement => {
  return (
    <tr>
      <td>
        <NavLink to={`/order/${order.id}`}>{order.orderNo}</NavLink>
      </td>
      <td>{new Date(order.created_at).toLocaleDateString()}</td>
      <td className="green-color text-right">{eurFormat(order.totalPrice)}</td>
      <td>{order.status.toUpperCase()}</td>
    </tr>
  );
};

export default OrderLineItem;
