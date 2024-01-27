import { Sale, SubscriptionSale, TimePeriod } from '@/types/sale';
import { getFakeSales } from '@/lib/helpers/fake';

export function calculateSalesVolume(
  sales: Sale[],
  {
    period = 'week',
    generateFake = false,
    type = 'gross',
  }: { period?: TimePeriod; generateFake?: boolean; type?: 'gross' | 'net' }
): { name: string; revenue: number }[] {
  let newSalesData = sales;

  if (generateFake) {
    newSalesData = getFakeSales();
  }

  const startDate = new Date();
  switch (period) {
    case 'month':
      startDate.setMonth(startDate.getMonth() - 12);
      break;
    case 'week':
    default:
      startDate.setDate(startDate.getDate() - 7);
      break;
  }

  const dates: Date[] = [];
  const currentDate = new Date();
  for (
    let d = new Date(currentDate);
    d >= startDate;
    period === 'week'
      ? d.setDate(d.getDate() - 1)
      : d.setMonth(d.getMonth() - 1)
  ) {
    dates.push(new Date(d));
  }

  const salesData: { [key: string]: number } = {};
  dates.forEach((date) => {
    switch (period) {
      case 'week':
        salesData[date.toLocaleDateString('en-US', { weekday: 'short' })] = 0;
        break;
      case 'month':
        salesData[
          date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
        ] = 0;
        break;
      default:
        break;
    }
  });

  newSalesData.forEach((sale) => {
    const date = new Date(sale.created_at);
    if (date >= startDate && date <= currentDate) {
      let key;
      switch (period) {
        case 'month':
          key = date.toLocaleDateString('en-US', {
            month: 'short',
            year: '2-digit',
          });
          break;
        case 'week':
        default:
          key = date.toLocaleDateString('en-US', { weekday: 'short' });
          break;
      }
      salesData[key] +=
        type === 'gross'
          ? sale.price
          : Math.round(sale.price - sale.gumroad_fee);
    }
  });

  return Object.keys(salesData)
    .map((key) => ({
      name: key,
      revenue: salesData[key],
    }))
    .reverse();
}

export function getSubscribersDistribution(sales: SubscriptionSale[]) {
  const distribution: Record<string, number> = {};

  sales.forEach((item) => {
    const tier = item.variants.Tier;
    distribution[tier] = (distribution[tier] || 0) + 1;
  });

  return Object.entries(distribution).map(([name, value]) => ({ name, value }));
}

export function getMembershipMetrics(sales: SubscriptionSale[]) {
  const metrics: Record<string, number> = {};

  sales.forEach((item) => {
    const duration = item.subscription_duration;
    metrics[duration] = (metrics[duration] || 0) + 1;
  });

  return Object.entries(metrics).map(([name, value]) => ({ name, value }));
}

export function getCountryDistribution(sales: SubscriptionSale[]) {
  const metrics: Record<string, number> = {};

  sales.forEach(
    (item) => (metrics[item.country] = (metrics[item.country] || 0) + 1)
  );

  return Object.entries(metrics).map(([name, value]) => ({ name, value }));
}
