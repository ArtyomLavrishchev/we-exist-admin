import { Card } from 'antd';
import { LoginForm } from 'features/LoginForm';
import { useAppDispatch } from 'shared/lib/hooks';
import { ILoginPayload, registerOrLogin } from 'entities/LoginCard';

export const LoginCard = () => {
  const dispatch = useAppDispatch();

  const onFinish = ({ phone }: ILoginPayload) => {
    const payload = { phone: `7${phone.replace(/^(\+7|7|8)(\d)/gi, '$2')}` };
    dispatch(registerOrLogin(payload));
  };

  return (
    <Card type="inner" bordered={false}>
      <LoginForm onSubmit={onFinish} />
    </Card>
  );
};
