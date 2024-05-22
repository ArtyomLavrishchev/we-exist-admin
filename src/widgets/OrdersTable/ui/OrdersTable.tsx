import { debounce } from 'shared/utils';
import { useSelector } from 'react-redux';
import { ColumnsType } from 'antd/es/table';
import { Input, Table, TableProps } from 'antd';
import { useAppDispatch } from 'shared/lib/hooks';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { fetchOrdersList, getOrders, IOrder } from 'entities/Orders';

import styles from './OrdersTable.module.scss';

interface IOrdersTable {
  options: IOrder[] | null;
  columns: ColumnsType<IOrder>;
  isLoading: boolean;
}

interface ITableParams {
  page: number;
  limit: number;
  filters?: string[];
  search?: string;
}

export const OrdersTable: FC<IOrdersTable> = ({
  options,
  columns,
  isLoading,
}) => {
  const dispatch = useAppDispatch();
  const params = useSelector(getOrders);
  const [searchValue, setSearchValue] = useState('');
  const [dSearch, setDSearch] = useState('');
  const [tableParams, setTableParams] = useState<ITableParams>({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    dispatch(fetchOrdersList({ ...tableParams, search: dSearch }));
  }, [dispatch, dSearch, tableParams]);

  const handleTableChange: TableProps<IOrder>['onChange'] = (
    pagination,
    filters
  ) => {
    setTableParams({
      page: pagination.current ?? 1,
      limit: pagination.pageSize ?? 10,
      filters: [...Object.values(filters)].flat().filter(Boolean) as string[],
    });
  };

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    debounce(() => setDSearch(e.target.value), 1000)();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Input
          className={styles.search}
          placeholder="Поиск"
          value={searchValue}
          onChange={searchHandler}
          allowClear
        />
      </div>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={options ?? []}
        pagination={{
          current: params?.page,
          pageSize: params?.limit,
          total: params?.total,
          defaultPageSize: 10,
          showSizeChanger: true,
          locale: { items_per_page: '' },
        }}
        size="small"
        rowKey={(r) => r.id}
        scroll={{ x: true }}
        style={{ whiteSpace: 'nowrap' }}
        bordered
        onChange={handleTableChange}
      />
    </div>
  );
};
