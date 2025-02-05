import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAccount } from 'wagmi';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isConnected } = useAccount();
  const location = useLocation();

  if (!isConnected) {
    // 将用户重定向到403页面，并保存原始目标路径
    return <Navigate to="/notConnected" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;