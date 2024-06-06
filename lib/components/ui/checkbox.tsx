import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

import { cn } from '@/utils';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <span className="flex items-center space-x-1">
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        'peer h-[14px] w-[14px] shrink-0 rounded-sm border border-line-theme ring-offset-background transition-colors hover:border-line-theme/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-background-theme data-[state=checked]:text-foreground-on-contrast data-[state=checked]:hover:bg-background-theme/80',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
        <Check className="h-2.5 w-2.5 text-foreground-on-contrast" strokeWidth={2} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    {props.children && (
      <label
        htmlFor={props.id}
        className="text-sm leading-none cursor-default peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:opacity-90"
      >
        {props.children}
      </label>
    )}
  </span>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

const CheckboxWithLabel = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>((props, ref) => (
  <>
    <Checkbox ref={ref} {...props} />
    <label
      className={cn(
        'text-primary font-medium text-base -ml-1',
        props.disabled ? 'cursor-default opacity-50 pointer-events-none' : 'cursor-pointer',
      )}
      onClick={() => props.onCheckedChange?.(!props.checked)}
    >
      {props.children}
    </label>
  </>
));

export { Checkbox, CheckboxWithLabel };
