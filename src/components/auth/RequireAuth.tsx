import { ReactElement } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../features/slices/authSlice';

interface RequiredAuthProps {
  allowedRoles: number[];
}

const RequireAuth: React.FC<RequiredAuthProps> = ({
  allowedRoles,
}): ReactElement => {
  const location = useLocation();
  const { roles } = useAuth();
  const token = useSelector(selectCurrentToken);

  // If token doesn't exist, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If user doesn't have required roles, redirect to login with from location
  if (!roles.some((role) => allowedRoles.includes(role))) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
