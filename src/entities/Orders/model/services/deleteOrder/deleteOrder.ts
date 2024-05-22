import { AxiosError } from 'axios';
import ordersApi from 'api/ordersApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { fetchOrdersList, IDeleteOrderResponse } from 'entities/Orders';

export const deleteOrder = createAsyncThunk<
  IDeleteOrderResponse,
  number,
  { rejectValue: AxiosError | null; state: StateSchema }
>(
  'orders/deleteOrder',
  async (payload, { rejectWithValue, dispatch, getState }) => {
    try {
      const { data } = await ordersApi.deleteOrder(payload);
      const { orders } = getState();
      dispatch(
        fetchOrdersList({
          page: orders.orders?.page,
          limit: orders.orders?.limit,
        })
      );
      return data;
    } catch (error) {
      let err = null;
      if (error instanceof AxiosError) {
        err = error;
      }
      return rejectWithValue(err);
    }
  }
);
