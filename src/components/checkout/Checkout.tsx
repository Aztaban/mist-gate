import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useSelector } from 'react-redux';
import { selectCartState } from '../../features/cart/cartSlice';
import Cart from './Cart';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const { isLogedIn } = useAuth();
  const cartState = useSelector(selectCartState);
  const [step, setStep] = useState<number>(1);

  const handleNext = () => {
    if (!isLogedIn) navigate('/login');
    if (step < 3) setStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  return (
    <article>
      <h2>Checkout</h2>
      <div>
        {step === 1 && <Cart products={cartState.cart} />}
        {step === 2 && <p>Shipping Address</p>}
        {step === 3 && <p>Order Confirmation</p>}
      </div>
      <div>
        <button onClick={handlePrevious} disabled={step === 1}>
          Back
        </button>
        <button onClick={handleNext} disabled={step === 3}>
          Next
        </button>
      </div>
    </article>
  );
};

export default Checkout;
