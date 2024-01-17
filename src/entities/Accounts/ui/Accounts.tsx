import { useSelector } from 'react-redux';
import { AccTable } from 'widgets/AccTable';
import { accountsColumns } from 'shared/constants/columns';
import { getAccounts, getAccountsLoading } from 'entities/Accounts';

export const Accounts = () => {
  const accounts = useSelector(getAccounts);
  const isLoading = useSelector(getAccountsLoading);
  return (
    <AccTable
      options={accounts}
      columns={accountsColumns}
      isLoading={isLoading}
    />
  );
};
