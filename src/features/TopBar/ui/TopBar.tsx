import { FC } from 'react';
import { getItem } from 'shared/utils';
import { logout } from 'entities/LoginCard';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'shared/lib/hooks';
import { SelectInfo } from 'rc-menu/lib/interface';
import { Layout, Menu, MenuProps, Typography } from 'antd';

import styles from './TopBar.module.scss';

const { Text } = Typography;
const { Header } = Layout;

interface ITopBar {
  selectedKeys: string;
}

export const TopBar: FC<ITopBar> = ({ selectedKeys }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const items: MenuProps['items'] = [
    getItem('Главная', '/'),
    getItem('Личные данные', 'profile'),
    getItem('Выход', 'logout'),
  ];

  const handleSelect = (e: SelectInfo) => {
    if (e.key === 'logout') {
      dispatch(logout());
    } else {
      navigate(e.key);
    }
  };

  return (
    <Header className="header">
      <Text className={styles.headerText} strong>
        Geo MVP
      </Text>{' '}
      <Text className={styles.headerText}>Admin</Text>
      <Menu
        className={styles.menu}
        selectedKeys={[selectedKeys]}
        defaultSelectedKeys={[selectedKeys]}
        theme="dark"
        mode="horizontal"
        items={items}
        style={{ float: 'right', maxWidth: '250px' }}
        onSelect={handleSelect}
      />
    </Header>
  );
};
