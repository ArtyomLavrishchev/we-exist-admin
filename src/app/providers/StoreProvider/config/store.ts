import {
  Middleware,
  PreloadedState,
  configureStore,
  combineReducers,
} from '@reduxjs/toolkit';
import instance from 'api/index';
import { ordersReducer } from 'entities/Orders';
import { authReducer } from 'entities/LoginCard';
import { accountsReducer } from 'entities/Accounts';

import { IThunkExtraArg } from './StateSchema';

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
const logger: Middleware = () => (next) => (action) => next(action);

const rootReducers = combineReducers({
  auth: authReducer,
  accounts: accountsReducer,
  orders: ordersReducer,
});
export function createReduxStore() {
  const extraArg: IThunkExtraArg = {
    api: instance,
  };

  return configureStore({
    reducer: rootReducers,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: { extraArgument: extraArg } }).concat([
        logger,
      ]),
  });
}

export type TRootState = ReturnType<typeof rootReducers>;

export const setupStore = (preloadedState?: PreloadedState<TRootState>) =>
  configureStore({
    reducer: rootReducers,
    preloadedState,
  });

export type AppStore = ReturnType<typeof setupStore>;

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];

export const store = createReduxStore();

export type RootState = ReturnType<typeof store.getState>;
