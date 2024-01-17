import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import AccountPage from './AccountPage';

const stateMock = {
  username: 'U5026516',
  phone: '+79953004574',
  email: 'levkefir@yahoo.com',
  company: 'Beeline (CRM)',
  inn: null,
  company_ref: null,
  referral_ref: null,
  alias_name: 'CRM',
  first_name: null,
  last_name: null,
  middle_name: null,
  gender: null,
  birthdate: '2000-09-29T14:09:55+03:00',
  is_allowed: true,
  is_active: true,
  active_from: '2022-09-29T14:09:55+03:00',
  active_to: '2025-03-02T14:10:56+03:00',
  role: 'controller',
  is_staff: true,
  is_admin: false,
  is_superuser: false,
  created_at: '2022-09-29T14:01:28.905000+03:00',
  updated_at: '2022-09-29T14:11:12.446000+03:00',
};

const mockUseLocationValue = {
  pathname: '/U5026516',
  search: '',
  hash: '',
  state: stateMock,
};

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockImplementation(() => {
    return mockUseLocationValue;
  }),
}));

describe('Spinner', () => {
  it('Snapshot', () => {
    const component = render(<AccountPage />, {
      wrapper: BrowserRouter,
    });
    expect(component).toMatchSnapshot();
  });
  it('username should be rendered', () => {
    const component = render(<AccountPage />, {
      wrapper: BrowserRouter,
    });
    const text = component.queryByText(/U5026516/i);
    expect(text).toBeDefined();
  });
});
