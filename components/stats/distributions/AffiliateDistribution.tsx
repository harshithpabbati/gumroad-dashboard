'use client';

import { Ban } from 'lucide-react';

import { Sale } from '@/types/sale';
import { getAffiliateDistribution } from '@/lib/helpers/sales';
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

export function AffiliateDistribution({ sales }: Props) {
  const distribution = getAffiliateDistribution(sales);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Affiliate distribution</CardTitle>
        <CardDescription>
          Assess affiliate-driven purchase percentages to gauge their impact on
          sales
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        {distribution.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 px-4 py-12">
            <div className="rounded-full bg-background p-4">
              <Ban />
            </div>
            <h3 className="font-medium">
              Affiliate distribution is not available
            </h3>
            <p className="text-center text-sm text-muted-foreground">
              There are currently no distributions to display. Please check back
              later.
            </p>
          </div>
        ) : (
          <PieGraph data={distribution} />
        )}
      </CardContent>
    </Card>
  );
}
