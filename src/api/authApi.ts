import {
  IAuthResponse,
  ILoginPayload,
  IRefreshResponse,
} from 'entities/LoginCard';
import axios from 'axios';

import Api from './index';

const authApi = {
  login(payload: ILoginPayload) {
    return Api.post<IAuthResponse>('/register-or-login/', payload);
  },
  refresh(refresh: string) {
    return axios.post<IRefreshResponse>(
      `${import.meta.env.VITE_BACKEND_URL || ''}/token/refresh/`,
      { refresh }
    );
  },
};

export default authApi;
