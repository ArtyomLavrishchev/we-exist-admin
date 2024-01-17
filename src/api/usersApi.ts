import { IAccount } from 'entities/Accounts';

import Api from './index';

const usersApi = {
  fetchAccountsList: () => {
    return Api.get<IAccount[]>('/user/accounts/');
  },
  fetchUserAccount: (payload: string) => {
    return Api.get<IAccount>(`/user/accounts/${payload}/`);
  },
};

export default usersApi;
