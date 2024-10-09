import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

interface CartButtonProps {
  cartItemCount: number;
}

const CartButton = ({ cartItemCount }: CartButtonProps) => {
  return (
    <Link to="/shop/cart" className="cart__link">
      <span className="cart__btn" data-count={cartItemCount}>
        <FontAwesomeIcon icon={faShoppingCart} />
      </span>
    </Link>
  );
};

export default CartButton;