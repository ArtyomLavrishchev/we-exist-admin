import {
  IOrder,
  IOrders,
  IFetchTableParams,
  IUpdateOrderPayload,
  IDeleteOrderResponse,
} from 'entities/Orders';

import Api from './index';

const usersApi = {
  fetchOrdersList: ({ page, search, filters, limit }: IFetchTableParams) => {
    const p = page ? `page=${page}` : '';
    const s = search ? `&search=${search}` : '';
    const r = filters?.length ? `&search[]=${filters.join('&search[]=')}` : '';
    const l = limit ? `&limit=${limit}` : '';
    return Api.get<IOrders>(`/orders?${p}${l}${s}${r}`);
  },
  updateOrder: ({ id, ...rest }: IUpdateOrderPayload) => {
    return Api.patch<IOrder>(`/orders/${id}`, rest);
  },
  deleteOrder: (id: number) => {
    return Api.delete<IDeleteOrderResponse>(`/orders/${id}`);
  },
};

export default usersApi;
