import * as React from 'react';
import { DayPicker, type DropdownProps } from 'react-day-picker';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cn } from '@/utils';
import ChevronLeftOutline from '@/assets/chevron_left_outline.svg?react';
import ChevronRightOutline from '@/assets/chevron_right_outline.svg?react';
import { buttonVariants } from './buttonVariants';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

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
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout='dropdown'
      startMonth={new Date(new Date().getFullYear() - 6, 0)}
      endMonth={new Date(new Date().getFullYear() + 6, 11)}
      className={cn('relative w-fit p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        dropdowns:
          'mx-10 grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-center gap-2 text-[15px] capitalize font-medium',
        months_dropdown: 'flex [&>select:focus-visible]:outline-none [&>select]:capitalize',
        years_dropdown: 'flex [&>select:focus-visible]:outline-none',
        month_caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'hidden',
        nav: 'absolute inset-x-3 top-3 flex items-center justify-between',
        button_previous: cn(
          buttonVariants({ variant: 'fade-contrast-outlined' }),
          'h-7 w-7 bg-[transparent] border-none text-primary p-0 hover:bg-[transparent] hover:text-primary/80',
        ),
        button_next: cn(
          buttonVariants({ variant: 'fade-contrast-outlined' }),
          'h-7 w-7 bg-[transparent] border-none text-primary p-0 hover:bg-[transparent] hover:text-primary/80',
        ),
        month_grid: 'w-full border-collapse space-y-1',
        weekdays: 'flex',
        weekday: 'text-foreground-secondary rounded-md w-9 font-normal text-[0.8rem]',
        week: 'flex w-full mt-2',
        day: 'h-9 w-9 text-center p-0 relative [&:has([aria-selected].day-range-start)]:rounded-l-md [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected])]:bg-background-tertiary first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day_button: cn(
          buttonVariants({ variant: 'fade-contrast-transparent' }),
          'h-9 w-9 p-0 text-sm font-normal transition-all hover:bg-background-success-fade hover:text-foreground aria-selected:opacity-100',
        ),
        range_start: 'day-range-start hover:!text-primary !text-foreground-on-contrast',
        range_end: 'day-range-end hover:!text-primary !text-foreground-on-contrast',
        selected:
          'bg-background-theme text-foreground-on-contrast hover:bg-background-theme/80 hover:text-foreground-on-contrast focus:bg-background-theme focus:text-foreground-on-contrast',
        today:
          'day-today transition-none bg-background-tertiary text-foreground-theme hover:bg-none hover:text-primary hover:bg-clip-content aria-selected:!text-foreground-on-contrast [&.day-range-middle]:!text-foreground-theme',
        outside: 'day-outside text-foreground-secondary opacity-50 hover:text-foreground/90',
        disabled: 'text-foreground-secondary opacity-50',
        range_middle:
          'day-range-middle bg-none aria-selected:bg-background-tertiary aria-selected:hover:bg-none aria-selected:hover:bg-background-success-fade aria-selected:text-foreground',
        hidden: 'invisible',
        ...classNames,
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
                  'bg-[transparent] border-none p-0 gap-0 h-auto hover:bg-[transparent] capitalize font-bold [&>svg]:ml-1 [&>span]:pr-1',
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
