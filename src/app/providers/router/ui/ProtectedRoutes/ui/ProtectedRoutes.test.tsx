import { renderWithProviders } from '../../helpers/tests';

import ProtectedRoutes from './ProtectedRoutes';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockImplementation(() => ({
    state: { from: { pathname: '/', search: '' } },
  })),
  Navigate: jest.fn().mockImplementation(() => <div>Navigate</div>),
}));

const preloadedState = {
  auth: { isAuth: false, isLoading: false, error: null, success: null },
};

describe('ProtectedRoutes', () => {
  it('should navigate to login', () => {
    const { queryByText } = renderWithProviders(
      <ProtectedRoutes>children</ProtectedRoutes>,
      false,
      {
        preloadedState,
      }
    );
    expect(queryByText('Navigate')).toBeInTheDocument();
  });
  it('should render children', () => {
    const { queryByText } = renderWithProviders(
      <ProtectedRoutes>children</ProtectedRoutes>,
      false,
      {
        preloadedState: {
          ...preloadedState,
          auth: { ...preloadedState.auth, isAuth: true },
        },
      }
    );
    expect(queryByText('children')).toBeInTheDocument();
  });
});
