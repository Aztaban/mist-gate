import { useLocation, useNavigate } from 'react-router-dom';
import { CreateOrder } from '../../features/shop/ordersSlice';
import { eurFormat, countTaxFree } from '../../utils/utils';

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order: CreateOrder = location.state;

  const totalPrice = order.itemsPrice + order.shippingPrice;

  const handleSubmitOrder = () => {

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
                <li key={product.id}>
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
            <button className="btn save-btn">Confirm Order</button>
          </div>
        </main>
      </article>
    </>
  );
};

export default OrderSummary;
