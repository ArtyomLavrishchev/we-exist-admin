import { FC } from 'react';
import { Select } from 'antd';
import { useAppDispatch } from 'shared/lib/hooks';
import { updateUserAccount } from 'entities/Accounts';
import { rolesOptions } from 'shared/constants/columns';

import s from './AccRoleSelect.module.scss';

interface IAccRoleSelect {
  selectedRoles: string[];
  id: string;
}

export const AccRoleSelect: FC<IAccRoleSelect> = ({ selectedRoles, id }) => {
  const dispatch = useAppDispatch();
  const handleChange = (value: string[]) => {
    dispatch(updateUserAccount({ roles: value, id }));
  };

  return (
    <Select
      className={s.select}
      mode="multiple"
      allowClear
      style={{ width: '100%' }}
      placeholder="Роли пользователя"
      defaultValue={selectedRoles}
      onChange={handleChange}
      options={rolesOptions}
    />
  );
};
