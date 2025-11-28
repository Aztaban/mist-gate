import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItemCount } from '@features/slices/checkoutSlice';

interface Props {
  showInlineLogout: boolean;
  username?: string;
}

export default function UserNav({ showInlineLogout, username }: Props) {
  const cartItemCount = useSelector(selectCartItemCount);

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
            {cartItemCount > 0 && (
              <span className="nav-badge" aria-label={`${cartItemCount} items in cart`}>
                {cartItemCount}
              </span>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
