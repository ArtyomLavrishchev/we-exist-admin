import { AxiosError } from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authCheck, login, logout } from 'entities/LoginCard';
import { IAuthSchema } from 'entities/LoginCard/model/types/auth';

const initialState: IAuthSchema = {
  isAuth: false,
  isLoading: false,
  error: null,
  success: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isAuth = true;
        state.isLoading = false;
        state.success = payload;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.error =
          payload || ({ message: 'Ошибка авторизации' } as AxiosError);
        state.isLoading = false;
      })
      .addCase(authCheck.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authCheck.fulfilled, (state, { payload }) => {
        state.isAuth = payload;
        state.isLoading = false;
      })
      .addCase(authCheck.rejected, (state) => {
        state.isAuth = false;
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuth = false;
      });
  },
});

export const { actions: authActions, reducer: authReducer } = authSlice;
