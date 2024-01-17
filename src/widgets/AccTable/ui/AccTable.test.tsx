import { act } from 'react-dom/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { accountsColumns } from 'shared/constants/columns';

import { renderWithProviders } from '../../../helpers/tests';
import { AccTable } from 'widgets/AccTable';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn().mockImplementation(() => navigate),
}));

jest.mock('../../api');

const mockOptions = [
  {
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
  {
    username: 'admin',
    phone: null,
    email: null,
    company: null,
    inn: null,
    company_ref: null,
    referral_ref: null,
    alias_name: 'Администратор',
    first_name: 'Администратор',
    last_name: null,
    middle_name: null,
    gender: null,
    birthdate: null,
    is_allowed: false,
    is_active: true,
    active_from: null,
    active_to: null,
    role: null,
    is_staff: true,
    is_admin: true,
    is_superuser: true,
    created_at: '2022-09-07T18:55:11.871000+03:00',
    updated_at: '2022-09-07T18:55:11.871000+03:00',
  },
];

const preloadedState = {
  accounts: {
    accounts: [],
    isLoading: false,
    userAccount: null,
    clients: [],
    error: null,
  },
};
describe('AccTable', () => {
  it('AccTable should be rendered', () => {
    const { store, ...component } = renderWithProviders(
      <AccTable
        isLoading={false}
        options={mockOptions}
        columns={accountsColumns}
      />,
      false,
      {
        preloadedState,
      }
    );
    const text = component.queryByText(/U5026516/i);
    expect(text).toBeInTheDocument();
  });
  it('should navigate to account', async () => {
    const { store, ...component } = renderWithProviders(
      <AccTable
        isLoading={false}
        options={mockOptions}
        columns={accountsColumns}
      />,
      true,
      {
        preloadedState,
      }
    );
    await act(() => {
      const rows = component.queryAllByRole('cell');
      if (rows[0]) {
        fireEvent.click(rows[0]);
      }
    });
    expect(navigate).toBeCalledWith('U5026516', { state: mockOptions[0] });
  });
  it('options should be filtered', async () => {
    const { store, ...component } = renderWithProviders(
      <AccTable
        isLoading={false}
        options={mockOptions}
        columns={accountsColumns}
      />,
      false,
      {
        preloadedState,
      }
    );
    const input = component.queryByRole('combobox');
    await act(() => {
      if (input) {
        fireEvent.change(input, { target: { value: 'levke' } });
      }
    });
    expect(
      screen.queryByText(/U5026516/i, { ignore: 'div' })
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/admin/i, { ignore: 'div' })
    ).not.toBeInTheDocument();
    await act(() => {
      if (input) {
        fireEvent.change(input, { target: { value: 'test' } });
      }
    });
    expect(
      screen.queryByText(/U5026516/i, { ignore: 'div' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/admin/i, { ignore: 'div' })
    ).not.toBeInTheDocument();
  });
  it('option should be selected', async () => {
    const { store, ...component } = renderWithProviders(
      <AccTable
        isLoading={false}
        options={mockOptions}
        columns={accountsColumns}
      />,
      false,
      {
        preloadedState,
      }
    );
    const input = component.queryByRole('combobox');
    await act(() => {
      if (input) {
        fireEvent.change(input, { target: { value: 'U50265' } });
      }
    });
    const option = screen.queryAllByText(/U5026516/i)[2];
    await act(() => {
      if (option) {
        fireEvent.click(option);
      }
    });
    expect(
      screen.queryByText(/U5026516/i, { ignore: 'div' })
    ).toBeInTheDocument();
  });
  it('filter should be cleared', async () => {
    const { store, ...component } = renderWithProviders(
      <AccTable
        isLoading={false}
        options={mockOptions}
        columns={accountsColumns}
      />,
      false,
      {
        preloadedState,
      }
    );
    const inputContainer = component.queryByTestId('filter');
    const input = component.queryByRole('combobox');
    await act(() => {
      if (input) {
        fireEvent.change(input, { target: { value: 'U50265' } });
      }
    });
    await act(() => {
      const clear = inputContainer?.lastElementChild;
      if (clear) {
        userEvent.click(clear);
      }
    });
    expect(
      screen.queryByText(/U5026516/i, { ignore: 'div' })
    ).toBeInTheDocument();
    expect(screen.queryByText(/admin/i, { ignore: 'div' })).toBeInTheDocument();
  });
});
