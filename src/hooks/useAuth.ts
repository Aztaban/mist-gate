import { useSelector } from 'react-redux';
import { RootState } from '../features/store';
import { selectCurrentToken } from '../features/slices/authSlice';
import { jwtDecode } from 'jwt-decode';

interface AuthData {
  username: string;
  roles: number[];
  status: number;
  isLogedIn: boolean;
  isEditor: boolean;
  isAdmin: boolean;
}

const useAuth = (): AuthData => {
  const token = useSelector((state: RootState) => selectCurrentToken(state));
  let isEditor: boolean = false;
  let isAdmin: boolean = false;
  let status = 1012;
  let isLogedIn = false;

  if (token) {
    const decoded: { UserInfo: { username: string; roles: number[] } } =
      jwtDecode(token);
    const { username, roles } = decoded.UserInfo;

    isEditor = roles.includes(3032);
    isAdmin = roles.includes(4042);

    isLogedIn = true;
    if (isEditor) status = 3032;
    if (isAdmin) status = 4042;

    return { username, roles, status, isLogedIn, isEditor, isAdmin };
  }

  return { username: '', roles: [], status, isLogedIn, isEditor, isAdmin };
};

export default useAuth;
