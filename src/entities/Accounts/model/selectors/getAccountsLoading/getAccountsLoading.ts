import { StateSchema } from 'app/providers/StoreProvider';

export const getAccountsLoading = (state: StateSchema) => state.accounts.isLoading;
