import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import * as hooks from '../../../store';
import { renderWithProviders } from '../../../helpers/tests';

import { Login } from './Login';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockImplementation(() => ({
    state: { from: { pathname: '/', search: '' } },
  })),
  Navigate: jest.fn().mockImplementation(() => <div>Navigate</div>),
}));

describe('Login', () => {
  it('Snapshot', () => {
    const initialState = {
      isAuth: false,
      isLoading: false,
      error: null,
      success: null,
    };
    const { store, ...component } = renderWithProviders(<Login />, false, {
      preloadedState: { auth: initialState },
    });
    expect(component).toMatchSnapshot();
  });
  it('test', () => {
    const initialState = {
      isAuth: true,
      isLoading: false,
      error: null,
      success: null,
    };
    const { store, ...component } = renderWithProviders(<Login />, false, {
      preloadedState: { auth: initialState },
    });
    const text = component.queryByText('Navigate');
    expect(text).toBeInTheDocument();
  });
  it('submit form', async () => {
    const initialState = {
      isAuth: false,
      isLoading: false,
      error: null,
      success: null,
    };
    const { store, ...component } = renderWithProviders(<Login />, false, {
      preloadedState: { auth: initialState },
    });
    const dispatch = jest.spyOn(hooks, 'useAppDispatch');
    await act(() => {
      const btn = component.queryByTestId('login_btn');
      const userName = component.queryByTestId('userName');
      const pass = component.queryByTestId('pass');
      if (userName && pass) {
        fireEvent.change(userName, { target: { value: 'test' } });
        fireEvent.change(pass, { target: { value: 'test' } });
      }
      if (btn) {
        userEvent.click(btn);
      }
    });
    expect(dispatch).toBeCalledTimes(1);
  });
});
