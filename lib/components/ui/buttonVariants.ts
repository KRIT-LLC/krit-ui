import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'tracking-[0.15px] inline-flex select-none gap-2.5 items-center justify-center whitespace-nowrap rounded-lg text-sm ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-80',
  {
    variants: {
      variant: {
        default: 'bg-background-contrast-fade hover:bg-background-contrast-fade/90',
        primary:
          'bg-background-contrast text-foreground-on-contrast hover:bg-background-contrast/90',
        accent: 'bg-background-theme text-[white] hover:bg-background-theme/80',
        pale: 'bg-pale text-pale-foreground hover:bg-pale/80',
        'pale-primary': 'bg-pale-foreground text-primary-foreground hover:bg-pale-foreground/80',
        destructive:
          'bg-background-error-fade text-foreground-error hover:bg-background-error-fade-hover',
        'destructive-primary':
          'bg-background-error text-primary-foreground hover:bg-background-error/80',
        success: 'bg-success text-success-foreground hover:bg-success/80',
        'success-primary':
          'bg-success-foreground text-primary-foreground hover:bg-success-foreground/80',
        grey: 'bg-grey text-grey-foreground hover:bg-grey/80',
        'grey-primary': 'bg-grey-foreground text-primary-foreground hover:bg-grey-foreground/80',
        secondary:
          'bg-background-secondary/60 text-secondary-foreground hover:bg-background-secondary/80',
        'secondary-outline':
          'border border-line-primary bg-input text-foreground hover:bg-background-secondary/90 active:bg-background-secondary',
        'secondary-contrast':
          'bg-background-contrast-fade-selected hover:bg-background-contrast-fade-hover/90',
        contrast:
          'bg-background-contrast text-foreground-on-contrast hover:bg-background-contrast/90',
        'contrast-fade':
          'bg-background-contrast-fade hover:bg-background-contrast-fade/90 disabled:bg-background-contrast-fade-disabled disabled:text-foreground-primary-disabled',
        outline:
          'border-2 border-line-primary text-foreground bg-background hover:bg-background-primary-hover hover:text-accent-foreground',
        ghost: 'hover:bg-background-contrast-fade-selected/30',
        link: 'text-primary underline-offset-4',
        purple: 'bg-purple text-[white] hover:bg-purple/80',
        light: 'bg-background-primary hover:bg-background-primary-hover shadow-lg hover:shadow-xl',
      },
      size: {
        default: 'h-9 px-4 py-2',
        xs: 'h-[30px] text-sm font-semibold gap-1 px-3',
        sm: 'h-9 px-3 py-2',
        lg: 'h-10 px-8',
        xl: 'h-12 px-8',
        xxl: 'h-16 px-8',
        xxxl: 'h-20 px-8 font-medium',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
