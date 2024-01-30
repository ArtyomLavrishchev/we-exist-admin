import {
  IAuthResponse,
  ILoginPayload,
  IRefreshResponse,
} from 'entities/LoginCard';
import axios from 'axios';

import Api from './index';

const authApi = {
  login(payload: ILoginPayload) {
    return Api.post<IAuthResponse>('/auth/login', payload);
  },
  refresh() {
    return axios.get<IRefreshResponse>(
      `${import.meta.env.VITE_BACKEND_URL || ''}/auth/refresh-tokens`
    );
  },
};

export default authApi;
