'use client';

import { Ban } from 'lucide-react';

import { Sale, SubscriptionSale } from '@/types/sale';
import { getCountryDistribution } from '@/lib/sales';
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

export function CountryDistribution({ sales }: Props) {
  const distribution = getCountryDistribution(sales as SubscriptionSale[]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Country distribution</CardTitle>
        <CardDescription>
          Explore subscriber distribution across various countries to understand
          geographic engagement.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {distribution.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 px-4 py-12">
            <div className="rounded-full bg-muted p-4">
              <Ban />
            </div>
            <h3 className="font-medium">
              Country distribution is not available
            </h3>
            <p className="text-sm text-muted-foreground">
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
