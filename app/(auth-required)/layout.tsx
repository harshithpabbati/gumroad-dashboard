import React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/authOptions';

export default async function AuthRequiredLayout({
  children,
}: React.PropsWithChildren<{}>) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/');

  return <>{children}</>;
}
