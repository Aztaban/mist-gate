import { useParams, useNavigate } from 'react-router-dom';
import { useGetOrderByIdQuery } from '../../features/shop/ordersSlice';
import { eurFormat, countTaxFree } from '../../utils/utils';

const SingleOrderPage = () => {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const {
    data: order,
    isLoading,
    isError,
  } = useGetOrderByIdQuery(orderId ? orderId : '');

  if (isLoading) return <p>Loading Order...</p>;
  if (isError || !order) return <p>Order not found.</p>;

  const { address, city, postalCode, country } = order.shippingAddress;

  const handleBackBtn = () => {
    navigate(-1);
  };

  return (
    <article className="order">
      <header className="orders-header">
        <h2>Order Details</h2>
      </header>
      <main>
        <h3>Order No: {order.orderNo}</h3>
        <div className="order-field">
          <p>Created on:</p>
          <p>{new Date(order.created_at).toLocaleDateString()}</p>
          <p>Order status:</p>
          <p>{order.status.toUpperCase()}</p>
          <p>Shipping Method:</p>
          <p>{order.shippingMethod ? order.shippingMethod : 'No data'}</p>
          <p>Paid status:</p>
          <p>{order.isPaid ? 'Paid' : 'Not Paid'}</p>
        </div>
        <div className="order-products">
          <h3>Products</h3>
          <ul>
            {order.products.map((product) => (
              <li key={product.product}>
                {product.name}, qty: {product.quantity}, ${product.price} each,
                total: {eurFormat(product.price * product.quantity)}
              </li>
            ))}
          </ul>
          <div className="order-field">
            <p>Items Price:</p>
            <p>{eurFormat(order.itemsPrice)}</p>
            <p>Shipping Price:</p>
            <p>{eurFormat(order.shippingPrice)}</p>
            <p>Price without Taxes:</p>
            <p>{eurFormat(countTaxFree(order.totalPrice))}</p>
            <p>Total Price:</p>
            <p>{eurFormat(order.totalPrice)}</p>
          </div>
        </div>
        <div>
          <h3>Address</h3>
          <div className="order-field">
              <p>Address:</p><p>{address}</p>
              <p>City, postal code:</p><p>{city}, {postalCode}</p>
              <p>Country: </p><p>{country}</p>

          </div>
        </div>

        <button className="btn back-btn" onClick={handleBackBtn}>
          Go Back
        </button>
      </main>
    </article>
  );
};

export default SingleOrderPage;
