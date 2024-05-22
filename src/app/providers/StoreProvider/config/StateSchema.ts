import { AxiosInstance } from 'axios';
import { IAuthSchema } from 'entities/LoginCard';
import { IAccountsSchema } from 'entities/Accounts';
import { IOrdersSchema } from 'entities/Orders';

export interface StateSchema {
  auth: IAuthSchema;
  accounts: IAccountsSchema;
  orders: IOrdersSchema;
}

export interface IThunkExtraArg {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: IThunkExtraArg;
}
