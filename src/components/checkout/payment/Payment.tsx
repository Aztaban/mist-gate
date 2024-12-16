import { useParams } from 'react-router-dom';

const Payment = () => {
  const { orderId } = useParams();
  return (
    <div>
      <h2>PAYMENT</h2>
      OrderID: {orderId}
    </div>
  );
};

export default Payment;
