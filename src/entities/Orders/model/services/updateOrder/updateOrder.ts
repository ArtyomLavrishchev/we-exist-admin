import { AxiosError } from 'axios';
import ordersApi from 'api/ordersApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IOrder, IUpdateOrderPayload } from 'entities/Orders';

export const updateOrder = createAsyncThunk<
  IOrder,
  IUpdateOrderPayload,
  { rejectValue: AxiosError | null }
>('orders/updateOrder', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await ordersApi.updateOrder(payload);
    return data;
  } catch (error) {
    let err = null;
    if (error instanceof AxiosError) {
      err = error;
    }
    return rejectWithValue(err);
  }
});
