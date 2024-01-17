import { Component, ErrorInfo, ReactElement, ReactNode } from 'react';

interface Props {
  children?: ReactNode | ReactElement;
}

interface State {
  hasError: boolean;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  componentDidCatch(_: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Что-то пошло не так...</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.errorInfo?.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
