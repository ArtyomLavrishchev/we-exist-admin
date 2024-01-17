import { StateSchema } from 'app/providers/StoreProvider';

export const getClients = (state: StateSchema) => state.accounts.clients;
