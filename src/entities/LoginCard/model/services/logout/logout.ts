import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import authApi from 'api/authApi';

export const logout = createAsyncThunk<boolean, undefined>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
      return false;
    } catch (error) {
      let err = null;
      if (error instanceof AxiosError) {
        err = error;
      }
      return rejectWithValue(err);
    }
  }
);
