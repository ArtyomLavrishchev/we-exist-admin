import { Tag } from 'antd';
import { format } from 'date-fns';
import { IOrder } from 'entities/Orders';
import { IAccount } from 'entities/Accounts';
import { AccRoleSelect } from 'features/AccRoleSelect';

import type { ColumnsType } from 'antd/es/table';
import { OrderModal } from 'features/OrderModal';

const orderTypes = {
  FREE: 'БЕСПЛАТНЫЙ ВЫЗОВ',
  CALLBACK: 'ВЫЗОВ ПО ЗАПРОСУ',
  EDUCATION: 'ОБУЧЕНИЕ',
};

const orderStatuses = {
  NEW: 'новый',
  WORK: 'взят в работу оператором',
  PSYCHOLOGIST: 'назначен психолог',
  CANCELLED: 'отменен',
  EXECUTED: 'исполнен',
  DELETED: 'удален',
};

const statusColors = {
  NEW: 'green',
  WORK: 'cyan',
  PSYCHOLOGIST: 'blue',
  CANCELLED: 'purple',
  EXECUTED: 'gold',
  DELETED: 'red',
};

export const rolesOptions = [
  { label: 'Администратор', value: 'ADMIN' },
  { label: 'Менеджер', value: 'MANAGER' },
  { label: 'Пользователь', value: 'USER' },
  { label: 'Психолог', value: 'PSYCHOLOGIST' },
];

export const typesOptions = [
  { label: 'Бесплатный вызов', value: 'FREE' },
  { label: 'Вызов по запросу', value: 'CALLBACK' },
  { label: 'Обучение', value: 'EDUCATION' },
];

export const statusesOptions = [
  { label: 'Новый', value: 'NEW' },
  { label: 'Взят в работу оператором', value: 'WORK' },
  { label: 'Назначен психолог', value: 'PSYCHOLOGIST' },
  { label: 'Отменен', value: 'CANCELLED' },
  { label: 'Исполнен', value: 'EXECUTED' },
  { label: 'Удален', value: 'DELETED' },
];

export const accountsColumns: ColumnsType<IAccount> = [
  {
    title: 'Email',
    dataIndex: 'email',
    key: '1',
  },
  {
    title: 'Роли',
    dataIndex: 'operation',
    key: '2',
    render: (_, r) => <AccRoleSelect selectedRoles={r.roles} id={r.id} />,
    filters: [
      { text: 'Администратор', value: 'ADMIN' },
      { text: 'Менеджер', value: 'MANAGER' },
      { text: 'Пользователь', value: 'USER' },
      { text: 'Психолог', value: 'PSYCHOLOGIST' },
    ],
  },
  {
    title: 'Дата обновления',
    dataIndex: 'updatedAt',
    key: '3',
    render: (value: Date) => format(new Date(value), 'dd.MM.yyyy hh:mm'),
  },
];

export const ordersColumns: ColumnsType<IOrder> = [
  {
    title: 'Имя',
    dataIndex: 'name',
    key: '1',
  },
  {
    title: 'Телефон',
    dataIndex: 'phone',
    key: '2',
  },
  {
    title: 'Адрес',
    dataIndex: 'address',
    key: '3',
  },
  {
    title: 'Описание',
    dataIndex: 'description',
    key: '4',
  },
  {
    title: 'Статус',
    dataIndex: 'orderStatus',
    key: '5',
    render: (s: keyof typeof orderStatuses) => (
      <Tag color={statusColors[s]}>{orderStatuses[s].toUpperCase()}</Tag>
    ),
    filters: [
      { text: 'Новый', value: 'NEW' },
      { text: 'Взят в работу оператором', value: 'WORK' },
      { text: 'Назначен психолог', value: 'PSYCHOLOGIST' },
      { text: 'Отменен', value: 'CANCELLED' },
      { text: 'Исполнен', value: 'EXECUTED' },
      { text: 'Удален', value: 'DELETED' },
    ],
  },
  {
    title: 'Тип',
    dataIndex: 'orderType',
    key: '6',
    render: (value) => orderTypes[value as keyof typeof orderTypes],
    filters: [
      { text: 'Бесплатный вызов', value: 'FREE' },
      { text: 'Вызов по запросу', value: 'CALLBACK' },
      { text: 'Обучение', value: 'EDUCATION' },
    ],
  },
  {
    title: 'Дата создания',
    dataIndex: 'createdAt',
    key: '7',
    render: (value: Date) => format(new Date(value), 'dd.MM.yyyy'),
  },
  {
    title: 'Дата обновления',
    dataIndex: 'updatedAt',
    key: '8',
    render: (value: Date) => format(new Date(value), 'dd.MM.yyyy'),
  },
  {
    title: '',
    dataIndex: 'actions',
    key: '9',
    render: (_, r) => <OrderModal order={r} />,
  },
];
