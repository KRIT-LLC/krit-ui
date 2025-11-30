import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Column, Table } from '@tanstack/react-table';
import { enUS, Locale, ru } from 'date-fns/locale';
import { ListFilter } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/utils';
import CalendarOutlineIcon from '@/assets/calendar_outline.svg?react';
import FilterAltOffIcon from '@/assets/filter_alt_off_outline.svg?react';
import SearchIcon from '@/assets/search.svg?react';
import { Button } from './button';
import { Calendar } from './calendar';
import { Input } from './input';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Options, SelectHeaderFilter } from './select-header-filter';

type FilterType = 'search' | 'date-range' | 'select' | 'reset';

interface BaseFilterProps {
  type: FilterType;
  column?: Column<any, unknown>;
  table?: Table<any>;
  applyText?: string;
  locale?: Locale;
  options?: Options<any>;
  excludeFilterValues?: unknown[];
}

interface FiltersColumnHeaderProps extends BaseFilterProps {
  children?: React.ReactNode;
  className?: string;
}

const FilterContent = ({
  type,
  column,
  table,
  applyText,
  locale,
  options,
  excludeFilterValues,
}: BaseFilterProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  // Search state
  const searchFilterValue = column?.getFilterValue();
  const [search, setSearch] = useState(
    typeof searchFilterValue === 'string' ? searchFilterValue : '',
  );

  // Date range state
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(undefined);

  // Select state
  const selectFilterValue = column?.getFilterValue();
  const [checked, setChecked] = useState<Options<any> | undefined>(
    selectFilterValue as Options<any> | undefined,
  );

  // Effects for syncing with column filter values
  useEffect(() => {
    if (type === 'date-range') {
      const currentFilter: DateRange = column?.getFilterValue() as DateRange;
      if (currentFilter?.from && currentFilter?.to) {
        setSelectedRange({
          from: new Date(currentFilter.from),
          to: new Date(currentFilter.to),
        });
      } else {
        setSelectedRange(undefined);
      }
    }
  }, [column, type]);

  useEffect(() => {
    if (type === 'search') {
      setSearch(typeof searchFilterValue === 'string' ? searchFilterValue : '');
    }
  }, [searchFilterValue, type]);

  // Handler functions
  const handleSearchApply = () => {
    column?.setFilterValue(search);
    setIsOpen(false);
  };

  const handleDateRangeSelect = (range: DateRange | undefined) => {
    setSelectedRange(range);
    if (range?.from && range?.to) {
      column?.setFilterValue({
        from: range.from.toISOString(),
        to: range.to.toISOString(),
      });
      setIsOpen(false);
    }
  };

  const handleSelectApply = () => {
    column?.setFilterValue(checked);
    setIsOpen(false);
  };

  const handleReset = () => {
    table?.resetColumnFilters();
    table?.resetSorting();
    table?.resetRowSelection(true);
  };

  const getInputLocale = () => {
    if (locale) return locale;
    const browserLanguage = navigator.language || navigator.languages[0];
    return browserLanguage.includes('ru') ? ru : enUS;
  };

  // Icon and active state logic
  const getFilterIcon = () => {
    switch (type) {
      case 'search':
        return (
          <SearchIcon
            className={cn('text-foreground-tertiary', {
              'text-foreground-theme': !!searchFilterValue,
            })}
          />
        );
      case 'date-range':
        return (
          <CalendarOutlineIcon
            className={cn('text-foreground-tertiary', {
              'text-foreground-theme': !!selectedRange?.from && !!selectedRange?.to,
            })}
          />
        );
      case 'select':
        const isFiltered = Array.isArray(selectFilterValue)
          ? !!selectFilterValue.length &&
            !selectFilterValue.every(itm => excludeFilterValues?.includes(itm))
          : !!selectFilterValue;
        return (
          <ListFilter
            className={cn('text-foreground-tertiary', {
              'text-foreground-theme': !!isFiltered,
            })}
          />
        );
      case 'reset':
        const hasFilters =
          table?.getState()?.columnFilters?.length !== 0 ||
          (table?.getState()?.sorting?.length !== 0 && !!table?.getState()?.sorting);
        return (
          <FilterAltOffIcon
            className={cn('text-foreground-tertiary', {
              'text-foreground-theme cursor-pointer': hasFilters,
              'cursor-not-allowed': !hasFilters,
            })}
          />
        );
      default:
        return null;
    }
  };

  // Filter content based on type
  const renderFilterContent = () => {
    switch (type) {
      case 'search':
        return (
          <div className='flex flex-col gap-2 w-auto p-2 rounded-lg bg-background'>
            <Input value={search} onChange={e => setSearch(e.target.value)} />
            <Button variant='default' onClick={handleSearchApply}>
              {applyText || t('apply')}
            </Button>
          </div>
        );

      case 'date-range':
        return (
          <div className='w-auto p-0 rounded-lg'>
            <Calendar
              mode='range'
              locale={getInputLocale()}
              selected={selectedRange}
              onSelect={handleDateRangeSelect}
              className='bg-background rounded-lg'
              initialFocus
            />
          </div>
        );

      case 'select':
        return (
          <div className='flex flex-col gap-2 w-auto p-2 rounded-lg bg-background'>
            <SelectHeaderFilter
              checked={checked}
              onCheckedChange={setChecked}
              column={column}
              options={options}
              table={table}
            />
            <Button variant='default' onClick={handleSelectApply}>
              {applyText || t('apply')}
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  // Reset filter is a simple button, no popover
  if (type === 'reset') {
    return (
      <Button variant='ghost' size='icon' onClick={handleReset}>
        {getFilterIcon()}
      </Button>
    );
  }

  // Other filters use popover
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button className='p-1' variant='ghost' size='icon' icon={getFilterIcon()} />
      </PopoverTrigger>
      <PopoverContent className='w-auto rounded-lg bg-background p-0'>
        {renderFilterContent()}
      </PopoverContent>
    </Popover>
  );
};

export const FiltersColumnHeader = ({
  children,
  type,
  column,
  table,
  applyText,
  locale,
  options,
  excludeFilterValues,
  className,
}: FiltersColumnHeaderProps) => {
  return (
    <div className={cn('flex flex-row gap-2 items-center justify-between', className)}>
      {children}
      <FilterContent
        type={type}
        column={column}
        table={table}
        applyText={applyText}
        locale={locale}
        options={options}
        excludeFilterValues={excludeFilterValues}
      />
    </div>
  );
};
