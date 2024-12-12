import { NavLink } from 'react-router-dom';
import { OrderItem } from '../../features/shop/ordersApiSlice';
import { eurFormat } from '../../utils/utils';

interface OrderProductLineItemProps {
  product: OrderItem; 
}

const OrderProductLineItem = ({ product }: OrderProductLineItemProps) => {
  return (
    <li className='order-product-layout order-product-line-item'>
      <span><NavLink to={`/shop/product/${product.product}`}>{product.name}</NavLink></span>
      <span className='text-center'>{product.quantity}</span>
      <span className='hidden-ss-flex text-right'>{eurFormat(product.price)}</span>
      <span className='text-right'>{eurFormat(product.price * product.quantity)}</span>
    </li>
  )
}

export default OrderProductLineItem
