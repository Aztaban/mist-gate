import Nav from './nav/Nav';
import CartButton from './nav/CartButton';
import LogoutButton from './nav/LogoutButton';
import useAuth from '../hooks/useAuth';


const Header = () => {
  const { isAdmin } = useAuth();

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
      <CartButton></CartButton>
    </>
  );

  return <header>{headerContent}</header>;
};

export default Header;
