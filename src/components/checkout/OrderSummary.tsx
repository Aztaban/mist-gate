import { useLocation, useNavigate } from 'react-router-dom';
import { CreateOrder } from '../../features/shop/ordersSlice';
import { eurFormat, countTaxFree } from '../../utils/utils';
import { useAddNewOrderMutation } from '../../features/shop/ordersSlice';
import { clearCart } from '../../features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import OrderProducts from '../orders/OrderProducts';
import Address from '../orders/Address';
import OrderPriceSummary from '../orders/OrderPriceSummary';

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const order: CreateOrder = location.state;

  const totalPrice = order.itemsPrice + order.shippingPrice;

  const [addNewOrder, { isSuccess, isError, error }] = useAddNewOrderMutation();

  const handleSubmitOrder = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const newOrderId = await addNewOrder(order).unwrap();
      alert('Order created successfully!');
      dispatch(clearCart());
      navigate(`/order/${newOrderId}`);
    } catch (err) {
      console.error('failed to create order', err);
    }
  };

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <>
      <article className="order">
        <h2 className="orders-header">Order Summary</h2>
        <main>
          <Address address={order.shippingAddress} />
          <h3>Products</h3>
          <OrderProducts products={order.products} />
          <h3>Order Summary</h3>
          <OrderPriceSummary
            itemsPrice={order.itemsPrice}
            shippingPrice={order.shippingPrice}
            totalPrice={totalPrice}
          />
          {isSuccess && <p>Order created successfully!</p>}
          {isError && <p>Error: {error.toString()}</p>}
        </main>
        <div className="buttons-box">
          <button className="btn back-btn" onClick={navigateBack}>
            Back to Address
          </button>
          <button className="btn save-btn" onClick={handleSubmitOrder}>
            Confirm Order
          </button>
        </div>
      </article>
    </>
  );
};

export default OrderSummary;
