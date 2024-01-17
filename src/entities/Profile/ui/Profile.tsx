import { useSelector } from 'react-redux';
import { InfoLayout } from 'widgets/InfoLayout';
import { UserOutlined } from '@ant-design/icons';
import { getUserAccount } from 'entities/Accounts';
import styles from 'widgets/InfoLayout/ui/InfoLayout.module.scss';
import { accountMap, formatAccountValues } from 'shared/constants/profile';

export const Profile = () => {
  const userAccount = useSelector(getUserAccount);
  return userAccount ? (
    <InfoLayout
      data={userAccount}
      format={formatAccountValues}
      map={accountMap}
      title={
        <>
          <UserOutlined className={styles.icon} /> {userAccount.username}
        </>
      }
    />
  ) : null;
};
