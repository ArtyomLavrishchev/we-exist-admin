import { ReactNode } from 'react';
import { notification } from 'antd';
import { NotificationPlacement } from 'antd/es/notification/interface';

export const openNotification = (
  message: ReactNode,
  placement: NotificationPlacement,
  description?: ReactNode,
  type: keyof typeof notification = 'info'
): void => {
  notification[type]({
    message,
    description,
    placement,
  });
};
