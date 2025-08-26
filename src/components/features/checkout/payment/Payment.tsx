// Payment.tsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { loadStripe, StripeElementsOptions, Stripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import { useCreatePaymentIntentMutation } from '@features/apiSlices/ordersApiSlice';

const STRIPE_ENABLED = import.meta.env.VITE_ENABLE_STRIPE === 'true' && !!import.meta.env.VITE_STRIPE_PK;

// Important: type this union so TS is happy even when disabled
const stripePromise: Promise<Stripe | null> | null = STRIPE_ENABLED
  ? loadStripe(import.meta.env.VITE_STRIPE_PK as string)
  : null;

export default function Payment() {
  const { orderId } = useParams();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [clientSecret, setClientSecret] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Hard exit early when disabled — safe to use this component anywhere
  if (!STRIPE_ENABLED) {
    return <p>Payments are currently disabled.</p>;
  }

  if (!orderId) return <div>Loading...</div>;

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const res = await createPaymentIntent(orderId).unwrap();
        setClientSecret(res.clientSecret);
      } catch (e: any) {
        setErrorMessage(e?.data?.error || 'An unexpected error occurred');
      }
    };
    fetchPaymentIntent();
  }, [orderId, createPaymentIntent]);

  // Don’t render <Elements> unless both are ready
  if (!stripePromise) return <div>Loading…</div>;

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: { theme: 'stripe' },
    loader: 'auto',
  };

  return (
    <article>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm orderId={orderId} />
        </Elements>
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <div>Loading payment details…</div>
      )}
    </article>
  );
}
