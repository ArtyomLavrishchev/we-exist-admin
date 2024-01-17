import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAccountsList, fetchUserAccount } from 'entities/Accounts';

export const loadInitialData = createAsyncThunk<void, string>(
  'auth/loadInitialData',
  async (user_id, { dispatch }) => {
    await dispatch(fetchUserAccount(user_id));
    await dispatch(fetchAccountsList());
  }
);
