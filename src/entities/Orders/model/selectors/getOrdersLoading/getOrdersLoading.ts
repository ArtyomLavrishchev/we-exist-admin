import { StateSchema } from 'app/providers/StoreProvider';

export const getOrdersLoading = (state: StateSchema) => state.orders.isLoading;
