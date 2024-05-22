import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getIsAuth, RegisterOrLoginCard } from 'entities/LoginCard';

import styles from './LoginPage.module.scss';

export const LoginPage: FC = () => {
  const isAuth = useSelector(getIsAuth);
  const location = useLocation();
  const { from } = location.state as { from: Location };
  const fromPage: string = from.pathname
    ? `${from.pathname}${from.search}`
    : '/';
  if (isAuth) {
    return <Navigate to={fromPage} />;
  }

  return (
    <div className={styles.main}>
      <RegisterOrLoginCard />
    </div>
  );
};
