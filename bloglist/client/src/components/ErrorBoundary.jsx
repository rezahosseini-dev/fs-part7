import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: '20px',
            border: '1px solid red',
            borderRadius: '5px',
            margin: '10px 0',
            backgroundColor: '#fff0f0',
          }}
        >
          <h2>something went wrong</h2>
          <p>please make a bug report to reza .</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
