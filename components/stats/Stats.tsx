import { Product } from '@/types/product';
import { Sale } from '@/types/sale';
import { OneTimePayment } from '@/components/stats/one-time';
import { Subscription } from '@/components/stats/subscription';

interface Props {
  product: Product;
  sales: Sale[];
}
export function Stats({ product, sales }: Props) {
  if (product.is_tiered_membership) return <Subscription sales={sales} />;
  return <OneTimePayment sales={sales} />;
}
