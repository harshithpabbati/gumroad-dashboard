import { notFound } from 'next/navigation';
import { getProduct } from '@/actions/product';
import { getSales } from '@/actions/sales';

import { Shell } from '@/components/Shell';
import { Stats } from '@/components/stats';

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const id = decodeURIComponent(params.id);
  const { success, product } = await getProduct(id);

  if (!success) return notFound();

  const { sales } = await getSales(id);
  return (
    <Shell title={product.name} description={product.custom_summary}>
      <Stats product={product} sales={sales} />
    </Shell>
  );
}
