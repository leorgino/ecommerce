import React from 'react';
import { Navigate, Outlet} from 'react-router-dom';
import { useAuth } from '../AuthContext';

interface PrivateRouteProps {
  redirect: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ redirect }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to={redirect} />;
};

export default PrivateRoute;
