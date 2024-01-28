import { Sale, SubscriptionSale, TimePeriod } from '@/types/sale';
import { calculateAggregatedData } from '@/lib/helpers/aggregate';
import { checkIfDateInRange, generateDateRanges } from '@/lib/helpers/utils';

export function calculateSalesVolume(
  sales: Sale[],
  period: TimePeriod = 'week'
): { name: string; grossRevenue: number; netRevenue: number }[] {
  const dates = generateDateRanges(period);

  const salesData: { [key: string]: { gross: number; net: number } } = {};
  dates.forEach((date) => {
    switch (period) {
      case 'year':
      case 'half-year':
        salesData[
          date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
        ] = { gross: 0, net: 0 };
        break;
      case 'quarter':
      case 'month':
      case 'week':
      default:
        salesData[
          date.toLocaleDateString('en-US', {
            dateStyle: 'medium',
          })
        ] = {
          gross: 0,
          net: 0,
        };
        break;
    }
  });

  sales.forEach((sale) => {
    const date = new Date(sale.created_at);
    if (checkIfDateInRange(period, date)) {
      let key;
      switch (period) {
        case 'year':
        case 'half-year':
          key = date.toLocaleDateString('en-US', {
            month: 'short',
            year: '2-digit',
          });
          break;
        case 'quarter':
        case 'month':
        case 'week':
        default:
          key = date.toLocaleDateString('en-US', {
            dateStyle: 'medium',
          });
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

export function calculateTotalRevenue(sales: Sale[]) {
  const dates = generateDateRanges('year');

  let totalRevenue = sales
    .filter((sale) => {
      const saleDate = new Date(sale.created_at);
      return (
        saleDate.getMonth() < dates[0].getMonth() &&
        saleDate.getFullYear() < dates[0].getFullYear()
      );
    })
    .reduce((total, sale) => total + sale.price, 0);
  return calculateAggregatedData(
    sales,
    () => true,
    (sale) => sale.price
  ).map(({ name, value }) => {
    const rev = totalRevenue;
    totalRevenue += value;
    return {
      name,
      value: value + rev,
    };
  });
}

export function calculateMRR(sales: Sale[]) {
  return calculateAggregatedData<SubscriptionSale>(
    sales as SubscriptionSale[],
    (sale) => !(sale.cancelled || sale.dead || sale.ended),
    (sale) => sale.price
  );
}

export function calculateSubscriptions(sales: Sale[]) {
  return calculateAggregatedData<SubscriptionSale>(
    sales as SubscriptionSale[],
    (sale) => !(sale.cancelled || sale.dead || sale.ended),
    () => 1
  );
}

export function calculateChurn(sales: Sale[]) {
  const totalSubscriptions = calculateAggregatedData<SubscriptionSale>(
    sales as SubscriptionSale[],
    () => true,
    () => 1
  );
  return calculateAggregatedData<SubscriptionSale>(
    sales as SubscriptionSale[],
    (sale) => sale.cancelled || sale.dead || sale.ended,
    () => 1
  ).map(({ name, value }, index) => {
    const thisMonthTotalSubscriptions = totalSubscriptions[index].value || 1;
    return {
      name,
      value: Math.round((value / thisMonthTotalSubscriptions) * 100),
    };
  });
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
