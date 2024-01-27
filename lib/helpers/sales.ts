import { Sale, SubscriptionSale, TimePeriod } from '@/types/sale';
import { getFakeSales } from '@/lib/helpers/fake';

export function calculateSalesVolume(
  sales: Sale[],
  period: TimePeriod = 'week'
): { name: string; grossRevenue: number; netRevenue: number }[] {
  const startDate = new Date();
  switch (period) {
    case 'month':
      startDate.setMonth(startDate.getMonth() - 11);
      break;
    case 'week':
    default:
      startDate.setDate(startDate.getDate() - 7);
      break;
  }

  let dates: Date[] = [];
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
  dates = dates.reverse();

  const salesData: { [key: string]: { gross: number; net: number } } = {};
  dates.forEach((date) => {
    switch (period) {
      case 'week':
        salesData[date.toLocaleDateString('en-US', { weekday: 'short' })] = {
          gross: 0,
          net: 0,
        };
        break;
      case 'month':
        salesData[
          date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
        ] = { gross: 0, net: 0 };
        break;
      default:
        break;
    }
  });

  sales.forEach((sale) => {
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
      salesData[key].gross += sale.price;
      salesData[key].net += Math.round(sale.price - sale.gumroad_fee);
    }
  });

  return Object.keys(salesData).map((key) => ({
    name: key,
    grossRevenue: salesData[key].gross,
    netRevenue: salesData[key].net,
  }));
}

export function calculateTotalRevenue(
  sales: Sale[]
): { name: string; revenue: number }[] {
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 11);

  let dates: Date[] = [];
  const currentDate = new Date();
  for (
    let d = new Date(currentDate);
    d >= startDate;
    d.setMonth(d.getMonth() - 1)
  ) {
    dates.push(new Date(d));
  }
  dates = dates.reverse();

  const salesData: { [key: string]: number } = {};
  let totalRevenue = sales
    .filter((sale) => {
      const saleDate = new Date(sale.created_at);
      return (
        saleDate.getMonth() < startDate.getMonth() &&
        saleDate.getFullYear() < startDate.getFullYear()
      );
    })
    .reduce((total, sale) => total + sale.price, 0);
  dates.forEach((date) => {
    const thisMonthRevenue = sales
      .filter((sale) => {
        const saleDate = new Date(sale.created_at);
        return (
          saleDate.getMonth() === date.getMonth() &&
          saleDate.getFullYear() === date.getFullYear()
        );
      })
      .reduce((total, sale) => total + sale.price, 0);
    salesData[
      date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
    ] = totalRevenue + thisMonthRevenue;
    totalRevenue += thisMonthRevenue;
  });

  return Object.keys(salesData).map((key) => ({
    name: key,
    revenue: salesData[key],
  }));
}

export function calculateMRR(
  sales: Sale[]
): { name: string; revenue: number }[] {
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 11);

  let dates: Date[] = [];
  const currentDate = new Date();
  for (
    let d = new Date(currentDate);
    d >= startDate;
    d.setMonth(d.getMonth() - 1)
  ) {
    dates.push(new Date(d));
  }
  dates = dates.reverse();

  const salesData: { [key: string]: number } = {};
  dates.forEach((date) => {
    salesData[
      date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
    ] = (sales as SubscriptionSale[])
      .filter((s) => !(s.cancelled || s.dead || s.ended))
      .filter((sale) => {
        const saleDate = new Date(sale.created_at);
        return (
          saleDate.getMonth() === date.getMonth() &&
          saleDate.getFullYear() === date.getFullYear()
        );
      })
      .reduce((total, sale) => total + sale.price, 0);
  });

  return Object.keys(salesData).map((key) => ({
    name: key,
    revenue: salesData[key],
  }));
}

export function calculateSubscriptions(
  sales: Sale[]
): { name: string; subscriptions: number }[] {
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 11);

  let dates: Date[] = [];
  const currentDate = new Date();
  for (
    let d = new Date(currentDate);
    d >= startDate;
    d.setMonth(d.getMonth() - 1)
  ) {
    dates.push(new Date(d));
  }
  dates = dates.reverse();

  const salesData: { [key: string]: number } = {};
  dates.forEach((date) => {
    salesData[
      date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
    ] = (sales as SubscriptionSale[])
      .filter((s) => !(s.cancelled || s.dead || s.ended))
      .filter((sale) => {
        const saleDate = new Date(sale.created_at);
        return (
          saleDate.getMonth() === date.getMonth() &&
          saleDate.getFullYear() === date.getFullYear()
        );
      }).length;
  });

  return Object.keys(salesData).map((key) => ({
    name: key,
    subscriptions: salesData[key],
  }));
}

export function calculateChurn(
  sales: Sale[]
): { name: string; churn: number }[] {
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 11);

  let dates: Date[] = [];
  const currentDate = new Date();
  for (
    let d = new Date(currentDate);
    d >= startDate;
    d.setMonth(d.getMonth() - 1)
  ) {
    dates.push(new Date(d));
  }
  dates = dates.reverse();

  const salesData: { [key: string]: number } = {};
  dates.forEach((date) => {
    const thisMonthSales = (sales as SubscriptionSale[]).filter((sale) => {
      const saleDate = new Date(sale.created_at);
      return (
        saleDate.getMonth() === date.getMonth() &&
        saleDate.getFullYear() === date.getFullYear()
      );
    });
    const cancelledSubscriptions = thisMonthSales.filter(
      (s) => s.cancelled || s.dead || s.ended
    );
    const churnRate = Math.round(
      (cancelledSubscriptions.length / thisMonthSales.length) * 100
    );
    salesData[
      date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
    ] = isNaN(churnRate) ? 0 : churnRate;
  });

  return Object.keys(salesData).map((key) => ({
    name: key,
    churn: salesData[key],
  }));
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
