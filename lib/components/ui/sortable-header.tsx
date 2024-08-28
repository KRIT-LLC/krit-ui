import { ReactNode } from 'react';
import { Column } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/utils';

interface SortableHeaderProps {
  className?: string;
  children: ReactNode;
  column: Column<any, unknown>;
}

export const SortableHeader = ({ className, children, column }: SortableHeaderProps) => {
  return (
    <Button
      variant='ghost'
      className={cn('p-0 hover:bg-[transparent]', className)}
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {children}
      <ArrowUpDown className='ml-2 h-4 w-4' />
    </Button>
  );
};
