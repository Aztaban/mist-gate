import { NavLink } from 'react-router-dom';

interface Props {
  showInlineLogout: boolean;
  username?: string;
}

export default function UserNav({ showInlineLogout, username }: Props) {
  return (
    <nav className="normal-menu">
      <ul className="nav-links">
        <li>
          {showInlineLogout ? (
            <NavLink to="/account" end>
              {username}
            </NavLink>
          ) : (
            <NavLink to="/login" end>
              Login
            </NavLink>
          )}
        </li>
        <li>
          <NavLink to="/checkout" end>
            Cart
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
