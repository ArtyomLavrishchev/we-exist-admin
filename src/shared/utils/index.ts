import { Key, ReactNode } from 'react';
import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
) => {
  let timeout: TimeoutId;

  return (...args: Parameters<F>): Promise<ReturnType<F>> =>
    new Promise((resolve) => {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => resolve(func(...args)), waitFor);
    });
};

export const getChangedArray = (
  arr: string[],
  value: string,
  newValue: string,
  field: string
) => {
  if (value === newValue) {
    return arr.filter((el) => el !== field);
  }
  if (!arr.includes(field)) {
    return [...arr, field];
  }
  return arr;
};
