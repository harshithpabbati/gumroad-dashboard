import { UserMenu } from '@/components/UserMenu';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-12">
        <h3 className="text-lg font-bold">Gumroad Dashboard</h3>
        <UserMenu />
      </div>
    </header>
  );
}
