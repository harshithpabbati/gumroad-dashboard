'use client';

import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';

export function SignIn() {
  return (
    <Button className="w-full" onClick={() => signIn('gumroad')}>
      Sign in with Gumroad
    </Button>
  );
}
