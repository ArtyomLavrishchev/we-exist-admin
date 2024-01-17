import { AxiosError } from 'axios';

export interface IAccount {
  username: string;
  phone: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  middle_name: string | null;
  legal_state: string;
  inn: string | null;
  company: string | null;
  tariff: string;
  active_from: string;
  active_to: string | null;
  payment_prolongation: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface IAccountsSchema {
  accounts: IAccount[] | null;
  clients: IAccount[] | null;
  userAccount: IAccount | null;
  error: AxiosError | null;
  isLoading: boolean;
}
