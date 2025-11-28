import { OrderItem } from '@types';
import OrderProductLineItem from './OrderProductLineItem';
import { eurFormat } from '@utils';

interface OrderProductsProps {
  products: OrderItem[];
}

const OrderProducts = ({ products }: OrderProductsProps) => {
  const totalQuantity = products.reduce((total, product) => total + product.quantity, 0);
  const totalPrice = products.reduce((total, product) => total + product.price * product.quantity, 0);

  return (
    <table className=" surface-dark table table--compact order-products-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th className="hidden-ss-cell u-text-right">Unit Price</th>
          <th className="u-text-right">Total Price</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <OrderProductLineItem key={product.product} product={product} />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td>{totalQuantity}</td>
          <td className="hidden-ss-cell"></td>
          <td className="u-text-success u-text-right">{eurFormat(totalPrice)}</td>
        </tr>
      </tfoot>
    </table>
  );
};

export default OrderProducts;
