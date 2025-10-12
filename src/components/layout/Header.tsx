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
    <header>
      <h1>
        <NavLink to="shop" end>
          {isAdminLike ? 'Mist Admin' : 'Mist Gate'}
        </NavLink>
      </h1>

      {!isAdminLike ? <HeaderSearch /> : null}
      {isAdminLike ? <AdminNav username={username} /> : <UserNav showInlineLogout={isLogedIn} username={username} />}
      {isLogedIn ? <LogoutButton /> : null}
    </header>
  );
};

export default Header;
