import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Nav = () => {
  const { isLogedIn, isAdmin } = useAuth();

  const basicNav = (
    <ul>
      <li>
        <NavLink to="/" end>
          Home
        </NavLink>
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
          <NavLink to={isAdmin ? 'admin' : 'account'}>
            {isAdmin ? 'Admin' : 'Account'}
          </NavLink>
        </li>
      ) : (
        <li>
          <NavLink to="login">Login</NavLink>
        </li>
      )}
    </ul>
  )

  const adminNav = (
    <ul>
      <li><NavLink to="admin">Dashboard</NavLink></li>
      <li><NavLink to="posts">News</NavLink></li>
      <li><NavLink to="/admin/products">Products</NavLink></li>
      <li><NavLink to="/admin/orders">Orders</NavLink></li>
    </ul>
  )

  return (
    <nav>{isAdmin ? adminNav : basicNav}</nav>
  )
};

export default Nav;
