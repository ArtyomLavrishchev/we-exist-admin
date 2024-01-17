import {
  AutoComplete,
  Table,
  DatePicker,
  Typography,
  Space,
  ConfigProvider,
} from 'antd';
import 'dayjs/locale/ru';
import dayjs, { Dayjs } from 'dayjs';
import locale from 'antd/es/locale/ru_RU';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch } from 'shared/lib/hooks';
import { CloseOutlined } from '@ant-design/icons';
import { RangeValue } from 'rc-picker/lib/interface';
import { fetchAccountsList, IAccount } from 'entities/Accounts';

import styles from './AccTable.module.scss';

const { RangePicker } = DatePicker;

interface IAccTable {
  options: IAccount[] | null;
  columns: ColumnsType<IAccount>;
  isLoading: boolean;
}

export const AccTable: FC<IAccTable> = ({ options, columns, isLoading }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [filteredAccounts, setFilteredAccounts] = useState<IAccount[] | null>(
    null
  );
  useEffect(() => {
    dispatch(fetchAccountsList());
  }, [dispatch]);

  useEffect(() => {
    setFilteredAccounts(options);
  }, [options]);

  const onFilterChange = (value: string) => {
    const filteredArr =
      options?.filter((acc) => {
        return (
          (acc.username &&
            acc.username.toUpperCase().indexOf(value.toUpperCase()) !== -1) ||
          (acc.email &&
            acc.email.toUpperCase().indexOf(value.toUpperCase()) !== -1)
        );
      }) ?? null;
    setFilteredAccounts(filteredArr);
  };
  const onFilterSelect = (value: string) => {
    const filteredArr =
      options?.filter((acc) => {
        return acc.username === value || acc.email === value;
      }) ?? null;
    setFilteredAccounts(filteredArr);
  };

  const autoCompleteValues: { value: string }[] = [];
  options?.forEach((el) => {
    if (el.username) autoCompleteValues.push({ value: el.username });
    if (el.email) autoCompleteValues.push({ value: el.email });
  });

  const rowSelectHandler = (record: IAccount) => {
    navigate(`${record.username}`, {
      state: record,
    });
  };

  const onChangePeriod = (values: RangeValue<Dayjs>) => {
    if (values) {
      const filteredArr =
        options?.filter(
          (option) =>
            values[0] &&
            values[1] &&
            dayjs(option.created_at).month() >= values[0].month() &&
            dayjs(option.created_at).month() <= values[1].month()
        ) ?? null;
      if (values[0] && values[1]) {
        setFilteredAccounts(filteredArr);
      }
    } else {
      setFilteredAccounts(options);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <AutoComplete
          style={{ width: 200 }}
          options={autoCompleteValues}
          placeholder="Поиск"
          onSelect={onFilterSelect}
          onSearch={onFilterChange}
          filterOption={(inputValue, opt) =>
            opt?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          allowClear={{ clearIcon: <CloseOutlined /> }}
          onClear={() => {
            setFilteredAccounts(options);
          }}
          data-testid="filter"
        />
        <Space align="center" wrap={false}>
          <Typography.Title level={5} className={styles.period}>
            Период:{' '}
          </Typography.Title>
          <ConfigProvider locale={locale}>
            <RangePicker picker="month" onChange={onChangePeriod} />
          </ConfigProvider>
        </Space>
      </div>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={filteredAccounts ?? []}
        pagination={{ pageSize: 15 }}
        size="small"
        rowKey="username"
        scroll={{ x: true }}
        style={{ whiteSpace: 'nowrap' }}
        onRow={(record) => {
          return {
            onClick: () => {
              rowSelectHandler(record);
            },
          };
        }}
        bordered
      />
    </div>
  );
};
