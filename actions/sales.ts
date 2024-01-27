'use server';

import { getServerSession } from 'next-auth';

import { Sale } from '@/types/sale';
import { authOptions } from '@/lib/authOptions';

export async function getSales(
  productId: string
): Promise<{ success: boolean; sales: Sale[] }> {
  const session = await getServerSession(authOptions);

  const url = new URL('https://api.gumroad.com/v2/sales');
  url.searchParams.append('product_id', productId);

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
  });
  return await response.json();
}
