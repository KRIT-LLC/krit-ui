import * as React from 'react';
import { cn } from '@/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-background-contrast-fade/50', className)} {...props} />;
}
Skeleton.displayName = 'Skeleton';

export { Skeleton };
