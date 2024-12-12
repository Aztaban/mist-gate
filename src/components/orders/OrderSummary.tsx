interface OrderSummaryProps {
  order: any;
}

const OrderSummary = ({ order }: OrderSummaryProps) => {
  return (
    <div className="cart-summary">
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
  );
};

export default OrderSummary;