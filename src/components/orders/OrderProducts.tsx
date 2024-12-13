import { OrderItem } from '../../features/shop/ordersApiSlice';
import OrderProductLineItem from './OrderProductLineItem';
import { eurFormat } from '../../utils/utils';

interface OrderProductsProps {
  products: OrderItem[];
}

const OrderProducts = ({ products }: OrderProductsProps) => {
  const totalQuantity = products.reduce(
    (total, product) => total + product.quantity,
    0
  );
  const totalPrice = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
      <ul className="cart">
        <li className="cart__item order-product-layout order-products-header">
          <span>Product</span>
          <span className="text-center">Quantity</span>
          <span className="hidden-ss-flex text-right">Unit Price</span>
          <span className="text-right">Total Price</span>
        </li>

        {products.map((product) => (
          <OrderProductLineItem key={product.product} product={product} />
        ))}

        <li className="cart__item order-product-layout order-products-footer">
          <span>Total</span>
          <span className="text-center">{totalQuantity}</span>
          <span className="hidden-ss-flex text-right"></span>
          <span className="text-right">{eurFormat(totalPrice)}</span>
        </li>
      </ul>
  );
};

export default OrderProducts;
