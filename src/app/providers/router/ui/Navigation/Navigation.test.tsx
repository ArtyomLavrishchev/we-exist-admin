import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../helpers/tests';
import { sleep } from '../../setupTests';

import Navigation from './Navigation';

const navigate = jest.fn();

const mockUseLocationValue = {
  pathname: '/notifications',
  search: '',
  hash: '',
  state: null,
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn().mockImplementation(() => navigate),
  useLocation: jest.fn().mockImplementation(() => {
    return mockUseLocationValue;
  }),
}));

jest.mock('../../api');

const preloadedState = {
  auth: {
    isAuth: true,
    isLoading: false,
    error: null,
    success: null,
  },
};
describe('Navigation', () => {
  it('Layout should be rendered', async () => {
    renderWithProviders(<Navigation />, true, {
      preloadedState,
    });
    await act(async () => {
      await sleep();
    });
    const text = screen.queryByText(/Analytics/i);
    expect(text).toBeInTheDocument();
  });
  it('Spinner should be rendered', async () => {
    const { container } = renderWithProviders(<Navigation />, true, {
      preloadedState: {
        ...preloadedState,
        auth: { ...preloadedState.auth, isLoading: true },
      },
    });
    await act(async () => {
      await sleep();
    });
    const spinner = container.getElementsByClassName('ant-spin');
    expect(spinner).toBeTruthy();
  });
});
