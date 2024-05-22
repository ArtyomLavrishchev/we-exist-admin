import { FC, memo } from 'react';
import { Modal, Typography } from 'antd';
import { deleteOrder } from 'entities/Orders';
import { useAppDispatch } from 'shared/lib/hooks';

import s from './DeleteModal.module.scss';

const { Text } = Typography;

interface IDeleteModal {
  id: number;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const DeleteModal: FC<IDeleteModal> = ({ id, isOpen, setIsOpen }) => {
  const dispatch = useAppDispatch();

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleOk = () => {
    dispatch(deleteOrder(id));
    handleCancel();
  };

  return (
    <Modal
      open={isOpen}
      onOk={handleOk}
      className={s.container}
      onCancel={handleCancel}
      title="Удаление заявки"
      okText="Удалить"
      cancelText="Отмена"
    >
      <div className={s.body}>
        <Text>Вы уверены, что хотите удалить заявку?</Text>
      </div>
    </Modal>
  );
};

export default memo(DeleteModal);
