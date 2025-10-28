import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { cn } from '@/utils';

/**
 * Root component for Sheet. Manages the open/close state.
 * @example
 * ```tsx
 * <Sheet>
 *   <SheetTrigger>Open</SheetTrigger>
 *   <SheetContent>Content here</SheetContent>
 * </Sheet>
 * ```
 */
const Sheet = SheetPrimitive.Root;

/**
 * Trigger component for opening the sheet.
 * Should be used inside Sheet component.
 */
const SheetTrigger = SheetPrimitive.Trigger;

/**
 * Close component for closing the sheet programmatically.
 * Should be used inside SheetContent.
 */
const SheetClose = SheetPrimitive.Close;

/**
 * Portal component that renders sheet content in a portal.
 * Used internally by SheetContent.
 */
const SheetPortal = SheetPrimitive.Portal;

/**
 * Overlay component that renders a backdrop behind the sheet.
 * Automatically closes the sheet when clicked.
 */
const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

/**
 * Variants configuration for sheet positioning and animation.
 * Defines how the sheet slides in from different sides.
 */
const sheetVariants = cva(
  'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom:
          'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r rounded-r-lg data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        right:
          'inset-y-0 right-0 h-full w-3/4 border-l rounded-l-lg data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  },
);

/**
 * Props interface for SheetContent component.
 * @property {('top'|'right'|'bottom'|'left')} [side='right'] - Side from which the sheet slides in
 */
interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

/**
 * Main content container for the sheet with configurable slide direction.
 * Includes an overlay and a close button by default.
 * @param {Object} props - Component props
 * @param {('top'|'right'|'bottom'|'left')} [props.side='right'] - Side from which the sheet slides in
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - Sheet content
 * @example
 * ```tsx
 * <SheetContent side="left">
 *   <SheetHeader>
 *     <SheetTitle>Title</SheetTitle>
 *   </SheetHeader>
 *   Content here
 * </SheetContent>
 * ```
 */
const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = 'right', className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
      {children}
      <SheetPrimitive.Close
        className={cn(
          'absolute top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background-contrast text-foreground-on-contrast shadow-md transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none',
          side === 'right' && '-left-12',
          side === 'left' && '-right-12',
          side === 'top' && 'left-1/2 -translate-x-1/2 -bottom-6',
          side === 'bottom' && 'left-1/2 -translate-x-1/2 -top-6',
        )}
      >
        <X className='h-5 w-5' />
        <span className='sr-only'>Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

/**
 * Header container for the sheet.
 * Provides consistent spacing and alignment for sheet titles and descriptions.
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - Header content (typically SheetTitle and SheetDescription)
 * @example
 * ```tsx
 * <SheetHeader>
 *   <SheetTitle>Settings</SheetTitle>
 *   <SheetDescription>Manage your preferences</SheetDescription>
 * </SheetHeader>
 * ```
 */
const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
);
SheetHeader.displayName = 'SheetHeader';

/**
 * Footer container for the sheet.
 * Provides consistent spacing and alignment for action buttons.
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - Footer content (typically buttons)
 * @example
 * ```tsx
 * <SheetFooter>
 *   <Button>Cancel</Button>
 *   <Button variant="primary">Save</Button>
 * </SheetFooter>
 * ```
 */
const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
);
SheetFooter.displayName = 'SheetFooter';

/**
 * Title component for the sheet header.
 * Displays the main heading of the sheet with appropriate styling.
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - Title text
 */
const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold text-foreground', className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

/**
 * Description component for the sheet header.
 * Displays additional explanatory text below the title.
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - Description text
 */
const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
