import { AxiosError } from 'axios';
import ordersApi from 'api/ordersApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFetchTableParams, IOrders } from 'entities/Orders';

export const fetchOrdersList = createAsyncThunk<
  IOrders,
  IFetchTableParams,
  { rejectValue: AxiosError | null }
>('orders/fetchOrdersList', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await ordersApi.fetchOrdersList(payload);
    return data;
  } catch (error) {
    let err = null;
    if (error instanceof AxiosError) {
      err = error;
    }
    return rejectWithValue(err);
  }
});
