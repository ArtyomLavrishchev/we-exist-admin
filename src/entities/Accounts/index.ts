export { Accounts } from './ui/Accounts';

export { accountsActions, accountsReducer } from './model/slice/accountsSlice';

export { fetchUserAccount } from './model/services/fetchUserAccount/fetchUserAccount';
export { fetchAccountsList } from './model/services/fetchAccountsList/fetchAccountsList';
export { updateUserAccount } from './model/services/updateUserAccount/updateUserAccount';

export { getClients } from './model/selectors/getClients/getClients';
export { getAccounts } from './model/selectors/getAccounts/getAccounts';
export { getUserAccount } from './model/selectors/getUserAccount/getUserAccount';
export { getAccountsLoading } from './model/selectors/getAccountsLoading/getAccountsLoading';

export type {
  IAccount,
  IAccountsSchema,
  IUpdateUserPayload,
  IAccounts,
} from './model/types';
