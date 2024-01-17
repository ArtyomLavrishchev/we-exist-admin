import { AxiosError } from 'axios';

export interface ILoginPayload {
  phone: string;
}

export interface IAuthResponse {
  refresh: string;
  access: string;
}

export type IRefreshResponse = Omit<IAuthResponse, 'refresh'>;

export interface ISuccess {
  text: string;
  status: string;
}

export interface IAuthSchema {
  isAuth: boolean;
  isLoading: boolean;
  error: AxiosError | null;
  success: ISuccess | null;
}
