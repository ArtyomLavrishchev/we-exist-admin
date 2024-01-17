import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAccount } from 'entities/Accounts';
import { AxiosError } from 'axios';
import usersApi from 'api/usersApi';

export const fetchAccountsList = createAsyncThunk<
  IAccount[],
  undefined,
  { rejectValue: AxiosError | null }
>('accounts/fetchAccountsList', async (_, { rejectWithValue }) => {
  try {
    const { data } = await usersApi.fetchAccountsList();
    return data;
  } catch (error) {
    let err = null;
    if (error instanceof AxiosError) {
      err = error;
    }
    return rejectWithValue(err);
  }
});
