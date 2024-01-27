import { Product } from '@/types/product';
import { Sale } from '@/types/sale';
import { Overview } from '@/components/stats/Overview';
import { Volume } from '@/components/stats/Volume';

interface Props {
  product: Product;
  sales: Sale[];
}
export function SubscriptionStats({ product, sales }: Props) {
  return (
    <>
      <Overview product={product} sales={sales} />
      <Volume sales={sales} className="mt-8" />
    </>
  );
}
