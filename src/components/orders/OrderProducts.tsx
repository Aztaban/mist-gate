import { OrderItem } from '../../features/shop/ordersSlice';
import OrderProductLineItem from './OrderProductLineItem';
import { eurFormat } from '../../utils/utils';

interface OrderProductsProps {
  products: OrderItem[];
}

const OrderProducts = ({ products }: OrderProductsProps) => {
  const totalQuantity = products.reduce((total, product) => total + product.quantity, 0);
  const totalPrice = products.reduce((total, product) => total + product.price * product.quantity, 0);

  console.log(products)

  return (
    <div className="order-products">
      <div className="order-products-header">
        <span>Product</span>
        <span>Quantity</span>
        <span>Unit Price</span>
        <span>Total Price</span>
      </div>
      <ul className="order-products-list">
        {products.map((product) => (
          <OrderProductLineItem key={product.product} product={product} />
        ))}
      </ul>
      <div className="order-products-footer">
        <span>Total</span>
        <span>{totalQuantity}</span>
        <span></span>
        <span>{eurFormat(totalPrice)}</span>
      </div>
    </div>
  );
};

export default OrderProducts;
