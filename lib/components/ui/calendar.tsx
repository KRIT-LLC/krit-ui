import * as React from 'react';
import { DayPicker, DropdownProps } from 'react-day-picker';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cn } from '@/utils';
import ChevronLeftOutline from '@/assets/chevron_left_outline.svg?react';
import ChevronRightOutline from '@/assets/chevron_right_outline.svg?react';
import { buttonVariants } from './buttonVariants';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout='dropdown-buttons'
      fromYear={new Date().getFullYear() - 6}
      toYear={new Date().getFullYear() + 6}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption_dropdowns:
          'flex text-[15px] capitalize font-medium grid gap-2 grid-cols-[0px_3fr_2fr]',
        dropdown_month:
          '[&>.rdp-vhidden]:hidden flex [&>select:focus-visible]:outline-none [&>select]:capitalize mr-2',
        dropdown_year: '[&>.rdp-vhidden]:hidden flex [&>select:focus-visible]:outline-none',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'hidden',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-[transparent] border-none text-primary p-0 hover:bg-[transparent] hover:text-primary/80',
        ),
        nav_button_previous: 'absolute -left-1',
        nav_button_next: 'absolute -right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-foreground-secondary rounded-md w-9 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: 'h-9 w-9 text-center p-0 relative [&:has([aria-selected].day-range-start)]:rounded-l-md [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-muted [&:has([aria-selected])]:bg-muted first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 text-sm font-normal transition-all hover:bg-background-secondary hover:text-foreground aria-selected:opacity-100',
        ),
        day_range_start: 'day-range-start hover:!text-primary !text-foreground-on-contrast',
        day_range_end: 'day-range-end hover:!text-primary !text-foreground-on-contrast',
        day_selected:
          'bg-background-theme text-foreground-on-contrast hover:bg-background-theme/80 hover:text-foreground-on-contrast focus:bg-background-theme focus:text-foreground-on-contrast',
        day_today:
          'transition-none bg-muted text-foreground-theme hover:bg-none  hover:text-primary hover:bg-clip-content',
        day_outside:
          'day-outside text-foreground-secondary opacity-50 hover:text-foreground/90 aria-selected:bg-muted aria-selected:text-foreground-secondary aria-selected:opacity-30',
        day_disabled: 'text-foreground-secondary opacity-50',
        day_range_middle:
          'bg-none aria-selected:bg-muted aria-selected:hover:bg-none aria-selected:hover:bg-background-secondary aria-selected:text-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeftOutline />,
        IconRight: () => <ChevronRightOutline />,
        Dropdown: ({ children, ...props }: DropdownProps) => {
          return (
            <SelectPrimitive.Root
              name={props.name}
              value={props.value as string | undefined}
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
                <SelectValue placeholder={props.caption} />
              </SelectTrigger>
              <SelectContent>
                {React.Children.toArray(children).map(child => {
                  const option = child as React.ReactElement<HTMLOptionElement>;
                  return (
                    <SelectItem key={option.props.value} value={option.props.value}>
                      {option.props.children as unknown as string}
                    </SelectItem>
                  );
                })}
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
