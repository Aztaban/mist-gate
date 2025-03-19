import { useState } from 'react';
import Cart from './cart/Cart';
import ShippingAndAddress from './cart/ShippingAndAddress';
import OrderSummary from './cart/OrderSummary';
import OrderConfirmation from './cart/OrderConfirmation';

const Checkout = () => {
  const [step, setStep] = useState<number>(1);

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrevious = () => setStep((prev) => prev - 1);

  return (
    <article className="checkout-main">
      {step === 1 && <Cart onNext={handleNext} />}
      {step === 2 && <ShippingAndAddress onNext={handleNext} onPrevious={handlePrevious} />}
      {step === 3 && <OrderSummary onNext={handleNext} onPrevious={handlePrevious} />}
      {step === 4 && <OrderConfirmation />}
    </article>
  );
};

export default Checkout;
