import { AxiosError } from 'axios';
import usersApi from 'api/usersApi';
import { IAccounts } from 'entities/Accounts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFetchTableParams } from 'entities/Orders';

export const fetchAccountsList = createAsyncThunk<
  IAccounts,
  IFetchTableParams,
  { rejectValue: AxiosError | null }
>('accounts/fetchAccountsList', async (params, { rejectWithValue }) => {
  try {
    const { data } = await usersApi.fetchAccountsList(params);
    return data;
  } catch (error) {
    let err = null;
    if (error instanceof AxiosError) {
      err = error;
    }
    return rejectWithValue(err);
  }
});
