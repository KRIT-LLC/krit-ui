import * as React from 'react';
import { DayPicker, type DropdownProps } from 'react-day-picker';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cn } from '@/utils';
import ChevronLeftOutline from '@/assets/chevron_left_outline.svg?react';
import ChevronRightOutline from '@/assets/chevron_right_outline.svg?react';
import { buttonVariants } from './buttonVariants';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

type CalendarClassNames = NonNullable<CalendarProps['classNames']>;
type LegacyCalendarClassNames = CalendarClassNames &
  Partial<
    Record<
      | 'day_today'
      | 'day_selected'
      | 'day_range_start'
      | 'day_range_end'
      | 'day_range_middle'
      | 'day_outside'
      | 'day_disabled'
      | 'day_hidden',
      string
    >
  >;

const normalizeCalendarClassNames = (
  classNames?: CalendarProps['classNames'],
): CalendarProps['classNames'] => {
  if (!classNames) return undefined;

  const {
    day_today,
    day_selected,
    day_range_start,
    day_range_end,
    day_range_middle,
    day_outside,
    day_disabled,
    day_hidden,
    ...restClassNames
  } = classNames as LegacyCalendarClassNames;

  return {
    ...restClassNames,
    ...(day_today && { today: cn(restClassNames.today, day_today) }),
    ...(day_selected && { selected: cn(restClassNames.selected, day_selected) }),
    ...(day_range_start && { range_start: cn(restClassNames.range_start, day_range_start) }),
    ...(day_range_end && { range_end: cn(restClassNames.range_end, day_range_end) }),
    ...(day_range_middle && { range_middle: cn(restClassNames.range_middle, day_range_middle) }),
    ...(day_outside && { outside: cn(restClassNames.outside, day_outside) }),
    ...(day_disabled && { disabled: cn(restClassNames.disabled, day_disabled) }),
    ...(day_hidden && { hidden: cn(restClassNames.hidden, day_hidden) }),
  };
};

/**
 * Календарь для выбора дат с настраиваемыми стилями и элементами управления
 *
 * @component
 * @param {Object} props - Пропсы компонента календаря
 * @param {string} [props.className] - Дополнительные классы CSS для стилизации
 * @param {Object} [props.classNames] - Дополнительные классы для элементов календаря
 * @param {boolean} [props.showOutsideDays=true] - Показывать дни из соседних месяцев
 * @returns {JSX.Element} Компонент календаря
 */
function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  const normalizedClassNames = normalizeCalendarClassNames(classNames);

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout='dropdown'
      navLayout='around'
      startMonth={new Date(new Date().getFullYear() - 6, 0)}
      endMonth={new Date(new Date().getFullYear() + 6, 11)}
      className={cn('relative w-fit p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'relative space-y-4',
        dropdowns:
          'flex items-center justify-center gap-2 text-[15px] capitalize font-medium max-w-[calc(100%-3.5rem)] mx-auto',
        months_dropdown: 'flex [&>select:focus-visible]:outline-none [&>select]:capitalize',
        years_dropdown: 'flex [&>select:focus-visible]:outline-none',
        month_caption: 'relative flex h-7 w-full items-center justify-center',
        caption_label: 'hidden',
        button_previous: cn(
          buttonVariants({ variant: 'fade-contrast-outlined' }),
          'absolute left-0 top-0 z-30 h-7 w-7 shrink-0 bg-[transparent] border-none text-primary p-0 hover:bg-[transparent] hover:text-primary/80',
        ),
        button_next: cn(
          buttonVariants({ variant: 'fade-contrast-outlined' }),
          'absolute right-0 top-0 z-30 h-7 w-7 shrink-0 bg-[transparent] border-none text-primary p-0 hover:bg-[transparent] hover:text-primary/80',
        ),
        month_grid: 'w-full border-collapse space-y-1',
        weekdays: 'flex',
        weekday: 'text-foreground-secondary rounded-md w-9 font-normal text-[0.8rem]',
        week: 'flex w-full mt-2',
        day: cn(
          'h-9 w-9 p-0 text-center relative focus-within:relative focus-within:z-20',
          '[&.day-range-start]:rounded-l-md [&.day-range-end]:rounded-r-md',
          '[&.day-range-middle]:bg-background-tertiary',
          '[&.day-range-start_button]:rounded-md [&.day-range-end_button]:rounded-md',
        ),
        day_button: cn(
          buttonVariants({ variant: 'fade-contrast-transparent' }),
          'h-9 w-9 p-0 text-sm font-normal transition-all hover:bg-background-success-fade hover:text-foreground',
          '[td[aria-selected=true]_&]:opacity-100',
        ),
        range_start:
          'day-range-start rounded-l-md [&_button]:!rounded-md [&_button]:!bg-background-theme [&_button]:!text-foreground-on-contrast [&_button]:!opacity-100 [&_button]:hover:!bg-background-theme/80',
        range_end:
          'day-range-end rounded-r-md [&_button]:!rounded-md [&_button]:!bg-background-theme [&_button]:!text-foreground-on-contrast [&_button]:!opacity-100 [&_button]:hover:!bg-background-theme/80',
        selected:
          '[&:not(.day-range-middle)_button]:bg-background-theme [&:not(.day-range-middle)_button]:text-foreground-on-contrast [&:not(.day-range-middle)_button]:hover:bg-background-theme/80 [&:not(.day-range-middle)_button]:hover:text-foreground-on-contrast [&:not(.day-range-middle)_button]:focus:bg-background-theme [&:not(.day-range-middle)_button]:focus:text-foreground-on-contrast',
        today:
          'day-today !font-bold [&_button]:!font-bold [&:not(.day-range-start):not(.day-range-end)_button]:bg-background-tertiary [&:not(.day-range-start):not(.day-range-end)_button]:text-foreground-theme [&:not(.day-range-start):not(.day-range-end)_button]:hover:bg-background-tertiary [&[aria-selected=true]:not(.day-range-start):not(.day-range-end):not(.day-range-middle)_button]:!bg-background-theme [&[aria-selected=true]:not(.day-range-start):not(.day-range-end):not(.day-range-middle)_button]:!text-foreground-on-contrast [&[aria-selected=true]:not(.day-range-start):not(.day-range-end):not(.day-range-middle)_button]:hover:!bg-background-theme/80',
        outside:
          'day-outside [&_button]:text-foreground-secondary [&_button]:opacity-50 [&_button]:hover:text-foreground/90 [&[aria-selected=true]_button]:!opacity-100 [&[aria-selected=true]_button]:!text-foreground-on-contrast',
        disabled: '[&_button]:text-foreground-secondary [&_button]:opacity-50',
        range_middle:
          'day-range-middle bg-background-tertiary [&_button]:!bg-transparent [&_button]:!font-normal [&_button]:text-foreground [&_button]:rounded-none [&_button]:hover:!bg-transparent [&_button]:hover:text-foreground',
        hidden: 'invisible',
        ...normalizedClassNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === 'left' ? <ChevronLeftOutline /> : <ChevronRightOutline />,
        /**
         * Кастомный компонент Dropdown для выбора месяца/года
         * @param {DropdownProps} props - Пропсы dropdown компонента
         */
        Dropdown: ({ options, ...props }: DropdownProps) => {
          return (
            <SelectPrimitive.Root
              name={props.name}
              value={props.value?.toString()}
              onValueChange={value =>
                props.onChange?.({ target: { value } } as React.ChangeEvent<HTMLSelectElement>)
              }
            >
              <SelectTrigger
                className={cn(
                  props.className,
                  'bg-[transparent] border-none shadow-none p-0 gap-0 h-auto hover:bg-[transparent] focus:border-none focus-visible:border-none data-[state=open]:bg-[transparent] capitalize font-bold [&>svg]:ml-1 [&>span]:pr-1',
                )}
              >
                <SelectValue placeholder={props['aria-label']} />
              </SelectTrigger>
              <SelectContent>
                {options?.map(option => (
                  <SelectItem
                    key={option.value}
                    value={option.value.toString()}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectPrimitive.Root>
          );
        },
      }}
      {...props}
    />
  );
}

Calendar.displayName = 'Calendar';

export { Calendar };
