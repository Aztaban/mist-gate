import { Link } from "react-router-dom"

const Nav = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="about">About</Link></li>
        <li><Link to="shop">Shop</Link></li>
        <li><Link to="shop/cart">Cart</Link></li>
        <li><Link to="login">Login</Link></li>
        <li><Link to="account">Account</Link></li>
      </ul>
    </nav>
  )
}

export default Nav
