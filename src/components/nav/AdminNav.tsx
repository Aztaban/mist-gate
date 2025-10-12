import { NavLink } from 'react-router-dom';

interface Props {
  username: string;
}

export default function AdminNav({ username }: Props) {
  return (
    <nav className="normal-menu">
      <ul className="nav-links">
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
        <li>
          <NavLink to="account">{username}</NavLink>
        </li>
      </ul>
    </nav>
  );
}
