import { cva } from 'class-variance-authority';

export const tabsListVariants = cva(
  'inline-flex items-center justify-center rounded-lg bg-background-secondary p-1 text-foreground',
  {
    variants: {
      size: {
        default: 'h-9',
        icon: 'h-9',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export const tabsTriggerVariants = cva(
  'inline-flex gap-1 items-center justify-center whitespace-nowrap rounded-lg text-sm font-normal ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-icon-contrast [&_svg]:text-icon-contrast data-[state=active]:bg-background-contrast-fade data-[state=active]:text-foreground-primary data-[state=active]:[&_svg]:text-foreground-primary data-[state=active]:shadow-sm',
  {
    variants: {
      size: {
        default: 'h-7 px-4 py-1.5',
        icon: 'h-7 px-1 py-1.5',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);
