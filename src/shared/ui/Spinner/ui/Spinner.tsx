import { Spin } from 'antd';

import styles from './Spinner.module.scss';

export const Spinner = () => {
  return (
    <div className={styles.container}>
      <Spin size="large" />
    </div>
  );
};
