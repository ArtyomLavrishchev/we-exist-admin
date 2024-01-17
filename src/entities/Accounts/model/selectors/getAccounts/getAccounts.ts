import { StateSchema } from 'app/providers/StoreProvider';

export const getAccounts = (state: StateSchema) => state.accounts.accounts;
