import { StateSchema } from 'app/providers/StoreProvider';

export const getOrders = (state: StateSchema) => state.orders.orders;
