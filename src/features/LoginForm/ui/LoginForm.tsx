import { FC } from 'react';
import { Button, Form, Input } from 'antd';
import { ILoginPayload } from 'entities/LoginCard';

import styles from './LoginForm.module.scss';

interface ILoginForm {
  onSubmit: (values: ILoginPayload) => void;
}
export const LoginForm: FC<ILoginForm> = ({ onSubmit }) => {
  return (
    <Form
      name="basic"
      onFinish={onSubmit}
      className={styles.container}
      layout="vertical"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Обязательное поле' },
          {
            pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gi,
            message: 'Некорректный email',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: 'Обязательное поле' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button className={styles.btn} data-testid="login_btn" type="primary" htmlType="submit" block>
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};
