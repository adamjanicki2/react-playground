import React from "react";

type Props = {
  children: () => React.ReactNode;
  fallback: (error: any) => React.ReactNode;
};

const ErrorBoundary = ({ children, fallback }: Props) => {
  try {
    return <>{children()}</>;
  } catch (error) {
    console.error(error);
    return <>{fallback({ error })}</>;
  }
};

export default ErrorBoundary;
