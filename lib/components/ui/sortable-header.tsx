import type { ReactNode } from 'react';
import type { Column, RowData } from '@tanstack/react-table';
import { cn } from '@/utils';
import SortIcon from '@/assets/sort.svg?react';

interface SortableHeaderProps<TData extends RowData, TValue = unknown> {
  className?: string;
  children: ReactNode;
  column: Column<TData, TValue>;
  enableMultiSort?: boolean;
  maxMultiSortColumns?: number;
  /**
   * Количество активных сортировок. Передайте table.getState().sorting.length,
   * чтобы показывать badge 1/2/3 только когда сортировок больше одной.
   */
  sortingCount?: number;
}

export const SortableHeader = <TData extends RowData, TValue = unknown>({
  className,
  children,
  column,
  enableMultiSort = false,
  maxMultiSortColumns,
  sortingCount = 0,
}: SortableHeaderProps<TData, TValue>) => {
  const sortDirection = column.getIsSorted();
  const sortIndex = column.getSortIndex();

  const handleClick = () => {
    if (!enableMultiSort) {
      // Одиночная сортировка
      column.toggleSorting(sortDirection === 'asc');
    } else {
      // Множественная сортировка обычным кликом: добавить или переключить колонку.
      const isSorted = column.getIsSorted();
      if (isSorted) {
        column.toggleSorting(sortDirection === 'asc', true);
      } else {
        // Добавить новый уровень сортировки
        if (maxMultiSortColumns === undefined || sortingCount < maxMultiSortColumns) {
          column.toggleSorting(undefined, true);
        }
      }
    }
  };

  return (
    <div className={cn('flex items-center gap-1 cursor-pointer', className)} onClick={handleClick}>
      <SortIcon
        className={cn(
          'h-4 w-4 shrink-0 text-icon transition-transform',
          sortDirection === 'asc' && 'rotate-180',
          sortDirection && 'text-foreground-theme',
        )}
      />
      {enableMultiSort && sortingCount > 1 && sortIndex !== -1 && (
        <span className='inline-flex items-center justify-center min-w-5 h-5 text-xs font-semibold bg-foreground-theme text-background-primary rounded'>
          {sortIndex + 1}
        </span>
      )}
      {children}
    </div>
  );
};
