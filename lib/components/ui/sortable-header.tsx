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
  return (
    <div
      className={cn('flex items-center gap-1 cursor-pointer', className)}
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      <SortIcon className='h-4 w-4 shrink-0 text-icon' />
      {children}
    </div>
  );
};
