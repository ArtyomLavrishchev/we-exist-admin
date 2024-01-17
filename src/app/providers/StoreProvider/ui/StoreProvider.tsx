import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { DeepPartial } from '@reduxjs/toolkit';

import { store } from '../config/store';
import { StateSchema } from '../config/StateSchema';

interface StoreProviderProps {
  children?: ReactNode;
  initialState?: DeepPartial<StateSchema>;
}

const StoreProvider = (props: StoreProviderProps) => {
  const { children } = props;
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
