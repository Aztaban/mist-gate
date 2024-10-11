import { useDispatch, useSelector } from 'react-redux';
import { useState, ReactElement } from 'react';
import CartLineItem from './CartLineItem';
import { clearCart, selectCartItems } from '../../features/cart/cartSlice';
import { eurFormat } from '../../utils/utils';

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
    dispatch(clearCart());
  };

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
        <div className="cart__tools--item">
          <label>Total Items: </label>
          <p>{totalItems}</p>
        </div>
        <div className="cart__tools--item">
          <label>Without Tax: </label>
          <p>{eurFormat(priceTaxFree)}</p>
        </div>
        <div className="cart__tools--item">
          <label>Total Price: </label>
          <p>{eurFormat(totalPrice)}</p>
        </div>
        <div className="cart__tools--item">
          <button onClick={onClearClicked}>Clear Cart</button>
          <button
            className="cart__submit"
            disabled={!totalItems}
            onClick={onSubmitOrder}
          >
            Place Order
          </button>
        </div>
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
