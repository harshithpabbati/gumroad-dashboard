import { TimePeriod } from '@/types/sale';

export function generateDateRanges(period: TimePeriod) {
  const today = new Date();
  let dates: Date[] = [];

  switch (period) {
    case 'year':
    case 'half-year':
      for (let i = 0; i <= (period === 'year' ? 11 : 5); i++) {
        const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
        date.setHours(0, 0, 0, 0);
        dates.unshift(date);
      }
      break;
    case 'quarter':
    case 'month':
      for (let i = 0; i < (period === 'quarter' ? 89 : 30); i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        date.setHours(0, 0, 0, 0);
        dates.unshift(date);
      }
      break;
    case 'week':
    default:
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        date.setHours(0, 0, 0, 0);
        dates.unshift(date);
      }
      break;
  }

  return dates;
}

export function checkIfDateInRange(period: TimePeriod, date: Date) {
  const range = generateDateRanges(period);
  const firstDate = range[0];
  const lastDate = range[range.length - 1];

  const dateYear = date.getFullYear();
  const dateMonth = date.getMonth();
  const firstDateYear = firstDate.getFullYear();
  const firstDateMonth = firstDate.getMonth();
  const lastDateYear = lastDate.getFullYear();
  const lastDateMonth = lastDate.getMonth();

  switch (period) {
    case 'year':
    case 'half-year':
      return (
        (dateYear === firstDateYear && dateMonth >= firstDateMonth) ||
        (dateYear === lastDateYear && dateMonth <= lastDateMonth) ||
        (dateYear > firstDateYear && dateYear < lastDateYear)
      );
    case 'quarter':
    case 'month':
    case 'week':
    default:
      date.setHours(0, 0, 0, 0);
      return date >= firstDate && date <= lastDate;
  }
}
