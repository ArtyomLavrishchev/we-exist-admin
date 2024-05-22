import { IFetchTableParams } from 'entities/Orders';
import { IAccount, IAccounts, IUpdateUserPayload } from 'entities/Accounts';

import Api from './index';

const usersApi = {
  fetchAccountsList: ({ page, search, roles, limit }: IFetchTableParams) => {
    const p = page ? `page=${page}` : '';
    const s = search ? `&search=${search}` : '';
    const r = roles ? `&roles[]=${roles.join('&roles[]=')}` : '';
    const l = limit ? `&limit=${limit}` : '';
    return Api.get<IAccounts>(`/users?${p}${l}${s}${r}`);
  },
  fetchUserAccount: (payload: string) => {
    return Api.get<IAccount>(`/users/${payload}/`);
  },
  updateUserAccount: ({ id, ...rest }: IUpdateUserPayload) => {
    return Api.patch<IAccount>(`/users/${id}/`, rest);
  },
};

export default usersApi;
