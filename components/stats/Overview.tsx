import { useMemo } from 'react';
import { Activity, BookmarkX, DollarSign, Receipt } from 'lucide-react';

import { Sale, SubscriptionSale } from '@/types/sale';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    () => activeSubscriptions.reduce((acc: number, sub) => acc + sub.price, 0),
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

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalRevenue}</div>
          <p className="text-xs text-muted-foreground">
            Sum of all sales income
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current MRR</CardTitle>
          <Receipt className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${currentMRR}</div>
          <p className="text-xs text-muted-foreground">
            Current monthly subscription revenue.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Active subscriptions
          </CardTitle>
          <Activity className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeSubscriptions.length}</div>
          <p className="text-xs text-muted-foreground">
            Current number of ongoing subscriptions
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Churn rate</CardTitle>
          <BookmarkX className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{churnRate}%</div>
          <p className="text-xs text-muted-foreground">
            Percentage of customers who cancelled their subscriptions
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
