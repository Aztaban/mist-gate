import Nav from '../nav/Nav';
import CartButton from '../nav/CartButton';
import LogoutButton from '../nav/LogoutButton';
import useAuth from '../../hooks/useAuth';

const Header = () => {
  const { isAdmin, isLogedIn } = useAuth();

  const headerContent = isAdmin ? (
    <>
      <h1>Mist Admin</h1>
      <Nav />
      <LogoutButton />
    </>
  ) : (
    <>
      <h1>Mist Gate</h1>
      <Nav />
      <div style={{ display: 'flex', gap: '10px' }}>
        <CartButton></CartButton>
        {isLogedIn ? <LogoutButton /> : null}
      </div>
    </>
  );

  return <header>{headerContent}</header>;
};

export default Header;
