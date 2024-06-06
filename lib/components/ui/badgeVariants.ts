import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  'items-center w-fit gap-1 cursor-default select-none text-nowrap rounded-sm px-2 py-0.5 leading-4 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-0 bg-background text-foreground hover:bg-background-primary/80',
        gradient: 'leading-3 border-0 bg-background-theme text-foreground-on-contrast hover:bg-background-theme/80',
        secondary: 'border-0 bg-background-secondary text-foreground hover:bg-foreground/5',
        'secondary-contrast': 'bg-background-secondary/60 text-foreground hover:bg-background-secondary/80',
        accent: 'bg-background-theme border-line-theme/10 text-[white] hover:bg-background-theme/80',
        theme: 'bg-background-theme border-line-theme/10 text-[white] hover:bg-background-theme/80',
        pale: 'bg-background-warning border-line-warning text-foreground-on-contrast hover:bg-background-warning/80',
        'pale-primary': 'bg-pale-foreground text-primary-foreground hover:bg-pale-foreground/80',
        destructive: 'bg-background-error border-line-error text-[white] hover:bg-background-error/80',
        'destructive-fade': 'bg-background-error-fade text-foreground-error hover:bg-background-error-fade-hover',
        'destructive-primary': 'bg-destructive-foreground text-primary-foreground hover:bg-destructive-foreground/80',
        success: 'bg-background-success text-[white] hover:bg-background-success/80',
        'success-fade': 'bg-background-success-fade text-foreground-success hover:bg-background-success-fade-hover',
        'success-primary': 'bg-success-foreground text-primary-foreground hover:bg-success-foreground/80',
        grey: 'bg-background-contrast-fade text-foreground hover:bg-background-contrast-fade/80',
        'grey-primary': 'bg-grey-foreground text-primary-foreground hover:bg-grey-foreground/80',
        outline: 'bg-background border border-line-primary text-foreground',
        'outline-success': 'bg-background border border-line-success text-foreground-success',
      },
      size: {
        sm: 'h-[24px]',
        default: 'h-7',
        lg: 'h-7',
      },
      iconVariant: {
        default: '[&_svg]:text-icon',
        black: '[&_svg]:text-foreground',
        secondary: '[&_svg]:text-icon-secondary',
      },
      layout: {
        default: 'inline-flex',
        truncate: 'text-ellipsis line-clamp-1',
      },
    },
    defaultVariants: {
      layout: 'default',
      variant: 'default',
      size: 'default',
    },
  },
);
