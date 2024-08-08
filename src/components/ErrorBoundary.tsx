import React from "react";

type Props = {
  Fallback: ({ error }: { error: Error }) => JSX.Element;
  children: React.ReactNode;
  deps?: string;
};

type State = {
  error: Error | null;
};

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error: Error) {
    this.setState({ error });
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    if (this.props.deps !== prevProps.deps) {
      this.setState({ error: null });
    }
  }

  render() {
    const { Fallback, children } = this.props;
    if (this.state.error) {
      return <Fallback error={this.state.error} />;
    }

    return children;
  }
}
