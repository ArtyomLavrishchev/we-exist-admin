import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authCheck, logout, login } from 'entities/LoginCard';
import { IAuthSchema } from 'entities/LoginCard/model/types/auth';

const initialState: IAuthSchema = {
  isAuth: false,
  isLoading: true,
  error: null,
  success: null,
  id: '',
  roles: [],
  accessToken: '',
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
      .addCase(authCheck.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authCheck.fulfilled, (state, { payload }) => {
        state.isAuth = !!payload;
        if (payload) {
          state.id = payload.id;
          state.roles = payload.roles;
          state.accessToken = payload.accessToken;
        }
        state.isLoading = false;
      })
      .addCase(authCheck.rejected, (state) => {
        state.isAuth = false;
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isAuth = true;
        state.id = payload.id;
        state.roles = payload.roles;
        state.accessToken = payload.accessToken;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state) => {
        state.isAuth = false;
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, () => {
        return { ...initialState, isLoading: false };
      });
  },
});

export const { actions: authActions, reducer: authReducer } = authSlice;
