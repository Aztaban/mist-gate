import { ReactElement } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

interface RequiredAuthProps {
  allowedRoles: number[]
}

const RequireAuth: React.FC<RequiredAuthProps> = ({ allowedRoles }): ReactElement => {
  const location = useLocation();
  const { roles } = useAuth();

  const content = roles.some((role) => allowedRoles.includes(role)) ? (
    <Outlet /> 
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );

  return content;
}

export default RequireAuth;