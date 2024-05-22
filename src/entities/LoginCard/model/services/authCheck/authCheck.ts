import authApi from 'api/authApi';
import { createAsyncThunk } from '@reduxjs/toolkit';

export interface ITokenData {
  exp: number;
  iat: number;
  email: string;
  id: string;
  roles: string[];
  accessToken: string;
}

export const authCheck = createAsyncThunk<
  false | ITokenData,
  undefined,
  { rejectValue: string }
>('auth/authCheck', async (_, { rejectWithValue }) => {
  try {
    const { data } = await authApi.refresh();
    if (data.accessToken) {
      const { accessToken } = data;
      const tokenData = JSON.parse(
        window.atob(accessToken.split('.')[1])
      ) as Omit<ITokenData, 'accessToken'>;
      return tokenData.exp * 1000 >= new Date().getTime()
        ? { accessToken, ...tokenData }
        : false;
    }
    return false;
  } catch (error) {
    return rejectWithValue('Server error');
  }
});
