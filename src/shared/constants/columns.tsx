import { format } from 'date-fns';
import { IAccount } from 'entities/Accounts';

import type { ColumnsType } from 'antd/es/table';

export const accountsColumns: ColumnsType<IAccount> = [
  {
    title: 'Username',
    dataIndex: 'username',
    sorter: {
      compare: (a, b) => a.username.localeCompare(b.username),
      multiple: 1,
    },
  },
  {
    title: 'Имя',
    dataIndex: 'first_name',
    sorter: {
      compare: (a, b) =>
        (a.first_name &&
          b.first_name &&
          a.first_name.localeCompare(b.first_name)) ||
        0,
      multiple: 2,
    },
  },
  {
    title: 'Email',
    dataIndex: 'email',
    sorter: {
      compare: (a, b) => a.email?.localeCompare(b.email || '') || 0,
      multiple: 3,
    },
  },
  {
    title: 'Телефон',
    dataIndex: 'phone',
    sorter: {
      compare: (a, b) => {
        if (a.phone && b.phone) {
          const numA = +a.phone.replace(/\D/g, '');
          const numB = +b.phone.replace(/\D/g, '');
          return numA - numB;
        }
        return -1;
      },
      multiple: 4,
    },
  },
  {
    title: 'Дата регистрации',
    dataIndex: 'created_at',
    render: (value: Date) => format(new Date(value), 'dd.MM.yyyy HH:MM'),
    sorter: {
      compare: (a, b) => {
        const aTime = new Date(a.created_at).getTime();
        const bTime = new Date(b.created_at).getTime();
        return aTime - bTime;
      },
      multiple: 5,
    },
  },
  {
    title: 'Роль',
    dataIndex: 'role',
    sorter: {
      compare: (a, b) =>
        a.legal_state && b.legal_state
          ? a.legal_state.localeCompare(b.legal_state)
          : 0,
      multiple: 6,
    },
  },
];
