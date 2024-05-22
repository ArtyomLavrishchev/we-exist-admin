import { Card } from 'antd';
import { useSelector } from 'react-redux';
import { AccTable } from 'widgets/AccTable';
import { getIsAdmin } from 'entities/LoginCard';
import { accountsColumns } from 'shared/constants/columns';
import { getAccounts, getAccountsLoading } from 'entities/Accounts';

export const Accounts = () => {
  const isAdmin = useSelector(getIsAdmin);
  const accounts = useSelector(getAccounts)?.data;
  const isLoading = useSelector(getAccountsLoading);

  if (!isAdmin) {
    return (
      <Card bordered>
        Для просмотра информации о пользователях необходима роль администратора
      </Card>
    );
  }

  return (
    <AccTable
      options={accounts ?? []}
      columns={accountsColumns}
      isLoading={isLoading}
    />
  );
};
