import { StateSchema } from 'app/providers/StoreProvider';

export const getIsAdmin = (state: StateSchema) => state.auth.roles.includes('ADMIN');
