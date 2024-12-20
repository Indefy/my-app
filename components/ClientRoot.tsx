'use client';

import { ErrorBoundary } from './ErrorBoundary';
import { ErrorHandler } from './ErrorHandler';
import { logger } from '@/lib/logger';

export function ClientRoot({ children }: { children: React.ReactNode }) {
  logger.info('Rendering ClientRoot');

  return (
    <ErrorBoundary>
      <ErrorHandler />
      {children}
    </ErrorBoundary>
  );
}
