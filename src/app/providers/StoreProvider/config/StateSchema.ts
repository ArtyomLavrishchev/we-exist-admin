import { AxiosInstance } from 'axios';
import { IAuthSchema } from 'entities/LoginCard';
import { IAccountsSchema } from 'entities/Accounts';

export interface StateSchema {
  auth: IAuthSchema;
  accounts: IAccountsSchema;
}

export interface IThunkExtraArg {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: IThunkExtraArg;
}
