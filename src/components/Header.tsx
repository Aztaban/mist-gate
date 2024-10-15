import Nav from './Nav';
import CartButton from './shop/CartButton';

const Header = () => {
  return (
    <header>
      <h1>Mist Gate</h1>
      <Nav />
        <CartButton></CartButton>
    </header>
  );
};

export default Header;
