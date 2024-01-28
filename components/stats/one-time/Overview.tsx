import { useMemo } from 'react';
import { Activity, DollarSign, Receipt } from 'lucide-react';

import { Sale } from '@/types/sale';
import {
  calculateAverageOrderValue,
  calculateSales,
} from '@/lib/helpers/one-time';
import { calculateTotalRevenue } from '@/lib/helpers/sales';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AreaGraph } from '@/components/stats/graphs/AreaGraph';
import { LineGraph } from '@/components/stats/graphs/LineGraph';

export function Overview({ sales }: { sales: Sale[] }) {
  const totalRevenue = useMemo(
    () => sales.reduce((acc: number, sub) => acc + sub.price, 0),
    [sales]
  );
  const averageOrderValue = useMemo(
    () => Math.round(totalRevenue / (sales.length || 1)),
    [sales.length, totalRevenue]
  );

  const revenue = useMemo(() => calculateTotalRevenue(sales), [sales]);
  const monthlySales = useMemo(() => calculateSales(sales), [sales]);
  const monthlyAverageOrderValue = useMemo(
    () => calculateAverageOrderValue(sales),
    [sales]
  );

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <Activity className="size-4 text-muted-foreground" />
          </div>
          <CardDescription className="text-2xl font-bold">
            {sales.length}
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[80px]">
          <AreaGraph
            height="100%"
            hideAxis
            data={monthlySales}
            dataKey="sales"
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Order Value
            </CardTitle>
            <Receipt className="size-4 text-muted-foreground" />
          </div>
          <CardDescription className="text-2xl font-bold">
            ${averageOrderValue}
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[80px]">
          <LineGraph
            data={monthlyAverageOrderValue}
            prefix="$"
            dataKey="revenue"
          />
        </CardContent>
      </Card>
    </div>
  );
}
