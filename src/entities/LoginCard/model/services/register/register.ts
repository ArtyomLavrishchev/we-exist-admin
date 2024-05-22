import authApi from 'api/authApi';
import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { openNotification } from 'entities/LoginCard/model/utils';
import { ILoginPayload, IRegisterPayload, ISuccess } from 'entities/LoginCard';

export const register = createAsyncThunk<
  ISuccess,
  IRegisterPayload,
  { rejectValue: AxiosError }
>('auth/register', async (payload: ILoginPayload, { rejectWithValue }) => {
  try {
    await authApi.register(payload);
    const success = {
      status: '200',
      text: 'Успешная авторизация',
    };
    openNotification(success.text, 'topRight', '', 'success');
    return success;
  } catch (error) {
    openNotification('Ошибка регистрации', 'topRight', '', 'error');
    return rejectWithValue(error as AxiosError);
  }
});
