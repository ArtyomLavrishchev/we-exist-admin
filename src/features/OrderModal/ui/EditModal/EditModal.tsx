import { useSelector } from 'react-redux';
import { getChangedArray } from 'shared/utils';
import { useAppDispatch } from 'shared/lib/hooks';
import { Input, Modal, Select, Typography } from 'antd';
import { ChangeEvent, FC, memo, useEffect, useState } from 'react';
import { getOrdersLoading, IOrder, updateOrder } from 'entities/Orders';
import { statusesOptions, typesOptions } from 'shared/constants/columns';

import s from './EditModal.module.scss';

const { Text } = Typography;

interface IEditModal {
  order: IOrder | null;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const EditModal: FC<IEditModal> = ({ order, isOpen, setIsOpen }) => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getOrdersLoading);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [orderType, setOrderType] = useState('');
  const [description, setDescription] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [changeList, setChangeList] = useState<string[]>([]);

  useEffect(() => {
    if (order) {
      setName(order.name);
      setPhone(order.phone);
      setAddress(order.address);
      setOrderType(order.orderType);
      setOrderStatus(order.orderStatus);
      setDescription(order.description ?? '');
    }
  }, [order]);

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleOk = () => {
    if (order) {
      const obj = {
        name,
        phone,
        address,
        orderType,
        orderStatus,
        description,
      };
      const payload = (changeList as (keyof typeof obj)[]).reduce(
        (acc, el) => (obj[el] ? { ...acc, [el]: obj[el] } : acc),
        {}
      );
      dispatch(updateOrder({ ...payload, id: order.id }));
    }
    setChangeList([]);
    handleCancel();
  };
  const typeHandler = (value: string) => {
    setOrderType(value);
    setChangeList((arr) =>
      getChangedArray(arr, order?.orderType ?? '', value, 'orderType')
    );
  };

  const nameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setChangeList((arr) =>
      getChangedArray(arr, order?.name ?? '', e.target.value, 'name')
    );
  };
  const phoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    setChangeList((arr) =>
      getChangedArray(arr, order?.phone ?? '', e.target.value, 'phone')
    );
  };
  const addressHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    setChangeList((arr) =>
      getChangedArray(arr, order?.address ?? '', e.target.value, 'address')
    );
  };
  const descriptionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
    setChangeList((arr) =>
      getChangedArray(
        arr,
        order?.description ?? '',
        e.target.value,
        'description'
      )
    );
  };

  const statusHandler = (value: string) => {
    setOrderStatus(value);
    setChangeList((arr) =>
      getChangedArray(arr, order?.orderStatus ?? '', value, 'orderStatus')
    );
  };

  return (
    <Modal
      open={isOpen}
      onOk={handleOk}
      className={s.container}
      onCancel={handleCancel}
      confirmLoading={isLoading}
      title="Редактировать заявку"
      okButtonProps={{ disabled: !changeList.length }}
      okText="Сохранить"
      cancelText="Отмена"
    >
      <div className={s.body}>
        <div>
          <Text type="secondary">Имя</Text>
          <Input
            onChange={nameHandler}
            placeholder="Введите имя"
            value={name}
          />
        </div>
        <div>
          <Text type="secondary">Телефон</Text>
          <Input
            onChange={phoneHandler}
            placeholder="Введите номер"
            value={phone}
          />
        </div>
        <div>
          <Text type="secondary">Адрес</Text>
          <Input
            onChange={addressHandler}
            placeholder="Введите адрес"
            value={address}
          />
        </div>
        <div>
          <Text type="secondary">Описание</Text>
          <Input
            onChange={descriptionHandler}
            placeholder="Введите описание"
            value={description}
          />
        </div>
        <div className={s.selectContainer}>
          <Text type="secondary">Статус</Text>
          <Select
            className={s.select}
            allowClear
            placeholder="Статус заявки"
            defaultValue={order?.orderStatus}
            value={orderStatus}
            onChange={statusHandler}
            options={statusesOptions}
          />
        </div>
        <div className={s.selectContainer}>
          <Text type="secondary">Тип заявки</Text>
          <Select
            className={s.select}
            allowClear
            placeholder="Тип заявки"
            defaultValue={order?.orderType}
            value={orderType}
            onChange={typeHandler}
            options={typesOptions}
          />
        </div>
      </div>
    </Modal>
  );
};

export default memo(EditModal);
