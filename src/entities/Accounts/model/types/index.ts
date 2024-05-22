import { AxiosError } from 'axios';

export interface IAccount {
  id: string;
  roles: string[];
  updatedAt: string;
  email: string;
}

export interface IUpdateUserPayload {
  isBlocked?: boolean;
  roles?: string[];
  id: string;
}

export interface IAccounts {
  data: IAccount[];

  limit?: number;
  page?: number;
  total?: number;
  totalPages?: number;
}

export interface IAccountsSchema {
  accounts: IAccounts | null;
  userAccount: IAccount | null;
  error: AxiosError | null;
  isLoading: boolean;
}
