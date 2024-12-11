import { useSelector } from 'react-redux';
import { ReactElement } from 'react';
import CartLineItem from './CartLineItem';
import { selectCartItems } from '../../features/checkout/checkoutSlice';
import { eurFormat, countTaxFree } from '../../utils/utils';
import { NavLink } from 'react-router-dom';

const Cart = (): ReactElement => {
  const products = useSelector(selectCartItems);

  const totalItems = products.reduce((total, item) => total + item.quantity, 0);
  const itemsPrice = products.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const pageContent = (
    <>
      {products.length ? (
        <>
          <ul className="cart">
            {products.map((item) => {
              return <CartLineItem key={item.product} item={item} />;
            })}
          </ul>
          <div className="cart-summary">
            <label>Total Items: </label>
            <p>{totalItems}</p>
            <label>Without Tax: </label>
            <p>{eurFormat(countTaxFree(itemsPrice))}</p>
            <label>Total Price: </label>
            <p>{eurFormat(itemsPrice)}</p>
          </div>
        </>
      ) : (
        <>
          <p>No Items in cart</p>
          <p>
            Visit our <NavLink to='/shop'>SHOP</NavLink>
          </p>
        </>
      )}
    </>
  );

  return <div className="checkout-main">{pageContent}</div>;
};

export default Cart;
