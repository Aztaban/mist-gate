import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { selectCurrentToken } from '../features/auth/authSlice';
import { jwtDecode } from 'jwt-decode';

interface AuthData {
  username: string;
  roles: number[];
  status: number;
  isEditor: boolean;
  isAdmin: boolean;
}

const useAuth = (): AuthData => {
  const token = useSelector((state: RootState) => selectCurrentToken(state));
  let isEditor: boolean = false;
  let isAdmin: boolean = false;
  let status = 1012;

  if (token) {
    const decoded: { UserInfo: { username: string; roles: number[] } } =
      jwtDecode(token);
    const { username, roles } = decoded.UserInfo;

    isEditor = roles.includes(3032);
    isAdmin = roles.includes(4042);

    if (isEditor) status = 3032;
    if (isAdmin) status = 4042;

    return { username, roles, status, isEditor, isAdmin };
  }

  return { username: '', roles: [], status, isEditor, isAdmin };
};

export default useAuth;
