import { CreateOrder, ShippingAddress } from '@types';
import OrderProducts from '../../orders/OrderProducts';
import Address from '../../orders/Address';
import OrderPriceSummary from '../../orders/OrderPriceSummary';
import { calculateOrderPrices } from '@utils';
import { useSelector, useDispatch } from 'react-redux';
import { selectCheckout, setOrderId, clearCart } from '@features/slices/checkoutSlice';
import { useAddNewOrderMutation } from '@features/apiSlices/ordersApiSlice';

interface OrderSummaryProps {
  onNext: () => void;
  onPrevious: () => void;
}

const OrderSummary = ({ onNext, onPrevious }: OrderSummaryProps) => {
  const [addNewOrder] = useAddNewOrderMutation();
  const dispatch = useDispatch();
  const order: CreateOrder = useSelector(selectCheckout);
  const { itemsPrice, shippingPrice } = calculateOrderPrices(order.products, order.shippingMethod);

  const handleNext = async () => {
    try {
      const orderId = await addNewOrder(order).unwrap();

      if (orderId) {
        dispatch(setOrderId(orderId));
        dispatch(clearCart());
        onNext();
      } else {
        console.error('Order creation succeeded, but no orderId was returned.');
      }
    } catch {
      console.error('Failed to create the order');
    }
  };

  return (
    <section className="checkout page-stack">
      <header className="section-bar surface-dark">
        <h1 className="section-bar__title">3. Order Summary</h1>
      </header>

      <article className="checkout checkout-spaced">
        <OrderProducts products={order.products} />
        <div className="cart-bottom section surface-dark">
          {order.shippingAddress && <Address address={order.shippingAddress as ShippingAddress} />}

          <OrderPriceSummary itemsPrice={itemsPrice} shippingPrice={shippingPrice} />
        </div>
      </article>
      <div className="checkout-actions checkout-actions--split">
        <button className="btn btn--ghost" onClick={onPrevious}>
          Address
        </button>
        <button className="btn btn--brand" onClick={handleNext}>
          Confirm Order
        </button>
      </div>
    </section>
  );
};

export default OrderSummary;
