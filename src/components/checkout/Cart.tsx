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
  const products = useSelector(selectCartItems);

  const totalItems = products.reduce((total, item) => total + item.quantity, 0);
  const itemsPrice = products.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const onSubmitOrder = () => {
    navigate('/shop/checkout/shipping', {
      state: { products, itemsPrice },
    });
  };

  const onClearClicked = () => {
    if (
      window.confirm('Are you sure you want to delete all items from a cart?')
    ) {
      dispatch(clearCart());
    }
  };

  const pageContent = (
    <>
      <h2>Cart</h2>
      {products.length ? (
        <>
          <ul className="cart">
            {products.map((item) => {
              return <CartLineItem key={item.product} item={item} />;
            })}
          </ul>
          <div className="cart__tools">
            <div className="cart__tools--item">
              <label>Total Items: </label>
              <p>{totalItems}</p>
            </div>
            <div className="cart__tools--item">
              <label>Without Tax: </label>
              <p>{eurFormat(countTaxFree(itemsPrice))}</p>
            </div>
            <div className="cart__tools--item">
              <label>Total Price: </label>
              <p>{eurFormat(itemsPrice)}</p>
            </div>
            <div className="cart__tools--item">
              <button className="btn del-btn" onClick={onClearClicked}>
                Clear Cart
              </button>
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
      ) : (
        <p>No Items in cart</p>
      )}
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
