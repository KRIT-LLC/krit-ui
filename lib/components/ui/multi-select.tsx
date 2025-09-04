import * as React from 'react';
import { FixedSizeList } from 'react-window';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/utils';
import ArrowDropDown from '@/assets/arrow_drop_down.svg?react';
import CancelOutline from '@/assets/cancel_outline.svg?react';
import CloseIcon from '@/assets/close.svg?react';
import ExpandMoreIcon from '@/assets/expand_more.svg?react';
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
  children?: MultiSelectOptionType[];
};

type InternalMultiSelectOptionType = {
  label: string;
  value: string | typeof ALL_VALUE;
  hidden?: boolean;
  disabled?: boolean;
  children?: MultiSelectOptionType[];
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
    }, [search, onSearch]);

    const filteredActualOptions = React.useMemo(() => {
      const flat: MultiSelectOptionType[] = [];
      options.forEach(opt => {
        const children = (opt as unknown as InternalMultiSelectOptionType)?.children as
          | MultiSelectOptionType[]
          | undefined;
        if (Array.isArray(children) && children.length > 0) {
          children.forEach(child => {
            if (!child.hidden) flat.push(child);
          });
        } else {
          if (!opt.hidden) flat.push(opt);
        }
      });
      return flat;
    }, [options]);

    const allOption: InternalMultiSelectOptionType = React.useMemo(
      () => ({ label: t('all'), value: ALL_VALUE }),
      [t],
    );

    const isAllSelected =
      filteredActualOptions.length > 0 &&
      filteredActualOptions.every(option => value.includes(option.value));

    const internalOptions: InternalMultiSelectOptionType[] = React.useMemo(
      () => options.map(opt => ({ ...opt })),
      [options],
    );

    const hasGroups = React.useMemo(
      () =>
        internalOptions.some(
          opt =>
            Array.isArray((opt as InternalMultiSelectOptionType).children) &&
            ((opt as InternalMultiSelectOptionType).children?.length || 0) > 0,
        ),
      [internalOptions],
    );

    const [expandedGroups, setExpandedGroups] = React.useState<Record<string, boolean>>({});

    React.useEffect(() => {
      if (!hasGroups) return;
      setExpandedGroups(prev => {
        const next: Record<string, boolean> = { ...prev };
        internalOptions.forEach(opt => {
          const key = String(opt.value);
          if (typeof opt.value !== 'symbol') {
            if (next[key] === undefined) next[key] = false;
          }
        });
        return next;
      });
    }, [internalOptions, hasGroups]);

    const toggleGroup = React.useCallback((groupValue: string | typeof ALL_VALUE) => {
      if (typeof groupValue === 'symbol') return;
      setExpandedGroups(prev => ({ ...prev, [groupValue]: !prev[groupValue] }));
    }, []);

    React.useEffect(() => {
      if (createLabel) {
        const isAlreadyCreated = !options.some(
          option => option.label === search || option.value === search,
        );
        setCanCreateOption(!!(search && isAlreadyCreated));
      }
    }, [search, options, createLabel]);

    const handleCreate = () => {
      if (search) {
        onCreate?.(search);
        handleSelect({ value: search, label: search });
      }
    };

    const handleSelect = React.useCallback(
      (option: InternalMultiSelectOptionType | MultiSelectOptionType) => {
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
      },
      [onChange, isAllSelected, filteredActualOptions, onOpenChange, maxSelected, value],
    );

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
    }, [value, filteredActualOptions, handleSelect, showBadge, maxVisibleRowsBadge, valueText]);

    const itemBaseClass =
      'relative flex cursor-default select-none items-center text-sm outline-none rounded-none py-2 px-3 aria-selected:bg-background-theme-fade aria-selected:text-foreground';

    const getOptionKey = React.useCallback(
      (opt: InternalMultiSelectOptionType | MultiSelectOptionType): string =>
        String((opt as InternalMultiSelectOptionType).value),
      [],
    );

    const renderItemContent = React.useCallback(
      (opt: InternalMultiSelectOptionType | MultiSelectOptionType, isChecked: boolean) => {
        const val = (opt as InternalMultiSelectOptionType).value;
        if (renderOption && val !== ALL_VALUE) {
          return (
            <React.Fragment key={getOptionKey(opt)}>
              {renderOption(opt as MultiSelectOptionType, isChecked)}
            </React.Fragment>
          );
        }
        return (
          <>
            <Checkbox className='mr-2' checked={isChecked} disabled={opt?.disabled} />
            <span title={opt.label} className='truncate'>
              {opt.label}
            </span>
          </>
        );
      },
      [renderOption, getOptionKey],
    );

    const renderCommandItem = React.useCallback(
      ({
        opt,
        isChecked,
        style,
        hidden,
        onSelect,
      }: {
        opt: InternalMultiSelectOptionType | MultiSelectOptionType;
        isChecked: boolean;
        style?: React.CSSProperties;
        hidden?: boolean;
        onSelect?: () => void;
      }) => (
        <CommandItem
          style={style}
          key={getOptionKey(opt)}
          className={cn(
            itemBaseClass,
            isChecked && 'bg-background-theme-fade text-foreground',
            hidden && 'hidden',
          )}
          onSelect={onSelect || (() => handleSelect(opt))}
          disabled={opt?.disabled}
        >
          {renderItemContent(opt, isChecked)}
        </CommandItem>
      ),
      [getOptionKey, itemBaseClass, handleSelect, renderItemContent],
    );

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
            <CommandList
              className={cn(
                'py-1 px-0 max-h-[340px]',
                hasGroups ? 'overflow-auto' : 'overflow-hidden',
              )}
            >
              {canCreateOption && !!createLabel && options.length === 0 && (
                <CommandAddItem
                  search={search}
                  onCreate={() => handleCreate()}
                  createLabel={createLabel}
                />
              )}
              {!hasGroups ? (
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

                    return renderCommandItem({ opt: option, isChecked, style });
                  }}
                </FixedSizeList>
              ) : (
                <div className='flex flex-col'>
                  {showAllOption &&
                    renderCommandItem({
                      opt: allOption,
                      isChecked: isAllSelected,
                      onSelect: () => handleSelect(allOption),
                    })}

                  {internalOptions.map(opt => {
                    const group = opt as InternalMultiSelectOptionType;
                    const groupKey = String(group.value);
                    const children = group.children || [];
                    const isGroup = Array.isArray(children);

                    // Search filtering per group/children (does not affect expand/collapse visibility)
                    const matchesSearch = shouldFilter
                      ? group.label.toLowerCase().includes(search.toLowerCase())
                      : true;
                    const visibleChildren = shouldFilter
                      ? children.filter(c =>
                          (c.label || '').toLowerCase().includes(search.toLowerCase()),
                        )
                      : children;

                    if (isGroup) {
                      const expanded = !!expandedGroups[groupKey];
                      return (
                        <div key={groupKey} className='flex flex-col'>
                          <div
                            className={cn(
                              'flex items-center text-sm px-3 py-2 cursor-pointer select-none',
                              'hover:bg-background-theme-fade',
                              group.disabled && 'opacity-60 pointer-events-none',
                              !matchesSearch && visibleChildren.length === 0 && 'hidden',
                            )}
                            onClick={() => toggleGroup(group.value)}
                          >
                            <ExpandMoreIcon
                              className={cn(
                                'w-4 h-4 mr-2 text-icon-fade-contrast transition-transform',
                                expanded ? 'rotate-180' : 'rotate-0',
                              )}
                            />
                            <span title={group.label} className='truncate'>
                              {group.label}
                            </span>
                          </div>

                          <div
                            className={cn(
                              'pl-6 overflow-hidden transition-[max-height] duration-200 ease-in-out',
                              expanded ? 'max-h-[999px]' : 'max-h-0',
                            )}
                          >
                            {children.length === 0 ? (
                              <div className='py-2 px-3 text-sm text-muted-foreground select-none'>
                                {t('notFound')}
                              </div>
                            ) : (
                              visibleChildren.map(child =>
                                renderCommandItem({
                                  opt: child,
                                  isChecked: value.includes(child.value),
                                  onSelect: () => handleSelect(child),
                                }),
                              )
                            )}
                          </div>
                        </div>
                      );
                    }

                    // Render as a simple item if no children
                    const isChecked = value.includes(group.value as string);
                    const itemHidden = shouldFilter
                      ? !group.label.toLowerCase().includes(search.toLowerCase())
                      : false;
                    return renderCommandItem({
                      opt: group,
                      isChecked,
                      hidden: itemHidden,
                      onSelect: () => handleSelect(group),
                    });
                  })}
                </div>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);

MultiSelect.displayName = 'MultiSelect';

export { MultiSelect };
