import { renderWithProviders } from '../../helpers/tests';

import Profile from './Profile';

const initialState = {
  accounts: null,
  clients: null,
  userAccount: {
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
    birthdate: null,
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
  },
  isLoading: false,
  error: null,
};
describe('Profile', () => {
  it('Profile should be rendered', () => {
    const { store, ...component } = renderWithProviders(<Profile />, false, {
      preloadedState: { accounts: initialState },
    });
    const text = component.queryByText('U5026516');
    expect(text).toBeInTheDocument();
  });
  it('Profile to be null', () => {
    const { store, ...component } = renderWithProviders(<Profile />, false, {
      preloadedState: { accounts: { ...initialState, userAccount: null } },
    });
    const text = component.queryByText(/имя/i);
    expect(text).toBeFalsy();
  });
});
