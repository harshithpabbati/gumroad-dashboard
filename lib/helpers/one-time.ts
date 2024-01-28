import { Sale } from '@/types/sale';

export function calculateSales(
  sales: Sale[]
): { name: string; sales: number }[] {
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
