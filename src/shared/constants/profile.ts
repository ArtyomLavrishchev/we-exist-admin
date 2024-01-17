import { format } from 'date-fns';
import { IAccount } from 'entities/Accounts';

export const accountMap: Partial<IAccount> = {
  username: 'Пользователь',
  first_name: 'Имя',
  last_name: 'Фамилия',
  middle_name: 'Отчество',
  phone: 'Телефон',
  email: 'Email',
  company: 'Компания',
  inn: 'ИНН',
  created_at: 'Дата регистрации',
  active_from: 'Активен с',
  tariff: 'Тариф',
};

export const formatAccountValues: { [key: string]: (value: string) => string } =
  {
    created_at: (value: string) => format(new Date(value), 'dd.MM.yyyy HH:MM'),
    active_from: (value: string) => format(new Date(value), 'dd.MM.yyyy HH:MM'),
    phone: (value: string) => {
      const pattern =
        /(\+7|8)[\s(]?(\d{3})[\s)]?(\d{3})[\s-]?(\d{2})[\s-]?(\d{2})/g;
      return value.replace(pattern, '+7 ($2) $3-$4-$5');
    },
  };
