import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

import authApi from './authApi';

interface IRequestConfig extends InternalAxiosRequestConfig {
  isRetry: boolean;
}

interface IError extends AxiosError {
  config: IRequestConfig;
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers.put['Content-Type'] = 'application/json';

instance.interceptors.request.use(
  (res) => {
    const request: InternalAxiosRequestConfig = res;
    const token = localStorage.getItem('access_token');
    if (token && request.headers) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: IError) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      error.config &&
      !error.config.isRetry
    ) {
      originalRequest.isRetry = true;
      try {
        const refresh = localStorage.getItem('refresh_token');
        if (refresh) {
          const response = await authApi.refresh(refresh || '');
          localStorage.setItem('access_token', response.data.access);
          return instance.request(originalRequest);
        }
      } catch (e) {
        return Promise.reject(e);
      }
    } else {
      // localStorage.removeItem('access_token');
      // localStorage.removeItem('refresh_token');
    }
    return Promise.reject(error);
  }
);

export default instance;
