'use client';

import { LogOutIcon } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

import { getGravatar, getNameInitials } from '@/lib/gravatar';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function UserMenu({ className }: { className?: string }) {
  const { data, status } = useSession();

  if (status === 'loading' || status === 'unauthenticated') return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn('relative size-9 rounded-full', className)}
        >
          <Avatar className="size-9 select-none">
            <AvatarImage
              src={getGravatar(data?.user?.email as string)}
              alt={data?.user?.name ?? ''}
            />
            <AvatarFallback>
              {getNameInitials(data?.user?.name as string)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col items-start space-y-1">
            <p className="text-sm font-medium leading-none">
              {data?.user?.name}
            </p>
            <p className="text-xs leading-none">{data?.user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOutIcon className="mr-2 size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
