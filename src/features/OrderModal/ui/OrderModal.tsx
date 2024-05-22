import { Tooltip } from 'antd';
import { FC, useState } from 'react';
import { IOrder } from 'entities/Orders';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import EditModal from 'features/OrderModal/ui/EditModal/EditModal';
import DeleteModal from 'features/OrderModal/ui/DeleteModal/DeleteModal';

import s from './OrderModal.module.scss';

interface IOrderModal {
  order: IOrder;
}
export const OrderModal: FC<IOrderModal> = ({ order }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const editOpenHandler = () => {
    setIsEditOpen(true);
  };

  const deleteOpenHandler = () => {
    setIsDeleteOpen(true);
  };

  return (
    <>
      <div className={s.icons}>
        <Tooltip title="Редактировать">
          <EditTwoTone onClick={editOpenHandler} />
        </Tooltip>
        <Tooltip title="Удалить">
          <DeleteTwoTone onClick={deleteOpenHandler} twoToneColor="#ec4e4e" />
        </Tooltip>
      </div>
      <EditModal order={order} isOpen={isEditOpen} setIsOpen={setIsEditOpen} />
      <DeleteModal
        id={order?.id}
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
      />
    </>
  );
};
