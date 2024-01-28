import { Sale } from '@/types/sale';
import { calculateAggregatedData } from '@/lib/helpers/aggregate';

export function calculateSales(sales: Sale[]) {
  return calculateAggregatedData(
    sales,
    () => true,
    () => 1
  );
}

export function calculateAverageOrderValue(sales: Sale[]) {
  const totalSales = calculateSales(sales);
  return calculateAggregatedData(
    sales,
    () => true,
    (sale) => sale.price
  ).map(({ name, value }, index) => ({
    name,
    value: Math.round(value / (totalSales[index].value || 1)),
  }));
}
