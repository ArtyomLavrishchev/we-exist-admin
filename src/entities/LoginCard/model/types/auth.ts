import { AxiosError } from 'axios';

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRegisterPayload {
  email: string;
  password: string;
}

export interface IAuthResponse {
  accessToken: string;
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
  id: string;
  roles: string[];
  accessToken: string;
}
