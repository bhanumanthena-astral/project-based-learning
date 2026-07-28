import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{
          minHeight: '100vh', display: 'flex', alignItems: 'center',
          justifyContent: 'center', background: '#070B1D', color: '#F1F5F9',
          fontFamily: 'monospace', padding: '32px', flexDirection: 'column', gap: '16px'
        }}>
          <h1 style={{ color: '#F87171', fontSize: '20px', margin: 0 }}>
            ⚠ Application Error
          </h1>
          <pre style={{
            background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px',
            fontSize: '13px', maxWidth: '700px', whiteSpace: 'pre-wrap', wordBreak: 'break-all'
          }}>
            {this.state.error.message}{'\n\n'}{this.state.error.stack}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 24px', borderRadius: '8px', background: '#7C4DFF',
              color: '#fff', border: 'none', cursor: 'pointer', fontSize: '14px'
            }}
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
);

