import { format, isValid, parse } from 'date-fns';
import { ru } from 'date-fns/locale';
import { DateRange } from './main';

export const toRuDateString = (date: Date | string) => {
  if (!date) return '';
  return format(typeof date === 'string' ? new Date(date) : date, 'dd.MM.yyyy');
};

// Утилиты для форматирования маски ввода
export const formatSingleDateMask = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4, 8)}`;
};

export const formatMultipleDatesMask = (value: string): string => {
  const separator = ', ';
  const parts = value.split(',').map(part => part.trim());

  // Форматируем все части
  const formattedParts = parts.map(part => formatSingleDateMask(part));

  // Подсчитываем общее количество цифр в исходном значении
  const totalDigits = value.replace(/\D/g, '').length;

  // Если только одна часть
  if (parts.length === 1) {
    const firstDate = formattedParts[0];
    // Если дата полная (10 символов) и есть еще цифры - добавляем запятую
    if (firstDate.length === 10 && totalDigits > 8) {
      return firstDate + separator;
    }
    return firstDate;
  }

  // Если несколько частей
  const lastFormatted = formattedParts[formattedParts.length - 1];
  const lastPartDigits = parts[parts.length - 1].replace(/\D/g, '').length;

  // Если последняя часть полная (10 символов) и в ней больше 8 цифр - добавляем запятую
  // Это означает, что пользователь начал вводить следующую дату
  if (lastFormatted.length === 10 && lastPartDigits > 8) {
    return formattedParts.join(separator) + separator;
  }

  // Если последняя часть пустая после форматирования, убираем её и добавляем запятую
  if (lastFormatted === '' && parts[parts.length - 1].trim() === '') {
    formattedParts.pop();
    return formattedParts.join(separator) + separator;
  }

  return formattedParts.join(separator);
};

export const formatRangeMask = (value: string): string => {
  const separator = ' — ';
  const parts = value.split(separator);

  if (parts.length === 1) {
    // Форматируем первую дату
    const firstDate = formatSingleDateMask(value);
    // Если первая дата полная (10 символов: dd.MM.yyyy) и есть еще символы, добавляем разделитель
    if (firstDate.length === 10 && value.replace(/\D/g, '').length > 8) {
      return firstDate + separator;
    }
    return firstDate;
  }

  // Форматируем обе части
  const firstDate = formatSingleDateMask(parts[0].trim());
  const secondDate = formatSingleDateMask(parts.slice(1).join('').trim());

  return secondDate ? firstDate + separator + secondDate : firstDate + separator;
};

// Утилиты для парсинга строки в Date
export const parseDateString = (value: string): Date | null => {
  if (!value || value.trim() === '') return null;
  const cleaned = value.trim();
  const dateRegex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
  if (!dateRegex.test(cleaned)) return null;
  const parsed = parse(cleaned, 'dd.MM.yyyy', new Date(), { locale: ru });
  return isValid(parsed) ? parsed : null;
};

export const parseMultipleDatesString = (value: string): Date[] => {
  if (!value || value.trim() === '') return [];
  const parts = value.split(',').map(part => part.trim());
  const dates: Date[] = [];
  for (const part of parts) {
    const date = parseDateString(part);
    if (date) dates.push(date);
  }
  return dates;
};

export const parseRangeString = (value: string): DateRange | null => {
  if (!value || value.trim() === '') return null;
  const separator = ' — ';
  const parts = value.split(separator);

  if (parts.length === 1) {
    const from = parseDateString(parts[0].trim());
    return from ? { from, to: undefined } : null;
  }

  if (parts.length === 2) {
    const from = parseDateString(parts[0].trim());
    const to = parseDateString(parts[1].trim());
    if (!from) return null;
    return { from, to: to || undefined };
  }

  return null;
};
