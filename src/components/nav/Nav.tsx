import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useLogout } from '../../hooks/useLogout';
import { forwardRef } from 'react';

interface NavProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
}

const Nav = forwardRef<HTMLElement, NavProps>(({ isMenuOpen, closeMenu }, ref) => {
  const { logout } = useLogout();
  const { isLogedIn, isAdmin, username } = useAuth();

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
            {username}
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
    <nav ref={ref} className={isMenuOpen ? "dropdown-menu" : "normal-menu"}>
      <ul className={isMenuOpen ? "nav-links" : ""} onClick={handleMenuClick}>
        {isAdmin ? adminNavListItems : userNavListItems}
        {isMenuOpen && isLogedIn ? (<li className='black-and-gold-text' onClick={logout}>Logout</li>) : null}
      </ul>
    </nav>
  );
});

export default Nav;
