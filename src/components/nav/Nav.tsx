import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useLogout } from '../../hooks/useLogout';

interface NavProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
}

const Nav = ({ isMenuOpen, closeMenu }: NavProps) => {
  const { logout } = useLogout();
  const { isLogedIn, isAdmin } = useAuth();

  const handleMenuClick = () => {
    if (isMenuOpen) {
      closeMenu();
    }
  };

  const userNavListItems = (
    <>
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
    </>
  );

  const adminNavListItems = (
    <>
      <li>
        <NavLink to="admin" end>
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to="posts" end>
          News
        </NavLink>
      </li>
      <li>
        <NavLink to="/admin/products" end>
          Products
        </NavLink>
      </li>
      <li>
        <NavLink to="/admin/orders" end>
          Orders
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className={isMenuOpen ? "dropdown-menu" : "normal-menu"}>
      <ul className={isMenuOpen ? "nav-links" : ""} onClick={handleMenuClick}>
        {isAdmin ? adminNavListItems : userNavListItems}
        {isMenuOpen && isLogedIn ? (<li onClick={logout}>Logout</li>) : null}
      </ul>
    </nav>
  );
};

export default Nav;
