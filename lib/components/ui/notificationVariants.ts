import { cva } from 'class-variance-authority';

export const notificationVariants = cva(
  'relative flex w-full items-center gap-3 rounded-lg border shadow-sm transition-all',
  {
    variants: {
      variant: {
        error:
          'bg-background-error-fade text-foreground-error border-line-primary',
        success:
          'bg-background-success-fade text-foreground-success border-line-primary',
        info: 'bg-background-theme-fade text-foreground-theme border-line-primary',
      },
      size: {
        sm: 'py-2 px-3 gap-2',
        default: 'py-3 px-4 gap-3',
      },
    },
    defaultVariants: {
      variant: 'info',
      size: 'default',
    },
  },
);
