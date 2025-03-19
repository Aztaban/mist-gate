import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'; // from
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import { useCreatePaymentIntentMutation } from '@features/apiSlices/ordersApiSlice';

/* const stripePromise = loadStripe(
  'pk_test_51QWjvXCZIku0UrWjZPigapLxS1RnTRWA1SbAxN9V1jYYoHx6jRvqQSRe2bclRlp8qlOIWfNk6v64iBSHe5F5Ee3500PdYicYji'
); */

const Payment = () => {
  const { orderId } = useParams();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();

  const [clientSecret, setClientSecret] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!orderId) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const response = await createPaymentIntent(orderId).unwrap();
        setClientSecret(response.clientSecret);
      } catch (error: any) {
        console.error('Error fetching payment intent:', error);
        setErrorMessage(error.data.error || 'An unexpected error occurred');
      }
    };

    fetchPaymentIntent();
  }, [orderId, createPaymentIntent]);

  if (!stripePromise) return <div>Loading...</div>;

  const stripeOptions: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
    loader: 'auto',
  };

  return (
    <article>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={stripeOptions}>
          <PaymentForm orderId={orderId} />
        </Elements>
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <div>Loading payment details...</div>
      )}
    </article>
  );
};

export default Payment;
