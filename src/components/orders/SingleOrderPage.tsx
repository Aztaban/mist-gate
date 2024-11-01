import { useParams, useNavigate } from 'react-router-dom';
import { useState, ChangeEvent } from 'react';
import {
  useGetOrderByIdQuery,
  useUpdateOrderShippingMutation,
  useUpdateOrderStatusMutation,
} from '../../features/shop/ordersApiSlice';
import useAuth from '../../hooks/useAuth';
import { OrderStatus } from '../../config/orderStatus';
import { ShippingMethod } from '../../config/shippingConfig';
import OrderProducts from './OrderProducts';
import OrderPriceSummary from './OrderPriceSummary';
import Address from './Address';

const SingleOrderPage = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { orderId } = useParams<{ orderId: string }>();
  const {
    data: order,
    isLoading,
    isError,
  } = useGetOrderByIdQuery(orderId ? orderId : '');
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [updateOrderShipping] = useUpdateOrderShippingMutation();
  const [status, setStatus] = useState<OrderStatus | ''>(order?.status || '');
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod | ''>(
    order?.shippingMethod || ''
  );

  if (isLoading) return <p>Loading Order...</p>;
  if (isError || !order) return <p>Order not found.</p>;

  const handleBackBtn = () => {
    navigate(-1);
  };

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as OrderStatus);
  };

  const handleShippingMethodChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setShippingMethod(e.target.value as ShippingMethod);
  };

  const handleStatusSave = async () => {
    try {
      if (orderId && status && status != order.status) {
        await updateOrderStatus({ orderId, status }).unwrap();
      }

      if (orderId && shippingMethod && shippingMethod != order.shippingMethod) {
        await updateOrderShipping({ orderId, shippingMethod }).unwrap();
      }

      alert('Order status has been updated successfully');
    } catch (error) {
      alert('Failed to update order status');
    }
  };

  return (
    <article className="order">
      <h2 className="orders-header">Order Details</h2>
      <main>
        <h3>Order No: {order.orderNo}</h3>
        <div className="order-field">
          <p>Created on:</p>
          <p>{new Date(order.created_at).toLocaleDateString()}</p>
          <p>Order status:</p>
          <p>{order.status.toUpperCase()}</p>
          <p>Shipping Method:</p>
          <p>
            {order.shippingMethod
              ? order.shippingMethod.toUpperCase()
              : 'NO DATA'}
          </p>
          <p>Paid status:</p>
          <p
            className={
              order.isPaid ? 'order-status.paid' : 'order-status.not-paid'
            }
          >
            {order.isPaid ? 'Paid' : 'Not Paid'}
          </p>
        </div>
        <h3>Order Details</h3>

        <OrderProducts products={order.products} />
        <OrderPriceSummary
          itemsPrice={order.itemsPrice}
          shippingPrice={order.shippingPrice}
          totalPrice={order.totalPrice}
        />
        <Address address={order.shippingAddress} />

        {/* Admin-only tools */}
        {isAdmin && (
          <section className="admin-tools">
            <h3>Admin Tools</h3>

            <div>
              <label htmlFor="status">Update Status:</label>
              <select id="status" value={status} onChange={handleStatusChange}>
                {Object.values(OrderStatus).map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="shippingMethod">Update Shipping Method:</label>
              <select
                id="shippingMethod"
                value={shippingMethod}
                onChange={handleShippingMethodChange}
              >
                {Object.values(ShippingMethod).map((method) => (
                  <option key={method} value={method}>
                    {method.charAt(0).toUpperCase() + method.slice(1)} Shipping
                  </option>
                ))}
              </select>
            </div>

            <button onClick={handleStatusSave}>Save Changes</button>
          </section>
        )}
      </main>
      <div className="buttons-box">
        <button className="btn back-btn" onClick={handleBackBtn}>
          Go Back
        </button>
      </div>
    </article>
  );
};

export default SingleOrderPage;
