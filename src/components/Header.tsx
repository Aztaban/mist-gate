import Nav from './Nav';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <header>
      <h1>Mist Gate</h1>
      <Nav />
      <Link to="shop/cart" className="cart-link">
      <span className="cart-btn" data-count="1">
          <FontAwesomeIcon icon={faShoppingCart} />
        </span>
      </Link>
    </header>
  );
};

export default Header;
