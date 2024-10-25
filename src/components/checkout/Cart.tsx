import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ReactElement } from 'react';
import CartLineItem from './CartLineItem';
import { clearCart, selectCartItems } from '../../features/cart/cartSlice';
import { eurFormat } from '../../utils/utils';
import { countTaxFree } from '../../utils/utils';

const Cart = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(selectCartItems);

  const totalItems = cart.reduce((total, item) => total + item.qty, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const onSubmitOrder = () => {
     navigate('checkout/shipping')
  };

  const onClearClicked = () => {
    if (window.confirm("Are you sure you want to delete all items from a cart?")){
      dispatch(clearCart());
    } 
  };

  const pageContent = (
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
          <p>{eurFormat(countTaxFree(totalPrice))}</p>
        </div>
        <div className="cart__tools--item">
          <label>Total Price: </label>
          <p>{eurFormat(totalPrice)}</p>
        </div>
        <div className="cart__tools--item">
          <button className='btn del-btn' onClick={onClearClicked}>Clear Cart</button>
          <button
            className="cart__submit btn .save-btn"
            disabled={!totalItems}
            onClick={onSubmitOrder}
          >
            Continue to shipping
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
