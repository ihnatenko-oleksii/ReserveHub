import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AccessDeniedPage from '../pages/AccessDeniedPage';

interface RoleRouteProps {
  allowedRoles: Array<'USER' | 'ADMIN'>;
}

const RoleRoute = ({ allowedRoles }: RoleRouteProps) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role)) return <AccessDeniedPage />;

  return <Outlet />;
};

export default RoleRoute;
