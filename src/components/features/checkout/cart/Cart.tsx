import { useSelector } from 'react-redux';
import { ReactElement } from 'react';
import CartLineItem from './CartLineItem';
import { selectCartItems, selectShippingMethod } from '@features/slices/checkoutSlice';
import { calculateOrderPrices } from '@utils';
import { NavLink, useNavigate } from 'react-router-dom';
import OrderPriceSummary from '../../orders/OrderPriceSummary';
import useAuth from '@hooks/state/useAuth';
import { useDispatch } from 'react-redux';
import { clearCart } from '@features/slices/checkoutSlice';

interface CartProps {
  onNext: () => void;
}

const Cart = ({ onNext }: CartProps): ReactElement => {
  const { isLogedIn } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(selectCartItems);
  const shippingMethod = useSelector(selectShippingMethod);
  const { itemsPrice, shippingPrice } = calculateOrderPrices(products, shippingMethod);

  const handleNext = () => {
    if (isLogedIn) {
      onNext();
    } else {
      navigate('/login');
    }
  };

  const handleClearCart = () => {
    if (!products.length) return;
    const ok = window.confirm('Clear your cart? This will remove all items.');
    if (ok) dispatch(clearCart());
  };

  const pageContent = (
    <section className="checkout page-stack">
      <header className="section-bar surface-dark">
        <h1 className="section-bar__title">1. Cart</h1>
      </header>
      <div className="stage cart">
        {products.length ? (
          <div className="checkout checkout-spaced">
            <ul className="cart-list">
              {products.map((item) => {
                return <CartLineItem key={item.product} item={item} />;
              })}
            </ul>

            <div className="cart-bottom section surface-dark">
              <OrderPriceSummary itemsPrice={itemsPrice} shippingPrice={shippingPrice} />
            </div>
          </div>
        ) : (
          <div className="section surface-dark">
            <p>No Items in cart</p>
            <p>
              Visit our <NavLink to="/shop">SHOP</NavLink>
            </p>
          </div>
        )}
        <div className="checkout-actions checkout-actions--split">
          <button className="btn btn--del" onClick={handleClearCart}>
            Clear Cart
          </button>
          <button className="btn btn--brand" onClick={handleNext} disabled={!products.length}>
            Continue to shipping
          </button>
        </div>
      </div>
    </section>
  );

  return pageContent;
};

export default Cart;
