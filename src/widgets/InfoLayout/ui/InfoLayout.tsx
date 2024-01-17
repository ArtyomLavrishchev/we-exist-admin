import { FC, ReactNode } from 'react';
import { Card, Typography } from 'antd';

import styles from './InfoLayout.module.scss';

const { Text } = Typography;

interface IInfoLayout {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
  map: Record<string, string | boolean | null>;
  format: { [key: string]: (value: string) => string };
  title: ReactNode;
}

export const InfoLayout: FC<IInfoLayout> = ({ data, map, format, title }) => {
  return (
    <Card
      title={title}
      bordered={false}
      className={styles.container}
      headStyle={{ fontSize: '24px' }}
    >
      <div className={styles.profileItems}>
        {Object.keys(map).map(
          (key) =>
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            data &&
            data[key] && (
              <div key={key} className={styles.item}>
                <Text type="secondary">{map[key]}:</Text>
                <Text>
                  {!format[key]
                    ? data[key]
                    : format[key]((data[key] || '') as string)}
                </Text>
              </div>
            )
        )}
      </div>
    </Card>
  );
};
