import { render } from '@testing-library/react';

import ErrorBoundary from './ErrorBoundary';

const Child = () => {
  throw new Error();
};

describe('Error Boundary', () => {
  it('should render error boundary component when there is an error', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>
    );
    const errorMessage = getByText(/Что-то пошло не так/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
