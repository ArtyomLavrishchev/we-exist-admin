export { Orders } from './ui/Orders';

export { ordersReducer, ordersActions } from './model/slice/ordersSlice';

export { updateOrder } from './model/services/updateOrder/updateOrder';
export { deleteOrder } from './model/services/deleteOrder/deleteOrder';
export { fetchOrdersList } from './model/services/fetchOrdersList/fetchOrdersList';

export { getOrders } from './model/selectors/getOrders/getOrders';
export { getOrdersLoading } from './model/selectors/getOrdersLoading/getOrdersLoading';

export type {
  IOrder,
  IOrders,
  IOrdersSchema,
  IFetchTableParams,
  IUpdateOrderPayload,
  IDeleteOrderResponse,
} from './model/types';
