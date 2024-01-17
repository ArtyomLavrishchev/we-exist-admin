import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../helpers/tests';

import BreadCrumb from './BreadCrumb';

const mockUseLocationValue = {
  pathname: '/orders',
  search: '?status=done',
  hash: '',
  state: null,
  key: '',
};

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn().mockImplementation(() => navigate),
  useSearchParams: jest.fn().mockImplementation(() => [{ get: () => 'done' }]),
  useLocation: jest.fn().mockImplementation(() => {
    return mockUseLocationValue;
  }),
}));

describe('BreadCrumb', () => {
  it('BreadCrumb should be rendered', () => {
    renderWithProviders(<BreadCrumb />, true);
    const item = screen.queryByText(/выполненные/i);
    expect(item).toBeInTheDocument();
  });
});
