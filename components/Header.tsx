import Link from 'next/link';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/authOptions';
import { UserMenu } from '@/components/UserMenu';

export async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-secondary">
      <div className="flex h-16 items-center justify-between px-4 md:px-12">
        <Link href={session?.user?.name ? '/dashboard' : '/'}>
          <h3 className="text-lg font-bold">Gumroad Dashboard</h3>
        </Link>
        <UserMenu />
      </div>
    </header>
  );
}
