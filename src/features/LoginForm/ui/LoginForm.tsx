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
        label="Телефон"
        name="phone"
        rules={[
          { required: true, message: 'Обязательное поле' },
          {
            pattern:
              /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/gi,
            message: 'Некорректный номер телефона',
          },
        ]}
      >
        <Input.Password maxLength={12} data-testid="pass" />
      </Form.Item>
      <Form.Item>
        <Button data-testid="login_btn" type="primary" htmlType="submit" block>
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};
