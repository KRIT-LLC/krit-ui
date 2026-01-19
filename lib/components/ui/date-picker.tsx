import * as React from 'react';
import {
  DayPickerMultipleProps,
  DayPickerRangeProps,
  DayPickerSingleProps,
  SelectMultipleEventHandler,
  SelectRangeEventHandler,
  SelectSingleEventHandler,
} from 'react-day-picker';
import {
  formatMultipleDatesMask,
  formatRangeMask,
  formatSingleDateMask,
  parseDateString,
  parseMultipleDatesString,
  parseRangeString,
  toRuDateString,
} from '@/date';
import { enUS, Locale, ru } from 'date-fns/locale';
import { useTranslation } from '@/hooks/useTranslation';
// TODO: Решить вопрос с локализацией
import { cn } from '@/utils';
import CalendarOutline from '@/assets/calendar_outline.svg?react';
import CloseCircleIcon from '@/assets/close_circle.svg?react';
import { Button } from './button';
import { Calendar } from './calendar';
import { Input } from './input';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export interface DateRange {
  from?: Date;
  to?: Date;
}

export interface DatePickerSingleProps extends DayPickerSingleProps {
  placeholder?: string;
  innerLabel?: string;
  value?: Date;
  onChange?: SelectSingleEventHandler;
  error?: string | boolean;
  readOnly?: boolean;
  iconClassName?: string;
  showReset?: boolean;
  onRemoveClick?: () => void;
}

export interface DatePickerMultipleProps extends DayPickerMultipleProps {
  placeholder?: string;
  innerLabel?: string;
  value?: Date[];
  onChange?: SelectMultipleEventHandler;
  error?: string | boolean;
  readOnly?: boolean;
  iconClassName?: string;
  showReset?: boolean;
  onRemoveClick?: () => void;
}

interface DatePickerRangeProps extends DayPickerRangeProps {
  placeholder?: string;
  innerLabel?: string;
  value?: DateRange;
  onChange?: SelectRangeEventHandler;
  error?: string | boolean;
  readOnly?: boolean;
  iconClassName?: string;
  showReset?: boolean;
  onRemoveClick?: () => void;
}

export type DatePickerProps =
  | DatePickerSingleProps
  | DatePickerMultipleProps
  | (DatePickerRangeProps & {
      locale?: Locale;
    });

/**
 * Универсальный компонент выбора даты с поддержкой различных режимов
 * @component
 * @param {Object} props - Свойства компонента
 * @param {'single' | 'multiple' | 'range'} [props.mode] - Режим выбора даты
 * @param {Date | Date[] | DateRange} [props.value] - Выбранные даты в зависимости от режима
 * @param {string} [props.placeholder] - Плейсхолдер для инпута. Если задан innerLabel, placeholder игнорируется в неактивном состоянии (резервируется место под маску).
 * @param {string} [props.innerLabel] - Метка, отображаемая перед значением с двоеточием. Если задана, резервирует место под маску, но скрывает её до фокуса.
 * @param {Function} [props.onChange] - Обработчик изменения даты
 * @param {string | boolean} [props.error] - Ошибка валидации
 * @param {boolean} [props.readOnly] - Режим только для чтения
 * @param {string} [props.iconClassName] - Дополнительные классы для иконки календаря
 * @param {Locale} [props.locale] - Локализация календаря
 * @param {boolean} [props.showReset] - Показывать кнопку сброса значения
 * @param {Function} [props.onRemoveClick] - Обработчик клика по кнопке сброса
 * @example
 * <DatePicker
 *   mode="single"
 *   value={new Date()}
 *   placeholder="Date filter"
 *   innerLabel="Дата"
 *   onChange={(date) => console.log(date)}
 *   showReset
 * />
 */
export function DatePicker({ className, locale, iconClassName, ...props }: DatePickerProps) {
  // Константы
  const { t } = useTranslation();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = React.useState<string>('');
  const [isInputMode, setIsInputMode] = React.useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const placeholder = 'placeholder' in props ? props.placeholder : undefined;
  const innerLabel = 'innerLabel' in props ? props.innerLabel : undefined;

  // Функции
  const getInputLocale = () => {
    if (locale) {
      return locale;
    }
    const browserLanguage = navigator.language || navigator.languages[0];
    return browserLanguage.includes('ru') ? ru : enUS;
  };

  const getDisplayValue = React.useCallback((): string => {
    switch (props.mode) {
      case 'single':
        return props.value ? toRuDateString(props.value) : '';
      case 'multiple':
        return props.value?.length ? props.value.map(toRuDateString).join(', ') : '';
      case 'range': {
        const value = props.selected || props.value;
        if (!value?.from) return '';
        const to = value?.to ? ' — ' + toRuDateString(value.to) : '';
        return toRuDateString(value.from) + to;
      }
      default:
        return '';
    }
  }, [props.mode, props.value, props.selected]);

  const getMaskPlaceholder = (): string => {
    switch (props.mode) {
      case 'single':
        return '__.__.__';
      case 'multiple':
        return '__.__.__, __.__.__';
      case 'range':
        return '__.__.__ — __.__.__';
      default:
        return '__.__.__';
    }
  };

  const hasValue = () => {
    switch (props.mode) {
      case 'single':
        return !!props.value;
      case 'multiple':
        return !!(props.value?.length && props.value.length > 0);
      case 'range': {
        const value = props.selected || props.value;
        return !!value?.from;
      }
    }
  };

  const handleInputFocus = () => {
    setIsInputMode(true);
    setIsPopoverOpen(true);
    const currentValue = getDisplayValue();
    // Если значение пустое, показываем маску, иначе текущее значение
    if (!currentValue) {
      setInputValue(getMaskPlaceholder());
      // Выделяем маску при фокусе, чтобы при вводе она заменялась
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.select();
        }
      }, 0);
    } else {
      setInputValue(currentValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.readOnly) return;

    const newValue = e.target.value;

    // Если пользователь начал вводить, убираем маску
    if (newValue === getMaskPlaceholder()) {
      setInputValue('');
      return;
    }

    let formattedValue = '';

    switch (props.mode) {
      case 'single':
        formattedValue = formatSingleDateMask(newValue);
        break;
      case 'multiple':
        formattedValue = formatMultipleDatesMask(newValue);
        break;
      case 'range':
        formattedValue = formatRangeMask(newValue);
        break;
    }

    setInputValue(formattedValue);
  };

  const handleInputBlur = () => {
    setIsInputMode(false);

    // Если значение пустое или равно маске, очищаем
    if (!props.onChange || inputValue.trim() === '' || inputValue === getMaskPlaceholder()) {
      setInputValue('');
      return;
    }

    const syntheticEvent = {} as React.MouseEvent<Element>;

    switch (props.mode) {
      case 'single': {
        const parsed = parseDateString(inputValue);
        if (parsed) {
          const handler = props.onChange as SelectSingleEventHandler;
          handler(parsed, parsed, {}, syntheticEvent);
        } else {
          setInputValue('');
        }
        break;
      }
      case 'multiple': {
        const parsed = parseMultipleDatesString(inputValue);
        if (parsed.length > 0) {
          const handler = props.onChange as SelectMultipleEventHandler;
          handler(parsed, new Date(), {}, syntheticEvent);
        } else {
          setInputValue('');
        }
        break;
      }
      case 'range': {
        const parsed = parseRangeString(inputValue);
        if (parsed && parsed.from) {
          const handler = props.onChange as SelectRangeEventHandler;
          const rangeValue: { from: Date; to?: Date } = {
            from: parsed.from,
            to: parsed.to,
          };
          handler(rangeValue, parsed.from, {}, syntheticEvent);
        } else {
          setInputValue('');
        }
        break;
      }
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (props.readOnly) return;

    if (props.onRemoveClick) {
      props.onRemoveClick();
      return;
    }

    if (!props.onChange) return;

    switch (props.mode) {
      case 'single': {
        const handler = props.onChange as SelectSingleEventHandler;
        handler(undefined, new Date(), {}, e);
        break;
      }
      case 'multiple': {
        const handler = props.onChange as SelectMultipleEventHandler;
        handler([], new Date(), {}, e);
        break;
      }
      case 'range': {
        const handler = props.onChange as SelectRangeEventHandler;
        handler({ from: undefined, to: undefined }, new Date(), {}, e);
        break;
      }
    }
  };

  // Нормализация выбора диапазона дат
  const createRangeHandler = (onChange?: SelectRangeEventHandler): SelectRangeEventHandler => {
    return (_, selectedDay, activeModifiers, e) => {
      if (!onChange || !selectedDay) return;

      const currentValue = props.selected || props.value;

      if (currentValue && typeof currentValue === 'object' && 'from' in currentValue) {
        const dateRange = currentValue as DateRange;

        if (!dateRange.from) {
          onChange({ from: selectedDay, to: undefined }, selectedDay, activeModifiers, e);
        } else if (!dateRange.to) {
          const newRange =
            selectedDay < dateRange.from
              ? { from: selectedDay, to: dateRange.from }
              : { from: dateRange.from, to: selectedDay };
          onChange(newRange, selectedDay, activeModifiers, e);
        } else {
          onChange({ from: selectedDay, to: undefined }, selectedDay, activeModifiers, e);
        }
      } else {
        // Fallback for initial state.
        onChange({ from: selectedDay, to: undefined }, selectedDay, activeModifiers, e);
      }
    };
  };

  const modifiedProps = {
    ...props,
    selected: props.selected || props.value,
    onSelect:
      props.onSelect ||
      (props.mode === 'range' ? createRangeHandler(props.onChange) : props.onChange),
  } as DatePickerProps;

  // useEffect
  React.useEffect(() => {
    if (!isInputMode) {
      setInputValue(getDisplayValue());
    }
  }, [props.value, props.selected, props.mode, isInputMode, getDisplayValue]);

  const valueText = isInputMode ? inputValue : hasValue() ? getDisplayValue() : '';
  const maskPlaceholder = getMaskPlaceholder();
  const defaultPlaceholder = placeholder || t('selectDate');

  const placeholderText = !hasValue() && !isInputMode ? (innerLabel ? '' : defaultPlaceholder) : '';

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'fade-contrast-outlined'}
          size={'sm'}
          className={cn(
            'justify-start text-left font-normal px-3 text-sm focus-visible:outline-none focus-visible:border-line-focused data-[state=open]:border-line-focused w-full',
            !hasValue() && !isInputMode && 'text-foreground-secondary',
            props.error ? 'border-line-error focus-visible:border-line-error' : '',
            className,
            props.readOnly && 'cursor-not-allowed pointer-events-none opacity-95',
          )}
          onClick={() => {
            if (!props.readOnly) {
              setIsPopoverOpen(true);
              inputRef.current?.focus();
            }
          }}
        >
          <div
            className='flex items-center flex-shrink-0'
            onClick={e => {
              e.stopPropagation();
              if (!props.readOnly) {
                setIsPopoverOpen(true);
                inputRef.current?.focus();
              }
            }}
          >
            {innerLabel && (
              <span className='text-foreground-secondary font-normal mr-1 whitespace-nowrap'>
                {innerLabel}:
              </span>
            )}
            <div className="inline-grid [grid-template-areas:'stack'] items-center min-w-[20px] w-fit">
              {/* Скрытые элементы для вычисления ширины (берется максимальная) */}
              {/* 1. Маска задает базовую ширину */}
              <span
                aria-hidden='true'
                className='[grid-area:stack] invisible whitespace-pre px-0 py-0 text-sm font-normal tracking-[0.1px] leading-5 pointer-events-none'
              >
                {maskPlaceholder}
              </span>
              {/* 2. Плейсхолдер (если нет innerLabel) */}
              {!innerLabel && defaultPlaceholder && (
                <span
                  aria-hidden='true'
                  className='[grid-area:stack] invisible whitespace-pre px-0 py-0 text-sm font-normal tracking-[0.1px] leading-5 pointer-events-none'
                >
                  {defaultPlaceholder}
                </span>
              )}
              {/* 3. Текущее значение */}
              <span
                aria-hidden='true'
                className='[grid-area:stack] invisible whitespace-pre px-0 py-0 text-sm font-normal tracking-[0.1px] leading-5 pointer-events-none'
              >
                {valueText || ' '}
              </span>

              <Input
                ref={inputRef}
                type='text'
                value={valueText}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                placeholder={placeholderText}
                className='[grid-area:stack] w-[0px] min-w-full h-auto border-none px-0 py-0 !bg-transparent'
                readOnly={props.readOnly}
              />
            </div>
          </div>
          {(props.showReset || props.onRemoveClick) && hasValue() ? (
            <div
              className={cn(
                'flex items-center justify-center w-6 h-6 shrink-0 cursor-pointer ml-auto',
                props.readOnly && 'cursor-not-allowed opacity-50',
              )}
              onClick={handleReset}
            >
              <CloseCircleIcon className='w-6 h-6 text-icon-fade-contrast' />
            </div>
          ) : (
            <CalendarOutline className={cn('ml-auto text-foreground-secondary', iconClassName)} />
          )}
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
