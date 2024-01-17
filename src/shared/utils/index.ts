import { Key, ReactNode } from 'react';

import type { MenuProps } from 'antd';

export type MenuItem = Required<MenuProps>['items'][number];

export function getItem(
  label: ReactNode,
  key: Key,
  icon?: ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export const getDefaultSelectedKeys = (
  status: string | null,
  path: string
): string => {
  if (status) return status;
  const pathItems = path.split('/');
  return pathItems[pathItems.length - 1] || '/';
};

export const getDefaultOpenKeys = (path: string): string => {
  const pathItems = path.replace(/\//g, ' ').trim().split(' ');
  return pathItems[0];
};
