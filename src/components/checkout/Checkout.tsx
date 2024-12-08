import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Cart from './Cart';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const { isLogedIn } = useAuth();
  const [step, setStep] = useState<number>(1);

  const handleNext = () => {
    if (!isLogedIn) navigate('/login');
    if (step < 3) setStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  return (
    <article className="checkout">
      <h2>
        {step}.{step === 1 && ' Cart'}
        {step === 2 && ' Address and Shipping'}
        {step === 3 && ' Order Summary'}
      </h2>

      {step === 1 && <Cart />}
      {step === 2 && <p>Shipping Address</p>}
      {step === 3 && <p>Order Confirmation</p>}

      <div className="checkout-buttons">
        <button
          className="btn save-btn"
          onClick={handlePrevious}
          disabled={step === 1}
        >
          Back
        </button>
        <button
          className="btn back-btn"
          onClick={handleNext}
          disabled={step === 3}
        >
          Next
        </button>
      </div>
    </article>
  );
};

export default Checkout;
