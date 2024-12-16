import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonVariant } from './button';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import ArrowDropDown from '@/assets/arrow_drop_down.svg?react';
import CloseCircle from '@/assets/close_circle.svg?react';
import { NetworkErrorMessage } from './network-error-message';
import { Checkbox } from './checkbox';
import { Separator } from './separator';
import { cn } from '@/utils';

export type MultiSelectOptionType = {
  label: string;
  value: string;
  hidden?: boolean;
};

interface MultiSelectProps {
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
  renderOption?: (option: MultiSelectOptionType) => React.ReactNode;
  onRefetch?: () => void;
  onOpenChange?: (open: boolean) => void;
  onSearch?: (value: string) => void;
  onChange?: (value: string[]) => void;
  onClick?: () => void;
  onRemoveClick?: () => void;
}

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

  const handleSelect = (option: MultiSelectOptionType) => {
    let newValues = value.includes(option.value)
      ? value.filter(item => item !== option.value)
      : [...value, option.value];
    const isSelectedOverflow = maxSelected && newValues.length >= maxSelected;
    if (isSelectedOverflow) newValues = newValues.reverse().slice(0, maxSelected);
    onChange?.(newValues);
    onOpenChange?.(maxSelected === 1 ? false : true);
  };

  // modal={true} because of broken scroll in CommandList: https://github.com/shadcn-ui/ui/issues/542#issuecomment-1587142689

  const valueText = value
    .map(item =>
      (
        options.find(({ value }) => String(value) === String(item))?.label ||
        String(item) ||
        ''
      ).trim(),
    )
    .join(', ');

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
              {!value?.length && <span className='text-foreground text-sm'>{placeholder}</span>}
              <div className='truncate text-nowrap whitespace-nowrap' title={valueText}>
                {valueText}
              </div>
              <ArrowDropDown className='w-6 h-6 shrink-0 text-icon-fade-contrast' />
              {onRemoveClick && (
                <span className='flex items-center'>
                  <Separator orientation='vertical' className='w-px h-5 mr-2' />
                  <div
                    className='active:scale-90 transition-transform cursor-pointer'
                    onClick={e => {
                      e.stopPropagation();
                      onRemoveClick();
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
            <CommandInput placeholder={t('search')} value={search} onValueChange={setSearch} />
          )}
          <NetworkErrorMessage
            isLoading={isLoading}
            isError={isError}
            textSize='sm'
            center
            onRefetch={onRefetch}
          />
          {!isLoading && !isError && <CommandEmpty>{t('notFound')}</CommandEmpty>}
          <CommandList className='max-h-64 py-1 px-0 overflow-auto'>
            {options
              .filter(({ hidden }) => !hidden)
              .filter(option =>
                shouldFilter ? option.label.toLowerCase().includes(search.toLowerCase()) : true,
              )
              .map(option => (
                <CommandItem
                  key={option.value}
                  className={cn(
                    'rounded-none py-2 px-3 aria-selected:bg-background-theme-fade aria-selected:text-foreground ',
                    value.includes(option.value) && 'bg-background-theme-fade text-foreground',
                  )}
                  onSelect={() => handleSelect(option)}
                >
                  {renderOption ? (
                    <React.Fragment key={option.value}>{renderOption(option)}</React.Fragment>
                  ) : (
                    <>
                      <Checkbox className='mr-2' checked={value.includes(option.value)} />
                      {option.label}
                    </>
                  )}
                </CommandItem>
              ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { MultiSelect };
