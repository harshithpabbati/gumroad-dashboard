import { TimePeriod } from '@/types/sale';

export function generateDateRanges(period: TimePeriod) {
  const currentDate = new Date();
  const startDate = new Date(currentDate);
  switch (period) {
    case 'month':
      startDate.setMonth(currentDate.getMonth() - 11);
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);
      break;
    case 'week':
    default:
      startDate.setDate(currentDate.getDate() - 6);
      startDate.setHours(0, 0, 0, 0);
      break;
  }

  const dates: Date[] = [];
  for (
    let d = new Date(currentDate);
    d >= startDate;
    period === 'week'
      ? d.setDate(d.getDate() - 1)
      : d.setMonth(d.getMonth() - 1)
  ) {
    const newDate = new Date(d);
    if (period === 'month') newDate.setDate(1);
    newDate.setHours(0, 0, 0, 0);
    dates.push(newDate);
  }

  return dates.reverse();
}
