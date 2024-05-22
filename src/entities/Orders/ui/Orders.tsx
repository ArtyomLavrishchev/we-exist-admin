import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks';
import { OrdersTable } from 'widgets/OrdersTable';
import { getAuthToken } from 'entities/LoginCard';
import { ordersColumns } from 'shared/constants/columns';
import { fetchOrdersList, getOrders, getOrdersLoading } from 'entities/Orders';
import { EventSourcePolyfill } from 'event-source-polyfill';

export const Orders = () => {
  const orders = useSelector(getOrders);
  const token = useSelector(getAuthToken);
  const isLoading = useSelector(getOrdersLoading);
  const dispatch = useAppDispatch();

  const { data, ...rest } = orders ?? {};

  useEffect(() => {
    const eventSource = new EventSourcePolyfill(
      `${import.meta.env.VITE_BACKEND_URL ?? ''}/events/subscribe`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    eventSource.onmessage = (event) => {
      console.log(event);
      const newOrder = JSON.parse(event.data);
      if (newOrder.event === 'newOrder') {
        dispatch(fetchOrdersList({ ...rest }));
      }
    };
    return () => {
      eventSource.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <OrdersTable
      options={data ?? []}
      columns={ordersColumns}
      isLoading={isLoading}
    />
  );
};
