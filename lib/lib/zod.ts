import i18next from 'i18next';
import { ZodErrorMap, z } from 'zod';
import { makeZodI18nMap } from 'zod-i18n-map';

z.setErrorMap(makeZodI18nMap({ ns: ['zod', 'translation'] }));

export type MakeZodI18nMap = (option?: ZodI18nMapOption) => ZodErrorMap;

export type ZodI18nMapOption = {
  t?: (typeof i18next)['t'];
  ns?: string | readonly string[];
  handlePath?: {
    keyPrefix?: string;
  };
};

export interface RefineOptions {
  params: { i18n: { key: string; values?: Record<string, string> } };
}

export const getRefineArgs = <T = string>(
  checker: (value: T) => unknown,
  tKey: string,
  { count }: { count?: number } = {},
): [(value: T) => unknown, RefineOptions] => {
  return [
    checker,
    { params: { i18n: { key: tKey, values: { count: count ? String(count) : '' } } } },
  ];
};

const checkRequired = (value: unknown) => {
  if (typeof value === 'string') return value.trim().length > 0;
  else return !!value;
};

export const zRequired = <T = unknown>(
  tKey: string,
  { count }: { count?: number } = {},
): [(value: T) => unknown, RefineOptions] => {
  return getRefineArgs(checkRequired, tKey, { count });
};

const checkMin = (value: unknown, min?: number) => {
  if (!min) return true;
  if (typeof value === 'string') return value.length >= min;
  else if (typeof value === 'number') return value >= min;
  else return true;
};

export const zMin = <T>(tKey: string, { count }: { count?: number } = {}) =>
  getRefineArgs<T>(value => checkMin(value, count), tKey, { count });
