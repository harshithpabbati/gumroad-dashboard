import { getProduct } from '@/actions/product';

import { Shell } from '@/components/Shell';

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { product } = await getProduct(id);
  return (
    <Shell title={product.name} description={product.custom_summary}>
      {JSON.stringify(product)}
    </Shell>
  );
}
