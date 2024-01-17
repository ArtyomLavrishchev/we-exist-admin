import { render } from '@testing-library/react';

import Spinner from './Spinner';

describe('Spinner', () => {
  test('elements should be rendered', () => {
    const component = render(<Spinner />);
    expect(component).toMatchSnapshot();
  });
});
