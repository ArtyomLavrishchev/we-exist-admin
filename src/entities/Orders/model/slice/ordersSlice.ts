import { createSlice } from '@reduxjs/toolkit';
import { fetchOrdersList, IOrdersSchema, updateOrder } from 'entities/Orders';
import { AxiosError } from 'axios';
import { deleteOrder } from 'entities/Orders/model/services/deleteOrder/deleteOrder';

const initialState: IOrdersSchema = {
  orders: null,
  isLoading: false,
  error: null,
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrdersList.fulfilled, (state, { payload }) => {
        state.orders = payload;
        state.isLoading = false;
      })
      .addCase(fetchOrdersList.rejected, (state, { payload }) => {
        state.error = payload ?? ({ message: 'Ошибка сервера' } as AxiosError);
        state.isLoading = false;
      })
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrder.fulfilled, (state, { payload }) => {
        state.orders = {
          ...state.orders,
          data:
            state.orders?.data.map((acc) =>
              acc.id === payload.id ? payload : acc
            ) ?? [],
        };
        state.isLoading = false;
      })
      .addCase(updateOrder.rejected, (state, { payload }) => {
        state.error = payload ?? ({ message: 'Ошибка сервера' } as AxiosError);
        state.isLoading = false;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOrder.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteOrder.rejected, (state, { payload }) => {
        state.error = payload ?? ({ message: 'Ошибка сервера' } as AxiosError);
        state.isLoading = false;
      });
  },
});

export const { actions: ordersActions, reducer: ordersReducer } = ordersSlice;
