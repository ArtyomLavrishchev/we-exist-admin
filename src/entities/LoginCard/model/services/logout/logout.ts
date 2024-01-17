import { createAsyncThunk } from '@reduxjs/toolkit';

export const logout = createAsyncThunk<void, undefined>('auth/logout', () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
});
