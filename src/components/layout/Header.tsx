import LogoutButton from '../nav/LogoutButton';
import useAuth from '@hooks/state/useAuth';
import { NavLink } from 'react-router-dom';
import AdminNav from '../nav/AdminNav';
import UserNav from '../nav/UserNav';
import HeaderSearch from '../nav/HeaderSearch';

const Header = () => {
  const { isAdmin, isEditor, isLogedIn, username } = useAuth();
  const isAdminLike = isAdmin || isEditor;

  return (
    <header className="site-header full-bleed">
      <div className="site-header__inner container">
        <h1 className="logo">
          <NavLink to="shop" end>
            {isAdminLike ? 'Mist Admin' : 'Mist Gate'}
          </NavLink>
        </h1>

        {!isAdminLike ? <HeaderSearch className="site-header__search" /> : null}
        <div className="site-header__right">
          {isAdminLike ? (
            <AdminNav username={username} />
          ) : (
            <UserNav showInlineLogout={isLogedIn} username={username} />
          )}

          {isLogedIn && (
            <>
              <span className="site-header__divider" aria-hidden="true" />
              <LogoutButton />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
