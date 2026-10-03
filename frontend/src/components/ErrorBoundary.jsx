import { Component } from "react";
import { useLocation } from "react-router-dom";

class ErrorBoundaryInner extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("Render error:", error, info?.componentStack);
  }

  componentDidUpdate(prevProps) {
    if (this.state.error && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ error: null });
    }
  }

  render() {
    if (!this.state.error) return this.props.children;
    return this.props.renderFallback({
      error: this.state.error,
      reset: () => this.setState({ error: null }),
    });
  }
}

function PageFallback({ error, reset }) {
  return (
    <div className="panel error-fallback" role="alert">
      <h2>This screen hit an error</h2>
      <p className="text-ink-soft">
        Nothing you have entered was lost. Try again, or move to another screen.
      </p>
      <p className="text-xs font-mono text-ink-soft error-fallback-detail">
        If you report this, quote: <span>{String(error?.message || error)}</span>
      </p>
      <div className="button-row">
        <button type="button" className="btn btn-primary" onClick={reset}>Try again</button>
        <button type="button" className="btn btn-ghost" onClick={() => window.location.reload()}>Reload</button>
      </div>
    </div>
  );
}

export default function ErrorBoundary({ children }) {
  const location = useLocation();
  return (
    <ErrorBoundaryInner resetKey={location.pathname} renderFallback={PageFallback}>
      {children}
    </ErrorBoundaryInner>
  );
}

export { ErrorBoundaryInner };
