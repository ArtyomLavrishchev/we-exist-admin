import authApi from 'api/authApi';
import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { openNotification } from 'entities/LoginCard/model/utils';
import { ILoginPayload, ISuccess, loadInitialData } from 'entities/LoginCard';

export const registerOrLogin = createAsyncThunk<
  ISuccess,
  ILoginPayload,
  { rejectValue: AxiosError }
>(
  'auth/login',
  async ({ phone }: ILoginPayload, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await authApi.login({ phone });
      const { access, refresh } = data;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      const success = {
        status: '200',
        text: 'Успешная авторизация',
      };
      const tokenData: { user_id: string } = JSON.parse(
        atob(access.split('.')[1])
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
