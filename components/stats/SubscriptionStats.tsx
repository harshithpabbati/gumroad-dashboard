import { Sale } from '@/types/sale';
import {
  CountryDistribution,
  MembershipMetrics,
  SubscribersDistribution,
} from '@/components/stats/distributions';
import { Overview } from '@/components/stats/Overview';
import { Volume } from '@/components/stats/Volume';

interface Props {
  sales: Sale[];
}
export function SubscriptionStats({ sales }: Props) {
  return (
    <>
      <Overview sales={sales} />
      <Volume sales={sales} className="mt-8" />
      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <SubscribersDistribution sales={sales} />
        <MembershipMetrics sales={sales} />
        <CountryDistribution sales={sales} />
      </div>
    </>
  );
}
