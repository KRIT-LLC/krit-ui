import { Dispatch, SetStateAction, useState } from 'react';

export type ExpandState = Record<string | number, boolean>;

export interface UseStoredExpandOptions {
  storage?: 'localStorage' | 'sessionStorage';
  defaultWhenMissing?: boolean;
}

const readFromStorage = (
  storageKey: string,
  storage: 'localStorage' | 'sessionStorage',
): ExpandState => {
  try {
    const raw = (storage === 'localStorage' ? localStorage : sessionStorage).getItem(storageKey);
    return raw ? (JSON.parse(raw) as ExpandState) : {};
  } catch {
    return {};
  }
};

const writeToStorage = (
  storageKey: string,
  value: ExpandState,
  storage: 'localStorage' | 'sessionStorage',
) => {
  try {
    (storage === 'localStorage' ? localStorage : sessionStorage).setItem(
      storageKey,
      JSON.stringify(value),
    );
  } catch {
    // storage недоступен (приватный режим и т.п.)
  }
};

/**
 * Хук для хранения состояния раскрытия узлов (дерево, аккордеон) в sessionStorage или localStorage.
 *
 * @param storageKey - Ключ для хранения в storage
 * @param options - Опции: storage ('sessionStorage' по умолчанию), defaultWhenMissing (true по умолчанию)
 */
export const useStoredExpand = (
  storageKey: string,
  options: UseStoredExpandOptions = {},
) => {
  const { storage = 'sessionStorage', defaultWhenMissing = true } = options;

  const [expanded, setExpandedState] = useState<ExpandState>(() =>
    readFromStorage(storageKey, storage),
  );

  const setExpanded: Dispatch<SetStateAction<ExpandState>> = (updaterOrValue) => {
    setExpandedState((prev) => {
      const next =
        typeof updaterOrValue === 'function' ? (updaterOrValue as (prev: ExpandState) => ExpandState)(prev) : updaterOrValue;
      writeToStorage(storageKey, next, storage);
      return next;
    });
  };

  const toggleNode = (id: string | number) => {
    setExpanded((prev) => {
      const key = String(id);
      const currentState = key in prev ? prev[key] : defaultWhenMissing;
      return { ...prev, [key]: !currentState };
    });
  };

  const isNodeExpanded = (id: string | number): boolean => {
    const key = String(id);
    return key in expanded ? expanded[key] : defaultWhenMissing;
  };

  return {
    expanded,
    setExpanded,
    toggleNode,
    isNodeExpanded,
  };
};
