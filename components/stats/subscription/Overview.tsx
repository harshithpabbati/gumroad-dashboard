import { useMemo } from 'react';
import { Activity, BookmarkX, DollarSign, Receipt } from 'lucide-react';

import { Sale } from '@/types/sale';
import {
  calculateChurn,
  calculateMRR,
  calculateSubscriptions,
  calculateTotalRevenue,
} from '@/lib/helpers/sales';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AreaGraph } from '@/components/stats/graphs/AreaGraph';
import { BarGraph } from '@/components/stats/graphs/BarGraph';
import { LineGraph } from '@/components/stats/graphs/LineGraph';

export function Overview({ sales }: { sales: Sale[] }) {
  const totalRevenue = useMemo(
    () => sales.reduce((acc: number, sub) => acc + sub.price, 0),
    [sales]
  );

  const revenue = useMemo(() => calculateTotalRevenue(sales), [sales]);
  const mrr = useMemo(() => calculateMRR(sales), [sales]);
  const subscriptions = useMemo(() => calculateSubscriptions(sales), [sales]);
  const churn = useMemo(() => calculateChurn(sales), [sales]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="size-4 text-muted-foreground" />
          </div>
          <CardDescription className="text-2xl font-bold">
            ${totalRevenue}
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[80px]">
          <LineGraph data={revenue} dataKey="value" prefix="$" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current MRR</CardTitle>
            <Receipt className="size-4 text-muted-foreground" />
          </div>
          <CardDescription className="text-2xl font-bold">
            ${mrr[mrr.length - 1].value}
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[80px]">
          <BarGraph data={mrr} dataKey="value" prefix="$" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active subscriptions
            </CardTitle>
            <Activity className="size-4 text-muted-foreground" />
          </div>
          <CardDescription className="text-2xl font-bold">
            {subscriptions[subscriptions.length - 1].value}
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[80px]">
          <AreaGraph
            data={subscriptions}
            dataKey="value"
            height="100%"
            hideAxis
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Churn rate</CardTitle>
            <BookmarkX className="size-4 text-muted-foreground" />
          </div>
          <CardDescription className="text-2xl font-bold">
            {churn[churn.length - 1].value}%
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[80px]">
          <LineGraph suffix="%" data={churn} dataKey="value" />
        </CardContent>
      </Card>
    </div>
  );
}
