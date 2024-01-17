import { ReactNode } from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useLocation, Link, useSearchParams } from 'react-router-dom';

import styles from './BreadCrumb.module.scss';

const breadcrumbMap: Record<string, string | ReactNode> = {
  accounts: 'Все пользователи',
  metrics: 'Продуктовые метрики',
  dynamic: 'Динамика прироста',
  profile: 'Личные данные',
};

export const BreadCrumb = () => {
  const { pathname, state } = useLocation() as {
    pathname: string;
    state: { from: string };
  };
  const pathNames = pathname.split('/').filter((item) => item);
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');
  const orderStatus: string = status ?? (state?.from ? state.from : '');
  return (
    <Breadcrumb className={styles.main}>
      {pathNames.length > 0 ? (
        <Breadcrumb.Item>
          <Link to="/">
            <HomeOutlined />
          </Link>
        </Breadcrumb.Item>
      ) : (
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
      )}
      {pathNames.map((name, index) => {
        const routeTo = `/${pathNames.slice(0, index + 1).join('/')}${
          state?.from ? `?status=${state?.from}` : ''
        }`;
        const isLast = index === pathNames.length - 1;
        return isLast ? (
          <Breadcrumb.Item key={name}>
            {breadcrumbMap[orderStatus ? `${name}_${orderStatus}` : name] ??
              name}
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item key={name}>
            <Link to={`${routeTo}`}>
              {breadcrumbMap[orderStatus ? `${name}_${orderStatus}` : name] ??
                name}
            </Link>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};
