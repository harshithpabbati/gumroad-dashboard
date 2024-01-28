import { useMemo } from 'react';
import { Activity, BookmarkX, DollarSign, Receipt } from 'lucide-react';

import { Sale, SubscriptionSale } from '@/types/sale';
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
  const activeSubscriptions = useMemo(
    () =>
      (sales as SubscriptionSale[]).filter(
        (s) => !(s.cancelled || s.dead || s.ended)
      ),
    [sales]
  );
  const currentMRR = useMemo(
    () =>
      activeSubscriptions
        .filter((s) => {
          const date = new Date();
          const saleDate = new Date(s.created_at);
          return (
            saleDate.getMonth() === date.getMonth() &&
            saleDate.getFullYear() === date.getFullYear()
          );
        })
        .reduce((acc: number, sub) => acc + sub.price, 0),
    [activeSubscriptions]
  );
  const churnRate = useMemo(() => {
    const cancelledSubscriptions = (sales as SubscriptionSale[]).filter(
      (s) => s.cancelled || s.dead || s.ended
    );
    const value = Math.round(
      (cancelledSubscriptions.length / sales.length) * 100
    );
    return isNaN(value) ? 0 : value;
  }, [sales]);

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
          <LineGraph data={revenue} dataKey="revenue" prefix="$" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current MRR</CardTitle>
            <Receipt className="size-4 text-muted-foreground" />
          </div>
          <CardDescription className="text-2xl font-bold">
            ${currentMRR}
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[80px]">
          <BarGraph data={mrr} dataKey="revenue" prefix="$" />
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
            {activeSubscriptions.length}
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[80px]">
          <AreaGraph
            data={subscriptions}
            dataKey="subscriptions"
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
            {churnRate}%
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[80px]">
          <LineGraph suffix="%" data={churn} dataKey="churn" />
        </CardContent>
      </Card>
    </div>
  );
}
