import { enUS, Locale, ru } from 'date-fns/locale';
import {
  DayPickerMultipleProps,
  DayPickerRangeProps,
  DayPickerSingleProps,
  SelectMultipleEventHandler,
  SelectRangeEventHandler,
  SelectSingleEventHandler,
} from 'react-day-picker';
import { useTranslation } from 'react-i18next'; // TODO: Решить вопрос с локализацией
import { cn } from '@/utils';
import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { toRuDateString } from '@/date';
import CalendarOutline from '@/assets/calendar_outline.svg?react';

export interface DatePickerSingleProps extends DayPickerSingleProps {
  placeholder?: string;
  value?: Date;
  onChange?: SelectSingleEventHandler;
}

export interface DatePickerMultipleProps extends DayPickerMultipleProps {
  placeholder?: string;
  value?: Date[];
  onChange?: SelectMultipleEventHandler;
}

export interface DateRange {
  from?: Date;
  to?: Date;
}

interface DatePickerRangeProps extends DayPickerRangeProps {
  placeholder?: string;
  value?: DateRange;
  onChange?: SelectRangeEventHandler;
}

export type DatePickerProps =
  | DatePickerSingleProps
  | DatePickerMultipleProps
  | (DatePickerRangeProps & {
      locale?: Locale;
    });

export function DatePicker({ className, locale, ...props }: DatePickerProps) {
  const { t, i18n } = useTranslation();
  const placeholder = (
    <span className='text-foreground-secondary font-normal'>
      {props.placeholder || t('selectDate')}
    </span>
  );
  const getInputLocale = () => {
    if (locale) {
      return locale;
    }
    return i18n.language?.includes('ru') ? ru : enUS;
  };

  const formatValue = () => {
    switch (props.mode) {
      case 'single':
        return props.value ? toRuDateString(props.value) : placeholder;
      case 'multiple':
        return props.value?.length ? props.value.map(toRuDateString).join(', ') : placeholder;
      case 'range': {
        const to = props.value?.to ? ' — ' + toRuDateString(props.value?.to) : '';
        return props.value?.from ? toRuDateString(props.value.from) + to : placeholder;
      }
    }
  };

  const modifiedProps = {
    ...props,
    selected: props.value,
    onSelect: props.onChange,
  } as DatePickerProps;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'secondary-outline'}
          size={'sm'}
          className={cn(
            'w-full justify-start text-left px-4 font-normal pr-1.5 text-sm',
            !props.value && 'text-foreground-secondary',
            className,
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
