import { debounce } from 'shared/utils';
import { useSelector } from 'react-redux';
import { ColumnsType } from 'antd/es/table';
import { Input, Table, TableProps } from 'antd';
import { useAppDispatch } from 'shared/lib/hooks';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { fetchAccountsList, getAccounts, IAccount } from 'entities/Accounts';

import styles from './AccTable.module.scss';

interface IAccTable {
  options: IAccount[] | null;
  columns: ColumnsType<IAccount>;
  isLoading: boolean;
}

interface ITableParams {
  page: number;
  limit: number;
  roles?: string[];
  search?: string;
}

export const AccTable: FC<IAccTable> = ({ options, columns, isLoading }) => {
  const dispatch = useAppDispatch();
  const params = useSelector(getAccounts);
  const [search, setSearch] = useState<string>('');
  const [dSearch, setDSearch] = useState<string>('');
  const [tableParams, setTableParams] = useState<ITableParams>({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    dispatch(fetchAccountsList({ ...tableParams, search: dSearch }));
  }, [dispatch, dSearch, tableParams]);

  const handleTableChange: TableProps<IAccount>['onChange'] = (
    pagination,
    filters
  ) => {
    setTableParams({
      page: pagination.current ?? 1,
      limit: pagination.pageSize ?? 10,
      roles: filters['2'] as string[],
    });
  };

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debounce(() => setDSearch(e.target.value), 1000)();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Input
          className={styles.search}
          placeholder="Поиск по email"
          value={search}
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
        rowKey={(r) => r.email}
        scroll={{ x: true }}
        style={{ whiteSpace: 'nowrap' }}
        bordered
        onChange={handleTableChange}
      />
    </div>
  );
};
