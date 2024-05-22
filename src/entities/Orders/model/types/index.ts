import { AxiosError } from 'axios';
import { IAccount } from 'entities/Accounts';

export interface IOrder {
  address: string;
  createdAt: string;
  description: string | null;
  id: number;
  name: string;
  orderStatus: string;
  orderType: string;
  phone: string;
  updatedAt: string;
  user: IAccount | null;
  userId: string | null;
}

export interface IOrders {
  data: IOrder[];

  limit?: number;
  page?: number;
  total?: number;
  totalPages?: number;
}

export interface IOrdersSchema {
  orders: IOrders | null;
  error: AxiosError | null;
  isLoading: boolean;
}

export interface IFetchTableParams {
  filters?: string[] | null;
  search?: string;
  limit?: number;
  page?: number;
}

export interface IUpdateOrderPayload {
  id: number;
  address?: string;
  phone?: string;
  name?: string;
  description?: string;
  orderType?: string;
  orderStatus?: string;
}

export interface IDeleteOrderResponse {
  id: number;
}
