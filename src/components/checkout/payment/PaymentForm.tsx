import { useState, useEffect } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useMarkOrderPaidMutation } from '../../../features/shop/ordersApiSlice';

interface PaymentFormProps {
  orderId: string;
}

const PaymentForm = ({ orderId }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const [markOrderPaid] = useMarkOrderPaidMutation();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);
    setErrorMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
      redirect: 'if_required',
    });

    if (error) {
      console.error('Payment error:', error.message);
      setErrorMessage(error.message || 'Payment failed.');
      setIsLoading(false);
    } else if (paymentIntent?.status === 'succeeded') {
      console.log('Payment successful!');
      // Mark order as paid
      try {
        await markOrderPaid(orderId).unwrap();
        window.location.href = '/payment-success';
      } catch (err) {
        console.error('Error marking order as paid:', err);
        setErrorMessage('Failed to update order status.');
      }
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Pay'}
      </button>
    </form>
  );
};

export default PaymentForm;
