import { act } from '@testing-library/react';

import { renderWithProviders } from './helpers/tests';
import App from './App';
import { sleep } from './setupTests';

const navigate = jest.fn();

const mockUseLocationValue = {
  pathname: '/',
  search: '',
  hash: '',
  state: { from: '/' },
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn().mockImplementation(() => navigate),
  useSearchParams: jest.fn().mockImplementation(() => [{ get: () => 'done' }]),
  useLocation: jest.fn().mockImplementation(() => {
    return mockUseLocationValue;
  }),
}));

const preloadedState = {
  auth: { isAuth: true, isLoading: false, error: null, success: null },
};

describe('App', () => {
  it('spinner should be rendered', async () => {
    const { container } = renderWithProviders(<App />, false, {
      preloadedState,
    });
    await act(async () => {
      await sleep();
    });
    expect(container.getElementsByClassName('ant-spin')).toBeTruthy();
  });
});
