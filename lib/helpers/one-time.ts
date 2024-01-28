import { Sale } from '@/types/sale';
import { generateDateRanges } from '@/lib/helpers/utils';

export function calculateSales(
  sales: Sale[]
): { name: string; sales: number }[] {
  const dates = generateDateRanges('month');

  const salesData: { [key: string]: number } = {};
  dates.forEach((date) => {
    salesData[
      date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
    ] = sales.filter((sale) => {
      const saleDate = new Date(sale.created_at);
      return (
        saleDate.getMonth() === date.getMonth() &&
        saleDate.getFullYear() === date.getFullYear()
      );
    }).length;
  });

  return Object.keys(salesData).map((key) => ({
    name: key,
    sales: salesData[key],
  }));
}

export function calculateAverageOrderValue(
  sales: Sale[]
): { name: string; revenue: number }[] {
  const dates = generateDateRanges('month');

  const salesData: { [key: string]: number } = {};
  dates.forEach((date) => {
    const thisMonthSales = sales.filter((sale) => {
      const saleDate = new Date(sale.created_at);
      return (
        saleDate.getMonth() === date.getMonth() &&
        saleDate.getFullYear() === date.getFullYear()
      );
    });
    salesData[
      date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
    ] = Math.round(
      thisMonthSales.reduce((total, sale) => total + sale.price, 0) /
        (thisMonthSales.length || 1)
    );
  });

  return Object.keys(salesData).map((key) => ({
    name: key,
    revenue: salesData[key],
  }));
}
