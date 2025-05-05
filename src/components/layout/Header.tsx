import { useState, useRef, useEffect } from 'react';
import Nav from '../nav/Nav';
import CartButton from '../nav/CartButton';
import LogoutButton from '../nav/LogoutButton';
import useAuth from '@hooks/state/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const { isAdmin, isEditor, isLogedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isMenuOpen]);

  const headerContent = (
    <>
      <button className="hamburger" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <h1>{isAdmin || isEditor ? 'Mist Admin' : 'Mist Gate'}</h1>
      <Nav isMenuOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} ref={menuRef} />
      <div className="buttons-header">
        {!isAdmin && !isEditor ? <CartButton /> : null}
        {isLogedIn ? <LogoutButton /> : null}
      </div>
    </>
  );

  return <header>{headerContent}</header>;
};

export default Header;
