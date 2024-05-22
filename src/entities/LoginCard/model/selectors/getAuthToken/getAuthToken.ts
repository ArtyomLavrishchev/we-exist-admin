import { StateSchema } from 'app/providers/StoreProvider';

export const getAuthToken = (state: StateSchema) => state.auth.accessToken;
