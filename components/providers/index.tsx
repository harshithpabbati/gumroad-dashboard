import React from 'react';

import { SessionProvider } from '@/components/providers/SessionProvider';

export function Providers({ children }: React.PropsWithChildren<{}>) {
  return <SessionProvider>{children}</SessionProvider>;
}
