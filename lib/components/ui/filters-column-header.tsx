import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Column } from '@tanstack/react-table';
import { cn } from '@/utils';
import CalendarOutlineIcon from '@/assets/calendar_outline.svg?react';
import SearchIcon from '@/assets/search.svg?react';
import { Button } from './button';
import { Calendar } from './calendar';
import { Input } from './input';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export const SearchFilterTooltip = ({
  column,
  applyText,
}: {
  column?: Column<any, unknown>;
  applyText?: string;
}) => {
  const filterValue = column?.getFilterValue();

  const [search, setSearch] = useState(typeof filterValue === 'string' ? filterValue : '');
  const [isOpen, setIsOpen] = useState(false);

  const handleApply = () => {
    column?.setFilterValue(search);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          className='p-1'
          variant='ghost'
          icon={
            <SearchIcon
              className={cn('text-foreground-tertiary', {
                'text-foreground-theme': !!filterValue,
              })}
            />
          }
        />
      </PopoverTrigger>
      <PopoverContent className='flex flex-col gap-2 w-auto p-2 rounded-lg bg-background'>
        {typeof search === 'string' && (
          <Input value={search} onChange={e => setSearch(e.target.value)} />
        )}

        <Button variant='default' onClick={handleApply}>
          {applyText}
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export const DateRangeFilterTooltip = ({ column }: { column: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(undefined);

  useEffect(() => {
    const currentFilter: DateRange = column.getFilterValue();
    if (currentFilter?.from && currentFilter?.to) {
      setSelectedRange({
        from: new Date(currentFilter.from),
        to: new Date(currentFilter.to),
      });
    } else {
      setSelectedRange(undefined);
    }
  }, [column]);

  const handleSelect = (range: DateRange | undefined) => {
    setSelectedRange(range);
    if (range?.from && range?.to) {
      column.setFilterValue({
        from: range.from.toISOString(),
        to: range.to.toISOString(),
      });
      setIsOpen(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          className='p-1'
          variant='ghost'
          icon={
            <CalendarOutlineIcon
              className={cn('text-foreground-tertiary', {
                'text-foreground-theme': !!selectedRange,
              })}
            />
          }
        />
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0 rounded-lg'>
        <Calendar
          mode='range'
          selected={selectedRange}
          onSelect={handleSelect}
          className='bg-background rounded-lg'
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

interface FiltersColumnHeaderProps {
  children?: React.ReactNode;
  column: Column<any, unknown>;
  asSearch?: boolean;
  asDatePicker?: boolean;
  applyText?: string;
}

export const FiltersColumnHeader = ({
  children,
  column,
  asSearch,
  asDatePicker,
  applyText,
}: FiltersColumnHeaderProps) => {
  return (
    <div className='flex flex-row gap-2 justify-between items-center'>
      {children}
      {asSearch && <SearchFilterTooltip column={column} applyText={applyText} />}
      {asDatePicker && <DateRangeFilterTooltip column={column} />}
    </div>
  );
};
