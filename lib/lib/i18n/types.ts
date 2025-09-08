import { defaultTranslations } from './defaultTranslations';
import { TranslationKey } from './translations-keys';

export type BaseTranslationKey = TranslationKey;

export type TranslationParams = Record<string, string | number> & {
  count?: number;
  [key: string]: string | number | undefined;
};

type ExtractParams<S extends string> = S extends `${string}{{${infer Param}}}${infer Rest}`
  ? Param | ExtractParams<Rest>
  : never;

export type RequiredParams<K extends BaseTranslationKey> = ExtractParams<
  (typeof defaultTranslations.en)[K]
>;

export type ValidParams<K extends BaseTranslationKey> =
  RequiredParams<K> extends never
    ? TranslationParams | undefined
    : TranslationParams & { [P in RequiredParams<K>]: string | number };
