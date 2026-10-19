import React from "react";
import { StudioState } from "./StudioChrome";

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
        <StudioState title="Something interrupted the experiment.">
          <p>Please reload the page to try again.</p>
          <button onClick={() => window.location.reload()} className="studio-button">Reload page</button>
        </StudioState>
      );
    }

    return this.props.children;
  }
}
