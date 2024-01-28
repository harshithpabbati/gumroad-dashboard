import { Sale, SubscriptionSale, TimePeriod } from '@/types/sale';
import { generateDateRanges } from '@/lib/helpers/utils';

export function calculateSalesVolume(
  sales: Sale[],
  period: TimePeriod = 'week'
): { name: string; grossRevenue: number; netRevenue: number }[] {
  const dates = generateDateRanges(period);

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
    if (date >= dates[0] && date <= dates[dates.length - 1]) {
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
  const dates = generateDateRanges('month');

  const salesData: { [key: string]: number } = {};
  let totalRevenue = sales
    .filter((sale) => {
      const saleDate = new Date(sale.created_at);
      return (
        saleDate.getMonth() < dates[0].getMonth() &&
        saleDate.getFullYear() < dates[0].getFullYear()
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
  const dates = generateDateRanges('month');

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
  const dates = generateDateRanges('month');

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
  const dates = generateDateRanges('month');

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

export function getAffiliateDistribution(sales: Sale[]) {
  const metrics: Record<string, number> = {};

  sales.forEach((item) => {
    const key = item?.affiliate ? 'affiliate' : 'non-affiliate';
    metrics[key] = (metrics[key] || 0) + 1;
  });

  return Object.entries(metrics).map(([name, value]) => ({ name, value }));
}
