import { useLocation, useNavigate } from 'react-router-dom';
import { CreateOrder } from '../../features/shop/ordersSlice';
import { eurFormat, countTaxFree } from '../../utils/utils';
import { useAddNewOrderMutation } from '../../features/shop/ordersSlice';
import { clearCart } from '../../features/cart/cartSlice';
import { useDispatch } from 'react-redux';

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const order: CreateOrder = location.state;

  const totalPrice = order.itemsPrice + order.shippingPrice;

  const [addNewOrder, { isSuccess, isError, error }] =
    useAddNewOrderMutation();

  const handleSubmitOrder = async (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(order);
    try {
      const newOrder = await addNewOrder(order).unwrap();
      alert('Order created successfully!');
      console.log(newOrder);
      dispatch(clearCart());
    } catch (err) {
      console.error('failed to create order', err)
    }
  };

  const navigateBack = () => {
    navigate(-1);
  }

  return (
    <>
      <article className="shipping">
        <header>
          <h2>Order Summary</h2>
        </header>
        <main>
          <div>
            <h3>Shipping Address</h3>
            <p>{order.shippingAddress.address}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.postalCode}
            </p>
            <p>{order.shippingAddress.country}</p>
          </div>

          <div>
            <h3>Products</h3>
            <ul>
              {order.products.map((product) => (
                <li key={product.product}>
                  {product.name}, qty: {product.quantity}, ${product.price}{' '}
                  each, total: {eurFormat(product.price * product.quantity)}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Order Summary</h3>
            <p>Items Price: {eurFormat(order.itemsPrice)}</p>
            <p>Shipping Price: {eurFormat(order.shippingPrice)}</p>
            <p>
              Total Price Without Tax: {eurFormat(countTaxFree(totalPrice))}
            </p>
            <p>Total Price: {eurFormat(totalPrice)}</p>
          </div>

          <div className="buttons-box">
            <button className="btn back-btn" onClick={navigateBack}>Back to Address</button>
            <button className="btn save-btn" onClick={handleSubmitOrder}>Confirm Order</button>
          </div>
          {isSuccess && <p>Order created successfully!</p>}
          {isError && <p>Error: {error.toString()}</p>}
        </main>
      </article>
    </>
  );
};

export default OrderSummary;
