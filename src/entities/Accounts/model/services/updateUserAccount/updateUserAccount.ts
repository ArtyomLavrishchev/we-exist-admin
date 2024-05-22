import { AxiosError } from 'axios';
import usersApi from 'api/usersApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAccount, IUpdateUserPayload } from 'entities/Accounts';

export const updateUserAccount = createAsyncThunk<
  IAccount,
  IUpdateUserPayload,
  { rejectValue: AxiosError | null }
>('accounts/updateUserAccount', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await usersApi.updateUserAccount(payload);
    return data;
  } catch (error) {
    let err = null;
    if (error instanceof AxiosError) {
      err = error;
    }
    return rejectWithValue(err);
  }
});
