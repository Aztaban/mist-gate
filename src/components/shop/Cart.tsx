import { useDispatch, useSelector } from 'react-redux';
import { useState, ReactElement } from 'react';
import CartLineItem from './CartLineItem';
import { clearCart, selectCartItems } from '../../features/cart/cartSlice';

const Cart = (): ReactElement => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCartItems);

  const [confirm, setConfirm] = useState(false);

  const totalItems = cart.reduce((total, item) => total + item.qty, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
  const priceTaxFree = totalPrice / 1.21;

  const onSubmitOrder = () => {
    dispatch(clearCart());
    setConfirm(true);
  };

  const onClearClicked = () => {
    dispatch(clearCart())
  }

  const pageContent = confirm ? (
    <h2>Thank you for your order.</h2>
  ) : (
    <>
      <h2>Cart</h2>
      <ul className="cart">
        {cart.map((item) => {
          return <CartLineItem key={item.id} item={item} />;
        })}
      </ul>
      <div className="cart__tools">
        <p>Total Items: {totalItems}</p>
        <p>Without Tax: {priceTaxFree}</p>
        <p>Total Price: {totalPrice}</p>
        <button
          className="cart__submit"
          disabled={!totalItems}
          onClick={onSubmitOrder}
        >
          Place Order
        </button>
        <button onClick={onClearClicked}>
          Clear Cart
        </button>
      </div>
    </>
  );

  const content = (
    <>
      <section className="cart__main">{pageContent}</section>
    </>
  );

  return content;
};

export default Cart;
