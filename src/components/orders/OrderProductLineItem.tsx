import { NavLink } from 'react-router-dom';
import { OrderItem } from '../../features/shop/ordersSlice';
import { eurFormat } from '../../utils/utils';

interface OrderProductLineItemProps {
  product: OrderItem; 
}

const OrderProductLineItem = ({ product }: OrderProductLineItemProps) => {
  return (
    <li className='order-product-line-item'>
      <span><NavLink to={`/shop/product/${product.product}`}>{product.name}</NavLink></span>
      <span>{product.quantity}</span>
      <span>{eurFormat(product.price)}</span>
      <span>{eurFormat(product.price * product.quantity)}</span>
    </li>
  )
}

export default OrderProductLineItem
