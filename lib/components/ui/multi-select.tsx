import * as React from 'react';
import { FixedSizeList } from 'react-window';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/utils';
import ArrowDropDown from '@/assets/arrow_drop_down.svg?react';
import CloseCircle from '@/assets/close_circle.svg?react';
import { Button, ButtonVariant } from './button';
import { Checkbox } from './checkbox';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from './command';
import { NetworkErrorMessage } from './network-error-message';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Separator } from './separator';

const ALL_VALUE = Symbol('all');

export type MultiSelectOptionType = {
  label: string;
  value: string;
  hidden?: boolean;
  disabled?: boolean;
};

type InternalMultiSelectOptionType = {
  label: string;
  value: string | typeof ALL_VALUE;
  hidden?: boolean;
  disabled?: boolean;
};

export interface MultiSelectProps {
  className?: string;
  triggerClassName?: string;
  variant?: ButtonVariant;
  placeholder?: string;
  options: MultiSelectOptionType[];
  value: string[];
  maxSelected?: number;
  shouldFilter?: boolean;
  open?: boolean;
  children?: React.ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  disabled?: boolean;
  searchPlaceholder?: string;
  showAllOption?: boolean;
  showReset?: boolean;
  required?: boolean;
  renderOption?: (option: MultiSelectOptionType) => React.ReactNode;
  onRefetch?: () => void;
  onOpenChange?: (open: boolean) => void;
  onSearch?: (value: string) => void;
  onChange?: (value: string[]) => void;
  onClick?: () => void;
  onRemoveClick?: () => void;
}

const MAX_HEIGHT = 340;
const ITEM_SIZE = 36;

function MultiSelect({
  className,
  triggerClassName,
  variant = 'secondary-outline',
  placeholder,
  options,
  value,
  maxSelected,
  shouldFilter = true,
  open,
  children,
  isLoading,
  isError,
  disabled,
  searchPlaceholder,
  showAllOption = false,
  showReset,
  required,
  renderOption,
  onRefetch,
  onOpenChange,
  onSearch,
  onChange,
  onClick,
  onRemoveClick,
  ...props
}: MultiSelectProps) {
  const { t } = useTranslation();
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    onSearch?.(search);
  }, [search]);

  const filteredActualOptions = React.useMemo(
    () => options.filter(option => !option.hidden),
    [options],
  );

  const allOption: InternalMultiSelectOptionType = { label: t('all'), value: ALL_VALUE };

  const isAllSelected =
    filteredActualOptions.length > 0 &&
    filteredActualOptions.every(option => value.includes(option.value));

  const internalOptions: InternalMultiSelectOptionType[] = React.useMemo(
    () => options.map(opt => ({ ...opt })),
    [options],
  );

  const handleSelect = (option: InternalMultiSelectOptionType | MultiSelectOptionType) => {
    if (!onChange) return;

    if (option.value === ALL_VALUE) {
      if (isAllSelected) {
        onChange([]);
      } else {
        const allValues = filteredActualOptions.map(opt => opt.value);
        onChange(allValues);
      }
      onOpenChange?.(maxSelected !== 1);
      return;
    }

    let newValues = value.includes(option.value)
      ? value.filter(item => item !== option.value)
      : [...value, option.value];

    const isSelectedOverflow = maxSelected && newValues.length >= maxSelected;
    if (isSelectedOverflow) newValues = newValues.reverse().slice(0, maxSelected);

    onChange(newValues);
    onOpenChange?.(maxSelected !== 1);
  };

  const valueText = React.useMemo(() => {
    if (isAllSelected && showAllOption) {
      return t('all');
    }

    return value
      .map(item => (options.find(({ value: optValue }) => optValue === item)?.label || item).trim())
      .join(', ');
  }, [value, options, isAllSelected, showAllOption, t]);

  const displayOptions = React.useMemo(() => {
    return showAllOption ? [allOption, ...internalOptions] : internalOptions;
  }, [showAllOption, allOption, internalOptions]);

  const filteredOptions = React.useMemo(() => {
    if (shouldFilter) {
      return displayOptions
        .filter(({ hidden }) => !hidden)
        .filter(option =>
          shouldFilter ? option.label.toLowerCase().includes(search.toLowerCase()) : true,
        );
    }
    return displayOptions;
  }, [displayOptions, search, shouldFilter]);

  const getListHeight = React.useCallback(() => {
    const totalHeight = filteredOptions.length * ITEM_SIZE;
    return Math.min(totalHeight, MAX_HEIGHT);
  }, [filteredOptions]);

  return (
    <Popover open={open} onOpenChange={onOpenChange} modal={true} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant={variant}
          size='sm'
          role='combobox'
          aria-expanded={open}
          disabled={disabled}
          className={cn('w-full justify-between px-3 overflow-hidden', triggerClassName)}
          onClick={onClick || (() => onOpenChange?.(!open))}
        >
          {children || (
            <>
              {!value?.length && (
                <span className='text-muted-foreground text-sm'>
                  {placeholder}
                  {required && <span className='text-foreground-error ml-1'>*</span>}
                </span>
              )}
              <div className='truncate text-nowrap whitespace-nowrap' title={valueText}>
                {valueText}
              </div>
              <ArrowDropDown className='w-6 h-6 shrink-0 text-icon-fade-contrast ml-auto' />
              {(showReset || onRemoveClick) && valueText && (
                <span className='flex items-center'>
                  <Separator orientation='vertical' className='w-px h-5 mr-2' />
                  <div
                    className='active:scale-90 transition-transform cursor-pointer'
                    onClick={e => {
                      e.stopPropagation();
                      if (onRemoveClick) {
                        onRemoveClick();
                      } else if (showReset && onChange) {
                        onChange([]);
                      }
                    }}
                  >
                    <CloseCircle className='min-h-6 min-w-6 text-icon-fade-contrast' />
                  </div>
                </span>
              )}
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0 min-w-[var(--radix-popover-trigger-width)] overflow-auto'>
        <Command shouldFilter={false} className={className}>
          {shouldFilter && (
            <CommandInput
              placeholder={searchPlaceholder || t('search')}
              value={search}
              onValueChange={setSearch}
            />
          )}
          <NetworkErrorMessage
            isLoading={isLoading}
            isError={isError}
            textSize='sm'
            center
            onRefetch={onRefetch}
          />
          {!isLoading && !isError && <CommandEmpty>{t('notFound')}</CommandEmpty>}
          <CommandList className='py-1 px-0 overflow-hidden max-h-[340px]'>
            <FixedSizeList
              height={getListHeight()}
              itemCount={filteredOptions.length}
              itemSize={36}
              width={'100%'}
            >
              {({ index, style }) => {
                const option = filteredOptions[index];
                const isChecked =
                  option.value === ALL_VALUE
                    ? isAllSelected
                    : value.includes(option.value as string);

                return (
                  <CommandItem
                    style={style}
                    key={typeof option.value === 'symbol' ? String(option.value) : option.value}
                    className={cn(
                      'relative flex cursor-default select-none items-center text-sm outline-none rounded-none py-2 px-3 aria-selected:bg-background-theme-fade aria-selected:text-foreground',
                      isChecked && 'bg-background-theme-fade text-foreground',
                    )}
                    onSelect={() => handleSelect(option)}
                    disabled={option?.disabled}
                  >
                    {renderOption && option.value !== ALL_VALUE ? (
                      <React.Fragment
                        key={typeof option.value === 'symbol' ? String(option.value) : option.value}
                      >
                        {renderOption(option as MultiSelectOptionType)}
                      </React.Fragment>
                    ) : (
                      <>
                        <Checkbox
                          className='mr-2'
                          checked={isChecked}
                          disabled={option?.disabled}
                        />
                        <span title={option.label} className='truncate'>
                          {option.label}
                        </span>
                      </>
                    )}
                  </CommandItem>
                );
              }}
            </FixedSizeList>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { MultiSelect };
