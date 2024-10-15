import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons/faRightFromBracket';
import { useSendLogoutMutation } from '../../features/auth/authApiSlice';
import { setPersistState } from '../../utils/utils';


const LogoutButton = () => {
  const [sendLogout] = useSendLogoutMutation();

  const onClickLogout = () => {
    if (window.confirm('Are you sure you want log out?')) {
      setPersistState(false);
      sendLogout();
      document.cookie =
        'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost:5173; secure; HttpOnly';
      window.location.href = '/login';
    }
  };

  return (
    <button className='cart__btn' data-count={0} onClick={onClickLogout}>
        <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );
};

export default LogoutButton;
