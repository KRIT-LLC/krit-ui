import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';
import ArrowDropDown from '@/assets/arrow_drop_down.svg?react';
import { buttonVariants } from './buttonVariants';

export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  asDropdown?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, asDropdown, icon, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    const children = (
      <>
        {icon ? icon : null}
        {props.children}
      </>
    );
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }), asDropdown && 'gap-1')} ref={ref} {...props}>
        {children}
        {asDropdown && <ArrowDropDown />}
      </Comp>
    );
  },
);
Button.displayName = 'Button';
