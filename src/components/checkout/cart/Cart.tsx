import { useSelector } from 'react-redux';
import { ReactElement } from 'react';
import CartLineItem from './CartLineItem';
import {
  selectCartItems,
  selectShippingMethod,
} from '../../../features/slices/checkoutSlice';
import { calculateOrderPrices } from '../../../utils/utils';
import { NavLink, useNavigate } from 'react-router-dom';
import OrderPriceSummary from '../../orders/OrderPriceSummary';
import useAuth from '../../../hooks/state/useAuth';

interface CartProps {
  onNext: () => void;
}

const Cart = ({ onNext }: CartProps): ReactElement => {
  const { isLogedIn } = useAuth();
  const navigate = useNavigate();
  const products = useSelector(selectCartItems);
  const shippingMethod = useSelector(selectShippingMethod);
  const { itemsPrice, shippingPrice } = calculateOrderPrices(
    products,
    shippingMethod
  );

  const handleNext = () => {
    if (isLogedIn) {
      onNext();
    } else {
      navigate('/login');
    }
  };

  const pageContent = (
    <>
      <h2>1. Cart</h2>
      {products.length ? (
        <div className="checkout checkout-spaced">
          <ul className="cart">
            {products.map((item) => {
              return <CartLineItem key={item.product} item={item} />;
            })}
          </ul>
          <div className="cart-bottom">
            <OrderPriceSummary
              itemsPrice={itemsPrice}
              shippingPrice={shippingPrice}
            />
          </div>
        </div>
      ) : (
        <div className="checkout checkout-spaced-se">
          <p>No Items in cart</p>
          <p>
            Visit our <NavLink to="/shop">SHOP</NavLink>
          </p>
        </div>
      )}
      <div className="checkout-buttons">
        <div></div>
        <button
          className="btn back-btn"
          onClick={handleNext}
          disabled={!products.length}
        >
          Continue to shipping
        </button>
      </div>
    </>
  );

  return pageContent;
};

export default Cart;
