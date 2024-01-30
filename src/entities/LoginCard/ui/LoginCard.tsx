import { Card } from 'antd';
import { LoginForm } from 'features/LoginForm';
import { useAppDispatch } from 'shared/lib/hooks';
import { ILoginPayload, login } from 'entities/LoginCard';

export const LoginCard = () => {
  const dispatch = useAppDispatch();

  const onFinish = (payload: ILoginPayload) => {
    dispatch(login(payload));
  };

  return (
    <Card type="inner" bordered={false}>
      <LoginForm onSubmit={onFinish} />
    </Card>
  );
};
