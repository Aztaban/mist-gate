import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../features/slices/checkoutSlice';

const CartButton = () => {
  const cartItems = useSelector(selectCartItems);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link to="/checkout" className="cart__link">
      <span className="cart__btn" data-count={totalQuantity}>
        <FontAwesomeIcon icon={faShoppingCart} />
      </span>
    </Link>
  );
};

export default CartButton;
