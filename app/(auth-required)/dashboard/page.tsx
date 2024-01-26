import { getProducts } from '@/actions/products';

import { Products } from '@/components/products';
import { Shell } from '@/components/Shell';

export default async function DashboardPage() {
  const { products } = await getProducts();

  return (
    <Shell title="Products" description="Here are all of your products">
      <Products products={products} />
    </Shell>
  );
}
