import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils';
import { badgeVariants } from './badgeVariants';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
}

function Badge({ className, variant, size, icon, iconRight, iconVariant, layout, ...props }: BadgeProps) {
  const children = (
    <>
      {icon && <div className={props.children ? 'ml-[-4px]' : ''}>{icon}</div>}
      {props.children}
      {iconRight && <div className={props.children ? 'mr-[-4px]' : ''}>{iconRight}</div>}
    </>
  );
  return (
    <div
      className={cn(
        badgeVariants({ variant, size, iconVariant: variant === 'secondary' ? iconVariant : undefined, layout }),
        props.onClick ? 'cursor-pointer' : 'cursor-default pointer-events-none',
        className
      )}
      title={typeof props.children === 'string' ? props.children : undefined}
      {...props}
    >
      {children}
    </div>
  );
}

export { Badge };
