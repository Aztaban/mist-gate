import { useState } from 'react';
import Nav from '../nav/Nav';
import CartButton from '../nav/CartButton';
import LogoutButton from '../nav/LogoutButton';
import useAuth from '../../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const { isAdmin, isLogedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const headerContent = (
    <>
      <h1>{isAdmin ? 'Mist Admin' : 'Mist Gate'}</h1>
      {isMenuOpen ? <div></div> : null}
      <Nav isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
      <div className='buttons-header'>
        <CartButton />
        {isLogedIn ? <LogoutButton /> : null}
        <button className="hamburger" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
    </>
  );

  return <header>{headerContent}</header>;
};

export default Header;
