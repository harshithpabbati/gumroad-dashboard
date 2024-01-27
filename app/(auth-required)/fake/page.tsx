import { getFakeProduct, getFakeSales } from '@/lib/helpers/fake';
import { Shell } from '@/components/Shell';
import { Stats } from '@/components/stats';

export default function FakeProductPage() {
  const sales = getFakeSales();
  const product = getFakeProduct(sales);

  return (
    <Shell title={product.name} description={product.custom_summary}>
      <Stats product={product} sales={sales} />
    </Shell>
  );
}
