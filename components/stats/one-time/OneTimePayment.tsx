import { Sale } from '@/types/sale';
import {
  AffiliateDistribution,
  CountryDistribution,
} from '@/components/stats/distributions';
import { Overview } from '@/components/stats/one-time/Overview';
import { Volume } from '@/components/stats/Volume';

interface Props {
  sales: Sale[];
}
export function OneTimePayment({ sales }: Props) {
  return (
    <>
      <Overview sales={sales} />
      <Volume sales={sales} className="mt-8" />
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <AffiliateDistribution sales={sales} />
        <CountryDistribution sales={sales} />
      </div>
    </>
  );
}
