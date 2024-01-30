import authApi from 'api/authApi';
import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { openNotification } from 'entities/LoginCard/model/utils';
import { ILoginPayload, ISuccess, loadInitialData } from 'entities/LoginCard';

export const login = createAsyncThunk<
  ISuccess,
  ILoginPayload,
  { rejectValue: AxiosError }
>(
  'auth/login',
  async (payload: ILoginPayload, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await authApi.login(payload);
      const { accessToken } = data;
      localStorage.setItem('access_token', accessToken);
      const success = {
        status: '200',
        text: 'Успешная авторизация',
      };
      const tokenData: { user_id: string } = JSON.parse(
        atob(accessToken.split('.')[1])
      );
      await dispatch(loadInitialData(tokenData.user_id));
      openNotification(success.text, 'topRight', '', 'success');
      return success;
    } catch (error) {
      openNotification('Ошибка авторизации', 'topRight', '', 'error');
      return rejectWithValue(error as AxiosError);
    }
  }
);
