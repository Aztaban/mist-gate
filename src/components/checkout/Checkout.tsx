import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Cart from './Cart';
import ShippingAndAddress from './ShippingAndAddress';
import OrderSummary from './OrderSummary';
import { useAddNewOrderMutation } from '../../features/shop/ordersApiSlice';
import { CreateOrder } from '../../features/shop/ordersApiSlice';
import { selectCreateOrder } from '../../features/cart/cartSlice';
import { useSelector } from 'react-redux';

const Checkout = () => {
  const navigate = useNavigate();
  const { isLogedIn } = useAuth();
  const [step, setStep] = useState<number>(1);
  const [newOrder, setNewOrder] = useState<CreateOrder | null>(null);
  //const [createOrderMutation] = useAddNewOrderMutation();

  const order = useSelector(selectCreateOrder);

  const steps = [
    { title: 'Cart', content: <Cart />, button: 'Continue to address' },
    {
      title: 'Address and Shipping',
      content: <ShippingAndAddress/>,
      button: 'Order Summary',
    },
    {
      title: 'Order Summary',
      content: newOrder ? <OrderSummary order={newOrder}/> : null,
      button: 'Confirm Order',
    },
  ];

  const handleNext = () => {
    if (!isLogedIn) navigate('/login');
    if (step === 2 && order) {
      setNewOrder(order);
      setStep((prev) => prev + 1);
    } else if (step < steps.length) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const currentStep = steps[step - 1];

  return (
    <article className="checkout">
      <h2>
        {step}. {currentStep.title}
      </h2>
      {currentStep.content}
      <div className="checkout-buttons">
        {step > 1 ? (
          <button
            className="btn save-btn"
            onClick={handlePrevious}
            disabled={step === 1}
          >
            Back
          </button>
        ) : (
          <div></div>
        )}
        <button
          className="btn back-btn"
          onClick={handleNext}
          disabled={step === 3 || (step === 2 && !order)}
        >
          {currentStep.button}
        </button>
      </div>
    </article>
  );
};

export default Checkout;
