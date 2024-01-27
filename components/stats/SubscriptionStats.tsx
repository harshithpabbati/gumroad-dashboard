import { Product } from '@/types/product';
import { Sale } from '@/types/sale';
import {
  CountryDistribution,
  MembershipMetrics,
  SubscribersDistribution,
} from '@/components/stats/distributions';
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
      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <SubscribersDistribution sales={sales} />
        <MembershipMetrics sales={sales} />
        <CountryDistribution sales={sales} />
      </div>
    </>
  );
}
