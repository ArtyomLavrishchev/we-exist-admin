import authApi from 'api/authApi';
import { AxiosError } from 'axios';
import { ILoginPayload } from 'entities/LoginCard';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { openNotification } from 'entities/LoginCard/model/utils';
import { ITokenData } from 'entities/LoginCard/model/services/authCheck/authCheck';

export const login = createAsyncThunk<
  ITokenData,
  ILoginPayload,
  { rejectValue: AxiosError }
>('auth/login', async (payload: ILoginPayload, { rejectWithValue }) => {
  try {
    const { data } = await authApi.login(payload);

    const { accessToken } = data;

    const tokenData = JSON.parse(
      window.atob(accessToken.split('.')[1])
    ) as Omit<ITokenData, 'accessToken'>;
    openNotification('Успешная авторизация', 'topRight', '', 'success');
    return { accessToken, ...tokenData };
  } catch (error) {
    openNotification('Ошибка авторизации', 'topRight', '', 'error');
    return rejectWithValue(error as AxiosError);
  }
});
