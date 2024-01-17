import { IAccount } from 'entities/Accounts';
import { useLocation } from 'react-router-dom';
import { InfoLayout } from 'widgets/InfoLayout';
import { UserOutlined } from '@ant-design/icons';
import styles from 'widgets/InfoLayout/ui/InfoLayout.module.scss';
import { accountMap, formatAccountValues } from 'shared/constants/profile';

export const Account = () => {
  const { state } = useLocation() as { state: IAccount };
  return (
    <InfoLayout
      data={state}
      format={formatAccountValues}
      map={accountMap}
      title={
        <>
          <UserOutlined className={styles.icon} /> {state?.username}
        </>
      }
    />
  );
};
