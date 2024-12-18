import { useSelector } from 'react-redux';
import { ReactElement } from 'react';
import CartLineItem from './CartLineItem';
import {
  selectCartItems,
  selectShippingMethod,
} from '../../../features/checkout/checkoutSlice';
import { calculateOrderPrices } from '../../../utils/utils';
import { NavLink } from 'react-router-dom';
import OrderPriceSummary from '../../orders/OrderPriceSummary';

const Cart = (): ReactElement => {
  const products = useSelector(selectCartItems);
  const shippingMethod = useSelector(selectShippingMethod);
  const { itemsPrice, shippingPrice } = calculateOrderPrices(
    products,
    shippingMethod
  );

  const pageContent = (
    <>
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
    </>
  );

  return pageContent;
};

export default Cart;
