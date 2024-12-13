import OrderLineItem from './OrderLineItem';
import { useGetOrdersForUserQuery } from '../../features/shop/ordersApiSlice';
const OrdersList = () => {
  const { data, refetch } = useGetOrdersForUserQuery();

  /*   useEffect(() => {
    refetch(); // Ensures data is up-to-date when navigating to Account
  }, [refetch]); */

  return (
    <ul className="checkout">
      <li className="order-line-header">
        <span>Date</span>
        <span>Order Number</span>
        <span className="text-right">Price</span>
        <span>Status</span>
      </li>
      {data && data.length > 0 ? (
        data.map((order) => <OrderLineItem key={order.id} order={order} />)
      ) : (
        <p>No order found.</p>
      )}
    </ul>
  );
};

export default OrdersList;
