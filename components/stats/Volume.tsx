'use client';

import { useMemo, useState } from 'react';

import { Sale, TimePeriod } from '@/types/sale';
import { calculateSalesVolume } from '@/lib/helpers/sales';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AreaGraph } from '@/components/stats/graphs/AreaGraph';

export function Volume({
  sales,
  className,
}: {
  sales: Sale[];
  className?: string;
}) {
  const [period, setPeriod] = useState<TimePeriod>('week');
  const revenue = useMemo(
    () => calculateSalesVolume(sales, period),
    [period, sales]
  );

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 lg:flex-row',
        className
      )}
    >
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Gross Volume</CardTitle>
            <CardDescription className="mt-1">
              Revenue from payments that are settled.
            </CardDescription>
          </div>
          <Select
            value={period}
            onValueChange={(value) => setPeriod(value as TimePeriod)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Weekly" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Time Period</SelectLabel>
                <SelectSeparator />
                <SelectItem value="week">Last 7 days</SelectItem>
                <SelectItem value="month">Last 30 days</SelectItem>
                <SelectItem value="quarter">Last 90 days</SelectItem>
                <SelectItem value="half-year">Last 180 days</SelectItem>
                <SelectItem value="year">Last 365 days</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <AreaGraph prefix="$" data={revenue} dataKey="grossRevenue" />
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Net Volume</CardTitle>
            <CardDescription className="mt-1">
              Revenue from payments after gumroad fees
            </CardDescription>
          </div>
          <Select
            value={period}
            onValueChange={(value) => setPeriod(value as TimePeriod)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Weekly" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Time Period</SelectLabel>
                <SelectSeparator />
                <SelectItem value="week">Last 7 days</SelectItem>
                <SelectItem value="month">Last 30 days</SelectItem>
                <SelectItem value="quarter">Last 90 days</SelectItem>
                <SelectItem value="half-year">Last 180 days</SelectItem>
                <SelectItem value="year">Last 365 days</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <AreaGraph prefix="$" data={revenue} dataKey="netRevenue" />
        </CardContent>
      </Card>
    </div>
  );
}
