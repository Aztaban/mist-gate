import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Cart from './Cart';
import ShippingAndAddress from './ShippingAndAddress';
import OrderSummary from './OrderSummary';
import OrderConfirmation from './OrderConfirmation';
import { useAddNewOrderMutation } from '../../features/shop/ordersApiSlice';
import { clearCart } from '../../features/checkout/checkoutSlice';
import { useDispatch } from 'react-redux';
import { useValidateOrder } from '../../hooks/useValidateOrder';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogedIn } = useAuth();
  const [step, setStep] = useState<number>(1);
  const [orderId, setOrderId] = useState<string>('test');
  const [validateAddress, setValidateAddress] = useState<boolean>(false);

  const [addNewOrderMutation] = useAddNewOrderMutation();
  const { isValid, isCart, orderData } = useValidateOrder();

  const steps = [
    { title: 'Cart', content: <Cart />, button: 'Continue to address' },
    {
      title: 'Address and Shipping',
      content: (
        <ShippingAndAddress
          validateFields={validateAddress}
          setValidateFields={setValidateAddress}
        />
      ),
      button: 'Order Summary',
    },
    {
      title: 'Order Summary',
      content: orderData ? <OrderSummary order={orderData} /> : null,
      button: 'Confirm Order',
    },
    {
      title: 'Payment',
      content: orderId ? <OrderConfirmation orderId={orderId} /> : null,
      button: 'Go to Payment',
    },
  ];

  const handleNext = async () => {
    if (!isLogedIn) navigate('/login');
    if (step === 2 && !validateAddress && !isValid) {
      setValidateAddress(true);
      return;
    }
    if (step === 3 && orderData) {
      try {
        const result = await addNewOrderMutation(orderData).unwrap();
        console.log(result);
        setOrderId(result);
        dispatch(clearCart())
      } catch {
        console.log('Order failed to create!');
        return;
      }
    }
    if (step === 4 && orderId) {
      navigate(`/checkout/payment/${orderId}`);
    }
    setStep((prev) => prev + 1);
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
        {1 < step && step < 4 ? (
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
          disabled={!isCart}
        >
          {currentStep.button}
        </button>
      </div>
    </article>
  );
};

export default Checkout;
