import * as React from 'react';
import { FixedSizeList } from 'react-window';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/utils';
import ArrowDropDown from '@/assets/arrow_drop_down.svg?react';
import CancelOutline from '@/assets/cancel_outline.svg?react';
import CloseIcon from '@/assets/close.svg?react';
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
  showBadge?: boolean;
  maxVisibleRowsBadge?: number;
  defaultSearchedValue?: string;
  createLabel?: string;
  onCreate?: (query: string) => void;
  renderOption?: (option: MultiSelectOptionType, isChecked: boolean) => React.ReactNode;
  onRefetch?: () => void;
  onOpenChange?: (open: boolean) => void;
  onSearch?: (value: string) => void;
  onChange?: (value: string[], labels?: string[]) => void;
  onClick?: () => void;
  onRemoveClick?: () => void;
}

const MAX_HEIGHT = 340;
const ITEM_SIZE = 36;

const CommandAddItem = ({
  search,
  onCreate,
  createLabel,
}: {
  search: string;
  onCreate: () => void;
  createLabel?: string;
}) => {
  return (
    <div
      tabIndex={0}
      onClick={onCreate}
      onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
          onCreate();
        }
      }}
      className={cn(
        'flex w-full text-blue-500 cursor-pointer text-sm px-2 py-1.5 rounded-sm items-center focus:outline-none',
        'hover:bg-blue-200 focus:!bg-blue-200',
      )}
    >
      {createLabel} {search}
    </div>
  );
};

const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
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
      showBadge = false,
      maxVisibleRowsBadge,
      defaultSearchedValue,
      createLabel,
      onCreate,
      renderOption,
      onRefetch,
      onOpenChange,
      onSearch,
      onChange,
      onClick,
      onRemoveClick,
      ...props
    }: MultiSelectProps,
    ref,
  ) => {
    const { t } = useTranslation();
    const [search, setSearch] = React.useState(defaultSearchedValue || '');
    const [canCreateOption, setCanCreateOption] = React.useState(!!createLabel);

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

    React.useEffect(() => {
      if (createLabel) {
        const isAlreadyCreated = !options.some(
          option => option.label === search || option.value === search,
        );
        setCanCreateOption(!!(search && isAlreadyCreated));
      }
    }, [search, options]);

    const handleCreate = () => {
      if (search) {
        onCreate?.(search);
        handleSelect({ value: search, label: search });
      }
    };

    const handleSelect = (option: InternalMultiSelectOptionType | MultiSelectOptionType) => {
      if (!onChange) return;

      if (option.value === ALL_VALUE) {
        if (isAllSelected) {
          onChange([], []);
        } else {
          const [allValues, allLabels] = filteredActualOptions.reduce(
            (acc, opt) => {
              acc[0].push(opt.value);
              acc[1].push(opt.label);
              return acc;
            },
            [[], []] as [string[], string[]],
          );
          onChange(allValues, allLabels);
        }
        onOpenChange?.(maxSelected !== 1);
        return;
      }

      let newValues = value.includes(option.value)
        ? value.filter(item => item !== option.value)
        : [...value, option.value];

      const isSelectedOverflow = maxSelected && newValues.length >= maxSelected;
      if (isSelectedOverflow) newValues = newValues.reverse().slice(0, maxSelected);

      const newLabels = newValues.map(item => {
        const found = filteredActualOptions.find(({ value: optValue }) => optValue === item);
        return (found?.label || String(item)).trim();
      });
      onChange(newValues, newLabels);
      onOpenChange?.(maxSelected !== 1);
    };

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

    const valueText = React.useMemo(() => {
      if (isAllSelected && showAllOption) {
        return t('all');
      }

      return value
        .map(item =>
          (
            filteredActualOptions.find(({ value: optValue }) => optValue === item)?.label || item
          ).trim(),
        )
        .join(', ');
    }, [value, filteredActualOptions, isAllSelected, showAllOption, t]);

    const renderSelectedBadges = React.useCallback(() => {
      if (!showBadge) {
        return (
          <div className='truncate text-nowrap whitespace-nowrap' title={valueText}>
            {valueText}
          </div>
        );
      }

      const lineHeight = 28;
      let visibleBadges = [...value];
      let hiddenCount = 0;
      let isOverflow = false;

      if (maxVisibleRowsBadge) {
        const avgBadgeWidth = 120;
        const containerWidth = 300;
        const badgesPerRow = Math.floor(containerWidth / avgBadgeWidth) || 1;

        const maxVisibleBadges = maxVisibleRowsBadge * badgesPerRow;

        if (value.length > maxVisibleBadges) {
          visibleBadges = value.slice(0, maxVisibleBadges);
          hiddenCount = value.length - maxVisibleBadges;
          isOverflow = true;
        }
      }

      return (
        <div
          className={cn(
            'flex flex-wrap gap-1',
            maxVisibleRowsBadge && `max-h-[${maxVisibleRowsBadge * lineHeight}px] overflow-hidden`,
          )}
        >
          {visibleBadges.map(selectedValue => {
            const option = filteredActualOptions.find(opt => opt.value === selectedValue);
            if (option) {
              return (
                <div
                  key={option.value}
                  className='flex items-center justify-center bg-background-secondary rounded-full p-1 pl-3 text-xs gap-2'
                >
                  <span className='truncate whitespace-nowrap w-[100px]'>{option.label}</span>
                  <span
                    className='w-5 h-5 flex items-center justify-center cursor-pointer rounded-full bg-background-primary'
                    onClick={e => {
                      e.stopPropagation();
                      handleSelect(option);
                    }}
                  >
                    <CloseIcon className='w-4 h-4 bg-icon-tertiary text-foreground-tertiary' />
                  </span>
                </div>
              );
            }
            return null;
          })}

          {isOverflow && (
            <div className='flex items-center justify-center bg-background-secondary rounded-full px-3 py-1 text-xs gap-2'>
              +{hiddenCount}...
            </div>
          )}
        </div>
      );
    }, [value, filteredActualOptions, handleSelect, showBadge, maxVisibleRowsBadge]);

    return (
      <Popover open={open} onOpenChange={onOpenChange} modal={true} {...props}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant={variant}
            size='sm'
            role='combobox'
            aria-expanded={open}
            disabled={disabled}
            className={cn('w-full justify-between px-3 overflow-hidden', triggerClassName, {
              'h-auto overflow-visible hover:bg-[transparent] active:bg-[transparent]': showBadge,
            })}
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
                {renderSelectedBadges()}
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
                          onChange([], []);
                        }
                      }}
                    >
                      <CancelOutline className='min-h-6 min-w-6 text-icon-fade-contrast' />
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
            {!isLoading && !isError && !canCreateOption && (
              <CommandEmpty>{t('notFound')}</CommandEmpty>
            )}
            <CommandList className='py-1 px-0 overflow-hidden max-h-[340px]'>
              {canCreateOption && !!createLabel && options.length === 0 && (
                <CommandAddItem
                  search={search}
                  onCreate={() => handleCreate()}
                  createLabel={createLabel}
                />
              )}
              <FixedSizeList
                height={getListHeight()}
                itemCount={filteredOptions.length}
                itemSize={ITEM_SIZE}
                width='100%'
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
                          key={
                            typeof option.value === 'symbol' ? String(option.value) : option.value
                          }
                        >
                          {renderOption(option as MultiSelectOptionType, isChecked)}
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
  },
);

MultiSelect.displayName = 'MultiSelect';

export { MultiSelect };
