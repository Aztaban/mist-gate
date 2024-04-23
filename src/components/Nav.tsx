import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Nav = () => {
  const { isLogedIn } = useAuth();


  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="about">About</Link>
        </li>
        <li>
          <Link to="shop">Shop</Link>
        </li>
        <li>
          <Link to="shop/cart">Cart</Link>
        </li>
        {isLogedIn ? (
          <li>
            <Link to="account">Account</Link>
          </li>
        ) : (
          <li>
            <Link to="login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
