import { NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Nav = () => {
  const { isLogedIn } = useAuth();


  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" end>Home</NavLink>
        </li>
        <li>
          <NavLink to="/posts">news</NavLink>
        </li>
        <li>
          <NavLink to="about">About</NavLink>
        </li>
        <li>
          <NavLink to="shop">Shop</NavLink>
        </li>
        {isLogedIn ? (
          <li>
            <NavLink to="account">Account</NavLink>
          </li>
        ) : (
          <li>
            <NavLink to="login">Login</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
