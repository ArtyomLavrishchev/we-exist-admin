import {
  IAccountsSchema,
  fetchUserAccount,
  fetchAccountsList,
  updateUserAccount,
} from 'entities/Accounts';
import { AxiosError } from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IAccountsSchema = {
  accounts: null,
  userAccount: null,
  isLoading: false,
  error: null,
};

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountsList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAccountsList.fulfilled, (state, { payload }) => {
        state.accounts = payload;
        state.isLoading = false;
      })
      .addCase(fetchAccountsList.rejected, (state, { payload }) => {
        state.error = payload ?? ({ message: 'Ошибка сервера' } as AxiosError);
        state.isLoading = false;
      })
      .addCase(updateUserAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserAccount.fulfilled, (state, { payload }) => {
        state.accounts = {
          ...state.accounts,
          data:
            state.accounts?.data.map((acc) =>
              acc.id === payload.id ? payload : acc
            ) ?? [],
        };
        state.isLoading = false;
      })
      .addCase(updateUserAccount.rejected, (state, { payload }) => {
        state.error = payload || ({ message: 'Ошибка сервера' } as AxiosError);
        state.isLoading = false;
      })
      .addCase(fetchUserAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserAccount.fulfilled, (state, { payload }) => {
        state.userAccount = payload;
        state.isLoading = false;
      })
      .addCase(fetchUserAccount.rejected, (state, { payload }) => {
        state.error = payload || ({ message: 'Ошибка сервера' } as AxiosError);
        state.isLoading = false;
      });
  },
});

export const { actions: accountsActions, reducer: accountsReducer } =
  accountsSlice;
