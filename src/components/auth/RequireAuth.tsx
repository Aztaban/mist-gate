import { ReactElement, useEffect, useState } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../features/auth/authSlice';

interface RequiredAuthProps {
  allowedRoles: number[];
}

const RequireAuth: React.FC<RequiredAuthProps> = ({
  allowedRoles,
}): ReactElement => {
  const location = useLocation();
  const { roles } = useAuth();
  const token = useSelector(selectCurrentToken);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token exists and if allowedRoles include user's roles
    if (token && roles.some((role) => allowedRoles.includes(role))) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [token, roles, allowedRoles]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // If token doesn't exist, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If user doesn't have required roles, redirect to login with from location
  const content = roles.some((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );

  return content;
};

export default RequireAuth;
