import {
  IAuthResponse,
  ILoginPayload,
  IRegisterPayload,
} from 'entities/LoginCard';
import axios from 'axios';

import Api from './index';

const authApi = {
  login(payload: ILoginPayload) {
    return Api.post<IAuthResponse>('/auth/login', payload);
  },
  register(payload: IRegisterPayload) {
    return Api.post<IAuthResponse>('/auth/register', payload);
  },
  logout() {
    return Api.get('/auth/logout');
  },
  refresh() {
    return axios.get<IAuthResponse>(
      `${import.meta.env.VITE_BACKEND_URL || ''}/auth/refresh-tokens`,
      { withCredentials: true }
    );
  },
};

export default authApi;
