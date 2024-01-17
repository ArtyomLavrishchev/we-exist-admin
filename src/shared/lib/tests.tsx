import {
  AppStore,
  setupStore,
  TRootState,
} from 'app/providers/StoreProvider/config/store';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { AppRouter } from 'app/providers/router';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { PropsWithChildren, ReactElement, ReactNode } from 'react';

import type { RenderOptions } from '@testing-library/react';
import type { PreloadedState } from '@reduxjs/toolkit';

// eslint-disable-next-line import/prefer-default-export
export const renderWithRouter = (component: ReactNode, route: string) => {
  return (
    <MemoryRouter initialEntries={[route]}>
      <AppRouter />
      {component}
    </MemoryRouter>
  );
};

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<TRootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: ReactElement,
  withRouter: boolean,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({
    children,
  }: PropsWithChildren<Record<string, unknown>>): JSX.Element {
    return (
      <Provider store={store}>
        {withRouter ? <BrowserRouter>{children}</BrowserRouter> : children}
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
