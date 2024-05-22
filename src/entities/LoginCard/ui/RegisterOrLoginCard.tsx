import { Card } from 'antd';
import { LoginForm } from 'features/LoginForm';
import { useAppDispatch } from 'shared/lib/hooks';
import {
  ILoginPayload,
  IRegisterPayload,
  register,
  login,
} from 'entities/LoginCard';
import { useState } from 'react';
import { RegisterForm } from 'features/RegisterForm';

import s from './RegisterOrLoginCard.module.scss';

const tabList = [
  {
    key: 'login',
    label: 'Вход',
  },
  {
    key: 'register',
    label: 'Регистрация',
  },
];

export const RegisterOrLoginCard = () => {
  const dispatch = useAppDispatch();
  const [activeTabKey, setActiveTabKey] = useState('login');

  const onLogin = (payload: ILoginPayload) => {
    dispatch(login(payload));
  };

  const onRegister = (payload: IRegisterPayload) => {
    dispatch(register(payload)).then(() => setActiveTabKey('login'));
  };

  return (
    <Card
      className={s.container}
      type="inner"
      bordered={false}
      tabList={tabList}
      activeTabKey={activeTabKey}
      onTabChange={setActiveTabKey}
      tabProps={{
        size: 'middle',
      }}
    >
      {activeTabKey === 'login' ? (
        <LoginForm onSubmit={onLogin} />
      ) : (
        <RegisterForm onSubmit={onRegister} />
      )}
    </Card>
  );
};
