import { Layout } from 'antd';
import { TopBar } from 'features/TopBar';
import { useSelector } from 'react-redux';
import { SideBar } from 'features/SideBar';
import { Spinner } from 'shared/ui/Spinner';
import { FC, useEffect, useState } from 'react';
import { BreadCrumb } from 'features/BreadCrumb';
import { ErrorBoundary } from 'pages/ErrorBoundary';
import { getAuthLoading } from 'entities/LoginCard';
import { getDefaultSelectedKeys } from 'shared/utils';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';

import styles from './Navigation.module.scss';

const { Content } = Layout;

export const Navigation: FC = () => {
  const isLoading = useSelector(getAuthLoading);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');
  const [selectedKeys, setSelectedKeys] = useState('');

  useEffect(() => {
    setSelectedKeys(getDefaultSelectedKeys(status, location.pathname));
  }, [location.pathname, status]);

  return isLoading ? (
    <Spinner />
  ) : (
    <Layout className={styles.container}>
      <TopBar selectedKeys={selectedKeys} />
      <Layout className={styles.main}>
        <SideBar selectedKeys={selectedKeys} />
        <Layout style={{ padding: '0 24px 24px' }}>
          <BreadCrumb />
          <Content className={styles.content}>
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
