'use client';

import { ClientRoot } from './ClientRoot';
import { Toaster } from '@/components/ui/toaster';

export function RootClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ClientRoot>
      {children}
      <Toaster />
    </ClientRoot>
  );
}
