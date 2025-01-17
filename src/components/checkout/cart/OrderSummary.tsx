import {
  CreateOrder,
  ShippingAddress,
} from '../../../features/shop/ordersApiSlice';
import OrderProducts from '../../orders/OrderProducts';
import Address from '../../orders/Address';
import OrderPriceSummary from '../../orders/OrderPriceSummary';
import { calculateOrderPrices } from '../../../utils/utils';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCheckout,
  setOrderId,
} from '../../../features/checkout/checkoutSlice';
import { useAddNewOrderMutation } from '../../../features/shop/ordersApiSlice';

interface OrderSummaryProps {
  onNext: () => void;
  onPrevious: () => void;
}

const OrderSummary = ({ onNext, onPrevious }: OrderSummaryProps) => {
  const [addNewOrder] = useAddNewOrderMutation();
  const dispatch = useDispatch();
  const order: CreateOrder = useSelector(selectCheckout);
  const { itemsPrice, shippingPrice } = calculateOrderPrices(
    order.products,
    order.shippingMethod
  );

  const handleNext = async () => {
    try {
      const orderId = await addNewOrder(order).unwrap();

      if (orderId) {
        dispatch(setOrderId(orderId));
        onNext();
      } else {
        console.error('Order creation succeeded, but no orderId was returned.');
      }
    } catch {
      console.error('Failed to create the order');
    }
  };

  return (
    <>
      <h2>3. Order Summary</h2>
      <article className="checkout checkout-spaced">
        <OrderProducts products={order.products} />
        <div className="cart-bottom">
          <Address address={order.shippingAddress as ShippingAddress} />

          <OrderPriceSummary
            itemsPrice={itemsPrice}
            shippingPrice={shippingPrice}
          />
        </div>
      </article>
      <div className="checkout-buttons">
        <button className="btn save-btn" onClick={onPrevious}>
          Back
        </button>
        <button className="btn back-btn" onClick={handleNext}>
          Order Summary
        </button>
      </div>
    </>
  );
};

export default OrderSummary;
