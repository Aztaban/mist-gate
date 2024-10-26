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
  }

  return (
    <article>
      <header>
        <h2>Order Details</h2>
      </header>
      <main>
        <h3>Order No: {order.orderNo}</h3>
        <p>Created on: {new Date(order.created_at).toLocaleDateString()}</p>
        <p>Order status: {order.status}</p>
        <p>Paid status: {order.isPaid ? "Paid" : "Not Paid"}</p>
        <div>
          <h3>Products</h3>
          <ul>
            {order.products.map((product) => (
              <li key={product.product}>
                {product.name}, qty: {product.quantity}, ${product.price} each,
                total: {eurFormat(product.price * product.quantity)}
              </li>
            ))}
          </ul>
          <div>
          <p>Items Price: {eurFormat(order.itemsPrice)}</p>
          <p>Shipping Price: {eurFormat(order.shippingPrice)}</p>
          <p>Price without Taxes: {eurFormat(countTaxFree(order.totalPrice))}</p>
          <p>Total Price: {eurFormat(order.totalPrice)}</p>
        </div>
        </div>
        <div>
          <h3>Address</h3>
          <p>{address}</p>
          <p>
            {city}, {postalCode}
          </p>
          <p>{country}</p>
        </div>

        <button className='btn back-btn' onClick={handleBackBtn}>Go Back</button>
      </main>
    </article>
  );
};

export default SingleOrderPage;
