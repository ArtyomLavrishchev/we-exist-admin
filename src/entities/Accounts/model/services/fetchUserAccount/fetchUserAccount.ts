import { AxiosError } from 'axios';
import usersApi from 'api/usersApi';
import { IAccount } from 'entities/Accounts';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserAccount = createAsyncThunk<
  IAccount,
  string,
  { rejectValue: AxiosError | null }
>('accounts/fetchUserAccount', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await usersApi.fetchUserAccount(payload);
    return data;
  } catch (error) {
    let err = null;
    if (error instanceof AxiosError) {
      err = error;
    }
    return rejectWithValue(err);
  }
});
