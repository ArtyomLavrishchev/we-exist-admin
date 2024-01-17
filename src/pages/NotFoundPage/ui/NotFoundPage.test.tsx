import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import NotFoundPage from './NotFoundPage';

describe('NotFound', () => {
  it('Snapshot', () => {
    const component = render(<NotFoundPage />, { wrapper: BrowserRouter });
    expect(component).toMatchSnapshot();
  });
});
