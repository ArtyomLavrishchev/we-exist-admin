import {
  IAccountsSchema,
  fetchUserAccount,
  fetchAccountsList,
} from 'entities/Accounts';
import { AxiosError } from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IAccountsSchema = {
  accounts: null,
  clients: null,
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
        const clients = payload.filter(
          (el) => !el.is_staff && !el.is_admin && !el.is_superuser
        );
        state.accounts = payload;
        state.clients = clients;
        state.isLoading = false;
      })
      .addCase(fetchAccountsList.rejected, (state, { payload }) => {
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
