import { StateSchema } from 'app/providers/StoreProvider';

export const getUserAccount = (state: StateSchema) => state.accounts.userAccount;
