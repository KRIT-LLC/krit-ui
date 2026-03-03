import { useState } from 'react';
import { ColumnSizingState, OnChangeFn } from '@tanstack/react-table';

const STORAGE_PREFIX = 'data-table-column-sizing:';

/**
 * Хук для управления шириной столбцов таблицы с опциональной персистентностью в localStorage.
 *
 * @param storageKey - Уникальный ключ таблицы для хранения в localStorage.
 *   Если не передан — состояние живёт только в рамках сессии (без сохранения).
 * @param defaultSizing - Начальные размеры столбцов (используются если в localStorage ещё нет данных)
 *
 * @example
 * // С сохранением в localStorage
 * const { columnSizing, onColumnSizingChange } = useColumnSizing('orders-table');
 *
 * @example
 * // Без сохранения (только в рамках сессии)
 * const { columnSizing, onColumnSizingChange } = useColumnSizing(undefined);
 */
export function useColumnSizing(
  storageKey: string | undefined,
  defaultSizing: ColumnSizingState = {},
) {
  const readFromStorage = (): ColumnSizingState => {
    if (!storageKey) return defaultSizing;
    try {
      const raw = localStorage.getItem(STORAGE_PREFIX + storageKey);
      return raw ? (JSON.parse(raw) as ColumnSizingState) : defaultSizing;
    } catch {
      return defaultSizing;
    }
  };

  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>(() => readFromStorage());

  const onColumnSizingChange: OnChangeFn<ColumnSizingState> = updaterOrValue => {
    setColumnSizing(prev => {
      const next = typeof updaterOrValue === 'function' ? updaterOrValue(prev) : updaterOrValue;

      if (storageKey) {
        try {
          localStorage.setItem(STORAGE_PREFIX + storageKey, JSON.stringify(next));
        } catch {
          // localStorage недоступен (приватный режим и т.п.) — игнорируем
        }
      }

      return next;
    });
  };

  return { columnSizing, onColumnSizingChange };
}
