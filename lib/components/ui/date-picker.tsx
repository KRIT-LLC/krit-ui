import {
  DayPickerMultipleProps,
  DayPickerRangeProps,
  DayPickerSingleProps,
  SelectMultipleEventHandler,
  SelectRangeEventHandler,
  SelectSingleEventHandler,
} from 'react-day-picker';
import { toRuDateString } from '@/date';
import { enUS, Locale, ru } from 'date-fns/locale';
import { useTranslation } from '@/hooks/useTranslation';
// TODO: Решить вопрос с локализацией
import { cn } from '@/utils';
import CalendarOutline from '@/assets/calendar_outline.svg?react';
import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export interface DatePickerSingleProps extends DayPickerSingleProps {
  placeholder?: string;
  value?: Date;
  onChange?: SelectSingleEventHandler;
  error?: string | boolean;
  readOnly?: boolean;
}

export interface DatePickerMultipleProps extends DayPickerMultipleProps {
  placeholder?: string;
  value?: Date[];
  onChange?: SelectMultipleEventHandler;
  error?: string | boolean;
  readOnly?: boolean;
}

export interface DateRange {
  from?: Date;
  to?: Date;
}

interface DatePickerRangeProps extends DayPickerRangeProps {
  placeholder?: string;
  value?: DateRange;
  onChange?: SelectRangeEventHandler;
  error?: string | boolean;
  readOnly?: boolean;
}

export type DatePickerProps =
  | DatePickerSingleProps
  | DatePickerMultipleProps
  | (DatePickerRangeProps & {
      locale?: Locale;
    });

export function DatePicker({ className, locale, ...props }: DatePickerProps) {
  const { t } = useTranslation();
  const placeholder = (
    <span className='text-foreground-tertiary font-normal'>
      {props.placeholder || t('selectDate')}
    </span>
  );
  const getInputLocale = () => {
    if (locale) {
      return locale;
    }
    const browserLanguage = navigator.language || navigator.languages[0];
    return browserLanguage.includes('ru') ? ru : enUS;
  };

  const formatValue = () => {
    switch (props.mode) {
      case 'single':
        return props.value ? toRuDateString(props.value) : placeholder;
      case 'multiple':
        return props.value?.length ? props.value.map(toRuDateString).join(', ') : placeholder;
      case 'range': {
        const value = props.selected || props.value;
        const to = value?.to ? ' — ' + toRuDateString(value?.to) : '';
        return value?.from ? toRuDateString(value.from) + to : placeholder;
      }
    }
  };

  const modifiedProps = {
    ...props,
    selected: props.selected || props.value,
    onSelect: props.onSelect || props.onChange,
  } as DatePickerProps;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'secondary-outline'}
          size={'sm'}
          className={cn(
            'w-full justify-start text-left font-normal px-3 text-sm focus-visible:outline-none focus-visible:border-line-focused data-[state=open]:border-line-focused',
            !props.value && 'text-foreground-secondary',
            props.error ? 'border-line-error focus-visible:border-line-error' : '',
            className,
            props.readOnly && 'cursor-not-allowed pointer-events-none opacity-95',
          )}
        >
          {formatValue()}
          <CalendarOutline className='ml-auto text-foreground-secondary' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0 rounded-lg'>
        <Calendar
          className='bg-background rounded-lg'
          locale={getInputLocale()}
          {...modifiedProps}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
