import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #1a130e;
  color: #f4e4bc;
  padding: 2rem;
  text-align: center;
  
  h1 {
    font-family: 'Rye', cursive;
    font-size: 3rem;
    color: #daa520;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    max-width: 600px;
  }
  
  .error-details {
    background: rgba(0, 0, 0, 0.5);
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #5c4033;
    margin-top: 1.5rem;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    color: #cd853f;
    max-width: 800px;
    overflow-x: auto;
    text-align: left;
  }
  
  button {
    margin-top: 2rem;
    padding: 0.75rem 2rem;
    background: #8b4513;
    color: #f4e4bc;
    border: 2px solid #5c4033;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    transition: all 0.3s;
    
    &:hover {
      background: #a0522d;
      transform: translateY(-2px);
    }
  }
`;

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

/**
 * ErrorBoundary - Catches React errors and displays a user-friendly fallback
 * 
 * Wraps the entire OSProvider to prevent complete app crashes
 * when context initialization or component rendering fails.
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Pick<State, 'hasError'> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[ErrorBoundary] Caught error:', error);
    console.error('[ErrorBoundary] Component stack:', errorInfo.componentStack);
    
    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    // Clear error state and reload
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <h1>🤠 Whoa There, Partner!</h1>
          <p>
            Looks like something went sideways on the frontier. 
            The WesternOS encountered a critical error.
          </p>
          <p>
            Try reloading the page. If the problem persists, 
            check the browser console for more details.
          </p>
          
          {this.state.error && (
            <div className="error-details">
              <div><strong>Error:</strong> {this.state.error.toString()}</div>
              {this.state.errorInfo && (
                <div style={{ marginTop: '0.5rem' }}>
                  <strong>Component Stack:</strong>
                  <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.8rem' }}>
                    {this.state.errorInfo.componentStack}
                  </pre>
                </div>
              )}
            </div>
          )}
          
          <button onClick={this.handleReset}>
            🔄 Reload Page
          </button>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
