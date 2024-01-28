import { generateDateRanges } from '@/lib/helpers/utils';

export function calculateAggregatedData<T>(
  sales: T[],
  aggregationFunction: (sale: T) => boolean,
  valueExtractor: (sale: T) => number
): { name: string; value: number }[] {
  const dates = generateDateRanges('month');
  const aggregatedData: { [key: string]: number } = {};

  dates.forEach((date) => {
    const monthKey = date.toLocaleDateString('en-US', {
      month: 'short',
      year: '2-digit',
    });
    const monthSales = sales.filter((sale) => {
      // @ts-ignore
      const saleDate = new Date(sale.created_at);
      return (
        saleDate.getMonth() === date.getMonth() &&
        saleDate.getFullYear() === date.getFullYear()
      );
    });

    aggregatedData[monthKey] = monthSales
      .filter(aggregationFunction)
      .reduce((total, sale) => total + valueExtractor(sale), 0);
  });

  return Object.keys(aggregatedData).map((key) => ({
    name: key,
    value: aggregatedData[key],
  }));
}
