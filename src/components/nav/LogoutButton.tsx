import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons/faRightFromBracket';
import { useLogout } from '@hooks/api/useLogout';

const LogoutButton = () => {
const { logout } = useLogout()

  return (
    <button className='logout__icon' data-count={0} onClick={logout}>
        <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );
};

export default LogoutButton;
