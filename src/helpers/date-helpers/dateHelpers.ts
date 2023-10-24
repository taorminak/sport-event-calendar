import { DAYS_IN_WEEK } from '@/constants';

export function getFormattedDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function isCurrentDate(checkDate: Date) {
  const currentDate = new Date();

  currentDate.setHours(0, 0, 0, 0);

  const itemDate = new Date(checkDate);

  itemDate.setHours(0, 0, 0, 0);

  return currentDate.toISOString().split('T')[0] === itemDate.toISOString().split('T')[0];
}

export function getFirstWeekday(month: number, year: number): number {
  const firstDayOfMonth = new Date(year, month, 1);
  const firstWeekDay = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;

  return firstWeekDay;
}

export function calculateDaysInMonth(month: number, year: number): (string | Date)[] {
  const daysOfMonth = [];
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

  const firstWeekDay = getFirstWeekday(month, year);

  for (let day = 1; day <= lastDayOfMonth; day++) {
    daysOfMonth.push(new Date(year, month, day));
  }

  for (let i = 0; i < firstWeekDay; i++) {
    daysOfMonth.unshift('');
  }

  return daysOfMonth;
}

export function daysOfWeek() {
  const daysOfWeek = [];
  const startDate = new Date('2023-10-16');

  for (let i = 0; i < DAYS_IN_WEEK; i++) {
    daysOfWeek.push(startDate.toLocaleDateString('en-EN', { weekday: 'short' }));
    startDate.setDate(startDate.getDate() + 1);
  }
  console.log(daysOfWeek);

  return daysOfWeek;
}
