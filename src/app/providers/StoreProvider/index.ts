import {
  store,
  RootState,
  AppDispatch,
  createReduxStore,
} from './config/store';
import StoreProvider from './ui/StoreProvider';

import type { StateSchema, ThunkConfig } from './config/StateSchema';

export type { AppDispatch, RootState };
export { StoreProvider, createReduxStore, StateSchema, ThunkConfig, store };
