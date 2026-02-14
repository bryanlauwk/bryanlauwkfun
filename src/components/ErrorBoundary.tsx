import React from "react";

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center text-center px-6">
          <div>
            <h1 className="font-serif text-3xl md:text-5xl text-[hsl(350,85%,55%)] mb-4 tracking-wider">
              Signal Lost
            </h1>
            <p className="text-[hsl(240,5%,65%)] font-mono text-sm mb-8 max-w-md mx-auto">
              The connection dropped momentarily. Click below to retune.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 border border-[hsl(350,85%,55%/0.5)] text-[hsl(350,85%,55%)] font-mono text-sm uppercase tracking-widest hover:bg-[hsl(350,85%,55%/0.1)] transition-colors rounded"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
