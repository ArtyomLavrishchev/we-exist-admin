import { FC } from 'react';
import { Button, Form, Input } from 'antd';
import { IRegisterPayload } from 'entities/LoginCard';

import styles from './RegisterForm.module.scss';

interface IRegisterForm {
  onSubmit: (values: IRegisterPayload) => void;
}
export const RegisterForm: FC<IRegisterForm> = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const submitHandler = (values: IRegisterPayload) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Form
      name="basic"
      onFinish={submitHandler}
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
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Повторите пароль"
        name="passwordRepeat"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Обязательное поле',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('Введенные пароли не совпадают.')
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button data-testid="reg_btn" type="primary" htmlType="submit" block>
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
};
