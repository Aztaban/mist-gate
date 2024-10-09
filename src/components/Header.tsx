import Nav from './Nav';
import CartButton from './shop/CardButton';

const Header = () => {
  const cartItemCount = 1
  return (
    <header>
      <h1>Mist Gate</h1>
      <Nav />
        <CartButton cartItemCount={cartItemCount}></CartButton>
    </header>
  );
};

export default Header;
