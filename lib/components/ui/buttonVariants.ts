import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'tracking-[0.15px] inline-flex select-none gap-1 items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-80',
  {
    variants: {
      variant: {
        // Соответствует старым вариантам с серым фоном: default, secondary-contrast, contrast-fade, grey, grey-primary, secondary
        'fade-contrast-filled':
          'bg-background-contrast-fade text-foreground-primary hover:bg-background-contrast-fade-hover disabled:bg-background-contrast-fade-disabled disabled:text-foreground-primary-disabled [&_svg]:text-icon-contrast disabled:[&_svg]:text-icon-contrast-disabled',
        // Соответствует старым вариантам прозрачным с бордерами: outline, secondary-outline
        'fade-contrast-outlined':
          'border border-line-primary bg-transparent text-foreground-primary hover:bg-background-primary-hover hover:border-line-primary disabled:border-line-primary-disabled disabled:text-foreground-primary-disabled [&_svg]:text-icon-contrast disabled:[&_svg]:text-icon-contrast-disabled',
        // Соответствует старым вариантам прозрачным: ghost, link, light
        'fade-contrast-transparent':
          'bg-transparent text-foreground-primary hover:bg-background-primary-hover disabled:text-foreground-primary-disabled [&_svg]:text-icon-contrast disabled:[&_svg]:text-icon-contrast-disabled',
        // Соответствует старым вариантам с цветным фоном (не серым, не красным): primary, contrast, accent, success, success-primary, pale, pale-primary, purple
        'theme-filled':
          'bg-background-theme text-foreground-on-contrast hover:bg-background-theme-hover disabled:bg-background-contrast-fade-disabled disabled:text-foreground-primary-disabled [&_svg]:text-icon-on-contrast disabled:[&_svg]:text-icon-contrast-disabled',
        // Соответствует старым вариантам с красным фоном: destructive, destructive-primary
        'warning-filled':
          'bg-background-error text-foreground-on-contrast hover:bg-background-error-hover disabled:bg-background-contrast-fade-disabled disabled:text-foreground-primary-disabled [&_svg]:text-icon-on-contrast disabled:[&_svg]:text-icon-contrast-disabled',
        'nav-item':
          'hover:bg-background-contrast-fade-selected/30 text-foreground-tertiary hover:text-foreground-white',
        'nav-item-selected':
          'bg-background-contrast-fade-selected/30 text-foreground-sidebar-active',
      },
      size: {
        default: 'h-9 px-4 py-2',
        xs: 'h-[30px] text-sm font-semibold px-3',
        sm: 'h-9 px-3 py-2',
        lg: 'h-10 px-8',
        xl: 'h-12 px-8',
        xxl: 'h-16 px-8',
        xxxl: 'h-20 px-8 font-medium',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'fade-contrast-filled',
      size: 'default',
    },
  },
);
