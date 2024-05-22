import { format } from 'date-fns';

export const toRuDateString = (date: Date | string) => {
  if (!date) return '';
  return format(typeof date === 'string' ? new Date(date) : date, 'dd.MM.yyyy');
};
