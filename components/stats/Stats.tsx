import { Product } from '@/types/product';
import { Sale } from '@/types/sale';
import { SubscriptionStats } from '@/components/stats/SubscriptionStats';

interface Props {
  product: Product;
  sales: Sale[];
}
export function Stats({ product, sales }: Props) {
  if (product.is_tiered_membership)
    return <SubscriptionStats product={product} sales={sales} />;
  return (
    <div>
      {sales.map((sale) => (
        <p className="mt-2" key={sale.id}>
          {JSON.stringify(sale)}
        </p>
      ))}
    </div>
  );
}
