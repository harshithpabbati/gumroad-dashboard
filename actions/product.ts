'use server';

import { getServerSession } from 'next-auth';

import { Product } from '@/types/product';
import { authOptions } from '@/lib/authOptions';

export async function getProducts(): Promise<{
  success: boolean;
  products: Product[];
}> {
  const session = await getServerSession(authOptions);

  const response = await fetch('https://api.gumroad.com/v2/products', {
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
  });
  return await response.json();
}

export async function getProduct(
  id: string
): Promise<{ success: boolean; product: Product }> {
  const session = await getServerSession(authOptions);

  const response = await fetch(`https://api.gumroad.com/v2/products/${id}`, {
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
  });
  return await response.json();
}
