'use client';

import React from 'react';
import { Button } from './button';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error - in production this could send to a monitoring service
    // eslint-disable-next-line no-console
    console.error('Error Boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
          <h1 className="text-4xl font-bold">Something went wrong</h1>
          <p className="mt-4 text-gray-600">
            An error occurred while loading this page
          </p>
          <Button onClick={() => window.location.reload()} className="mt-6">
            Reload page
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
