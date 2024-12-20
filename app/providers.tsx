'use client';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorHandler } from '@/components/ErrorHandler';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <ErrorHandler />
      {children}
    </ErrorBoundary>
  );
}
