import authApi from 'api/authApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadInitialData } from 'entities/LoginCard';

interface ITokenData {
  exp: number;
  iat: number;
  jti: string;
  token_type: string;
  user_id: string;
}
export const authCheck = createAsyncThunk<
  boolean,
  undefined,
  { rejectValue: string }
>('auth/authCheck', async (_, { rejectWithValue, dispatch }) => {
  try {
    const refresh = localStorage.getItem('refresh_token');
    const response = await authApi.refresh(refresh || '');
    if (response.data.access) {
      const tokenData = JSON.parse(
        window.atob(response.data.access.split('.')[1])
      ) as ITokenData;
      localStorage.setItem('access_token', response.data.access);
      await dispatch(loadInitialData(tokenData.user_id));
      return tokenData.exp * 1000 >= new Date().getTime();
    }
    return false;
  } catch (error) {
    return rejectWithValue('Server error');
  }
});
