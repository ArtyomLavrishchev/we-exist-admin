import { Menu } from 'antd';
import { FC, useState } from 'react';
import Sider from 'antd/es/layout/Sider';
import { SelectInfo } from 'rc-menu/lib/interface';
import { useLocation, useNavigate } from 'react-router-dom';
import { TeamOutlined, DashboardOutlined } from '@ant-design/icons';
import { getDefaultOpenKeys, getItem, MenuItem } from 'shared/utils';

const items: MenuItem[] = [
  getItem('Главная', '/', <DashboardOutlined />),
  getItem('Пользователи', 'accounts', <TeamOutlined />),
];

interface ISideBar {
  selectedKeys: string;
}

export const SideBar: FC<ISideBar> = ({ selectedKeys }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const toggleCollapsed = (value: boolean) => {
    setCollapsed(value);
  };
  const handleSelect = (e: SelectInfo) => {
    const pathname = [...e.keyPath].reverse().join('/');
    navigate(pathname);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapsed}
      theme="light"
    >
      <Menu
        selectedKeys={[selectedKeys]}
        defaultSelectedKeys={[selectedKeys]}
        defaultOpenKeys={[getDefaultOpenKeys(location.pathname)]}
        mode="inline"
        items={items}
        onSelect={handleSelect}
      />
    </Sider>
  );
};
