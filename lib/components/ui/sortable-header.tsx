import { ReactNode } from 'react';
import { Column } from '@tanstack/react-table';
import { cn } from '@/utils';
import SortIcon from '@/assets/sort.svg?react';

interface SortableHeaderProps {
  className?: string;
  children: ReactNode;
  column: Column<any, unknown>;
}

export const SortableHeader = ({ className, children, column }: SortableHeaderProps) => {
  const sortDirection = column.getIsSorted();

  return (
    <div
      className={cn('flex items-center gap-1 cursor-pointer', className)}
      onClick={() => column.toggleSorting(sortDirection === 'asc')}
    >
      <SortIcon
        className={cn(
          'h-4 w-4 shrink-0 text-icon transition-transform',
          sortDirection === 'asc' && 'rotate-180',
        )}
      />
      {children}
    </div>
  );
};
