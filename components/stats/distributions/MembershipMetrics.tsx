import { Ban } from 'lucide-react';

import { Sale, SubscriptionSale } from '@/types/sale';
import { getMembershipMetrics } from '@/lib/sales';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PieGraph } from '@/components/stats/graphs/PieGraph';

interface Props {
  sales: Sale[];
}

export function MembershipMetrics({ sales }: Props) {
  const metrics = getMembershipMetrics(sales as SubscriptionSale[]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Membership Metrics</CardTitle>
        <CardDescription>
          Analyze subscription trends across monthly and annual plans to gauge
          membership growth and retention.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {metrics.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 px-4 py-12">
            <div className="rounded-full bg-muted p-4">
              <Ban />
            </div>
            <h3 className="font-medium">
              Membership metrics are not available
            </h3>
            <p className="text-sm text-muted-foreground">
              There are currently no metrics to display. Please check back
              later.
            </p>
          </div>
        ) : (
          <PieGraph data={metrics} />
        )}
      </CardContent>
    </Card>
  );
}
