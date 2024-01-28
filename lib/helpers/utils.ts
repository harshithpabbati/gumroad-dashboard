import { TimePeriod } from '@/types/sale';

export function generateDateRanges(period: TimePeriod) {
  const today = new Date();
  let dates: Date[] = [];

  if (period === 'week') {
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      date.setHours(0, 0, 0, 0);
      dates.unshift(date);
    }
  } else {
    for (let i = 0; i <= 11; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      date.setHours(0, 0, 0, 0);
      dates.unshift(date);
    }
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

  if (period === 'week') {
    const firstDateDay = firstDate.getDate();
    const lastDateDay = lastDate.getDate();
    const dateDay = date.getDate();
    return (
      (dateYear === firstDateYear &&
        dateMonth === firstDateMonth &&
        dateDay >= firstDateDay) ||
      (dateYear === lastDateYear &&
        dateMonth === lastDateMonth &&
        dateDay <= lastDateDay) ||
      (dateYear > firstDateYear && dateYear < lastDateYear)
    );
  } else {
    return (
      (dateYear === firstDateYear && dateMonth >= firstDateMonth) ||
      (dateYear === lastDateYear && dateMonth <= lastDateMonth) ||
      (dateYear > firstDateYear && dateYear < lastDateYear)
    );
  }
}
