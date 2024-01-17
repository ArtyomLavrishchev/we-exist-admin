import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import { getAuthLoading, getIsAuth } from 'entities/LoginCard';

interface IProps {
  children: ReactNode;
}

export const ProtectedRoutes: FC<IProps> = ({ children }) => {
  const location = useLocation();
  const isAuth = useSelector(getIsAuth);
  const isLoading = useSelector(getAuthLoading);
  if (!isAuth && !isLoading) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <>{children}</>;
};
