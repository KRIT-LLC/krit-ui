import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/utils';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

// Тип для DialogSection
interface DialogSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  scrollableSection?: boolean;
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    aside?: boolean;
    scrollableSection?: boolean;
  }
>(({ className, children, aside, scrollableSection, ...props }, ref) => {
  // Прокидываем scrollableSection в DialogSection
  const enhancedChildren = React.Children.map(children, child => {
    if (
      React.isValidElement(child) &&
      // @ts-expect-error: Тип ReactElement не совпадает из-за кастомного пропа scrollableSection
      (child.type.displayName === 'DialogSection' || child.type.name === 'DialogSection')
    ) {
      // Явно указываем тип пропсов для DialogSection
      return React.cloneElement(child as React.ReactElement<DialogSectionProps>, {
        scrollableSection,
      });
    }
    return child;
  });

  return (
    <DialogPortal>
      <DialogOverlay className='bg-background-overlay/80' />
      <DialogPrimitive.Content
        className={cn(
          'fixed z-50 duration-200 focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
          !aside && 'max-h-[90vh] left-[50%] translate-x-[-50%] top-[8%] max-w-fit w-full',
          aside && 'right-[0] top-0 translate-x-0, h-[100vh]',
        )}
        {...props}
      >
        <div
          ref={ref}
          className={cn(
            'flex flex-col gap-[1px] bg-line-primary shadow-lg min-w-[460px] max-w-[80vw]',
            !aside && 'max-h-[90vh] rounded-lg',
            aside && 'h-[100vh]',
            scrollableSection && 'overflow-hidden',
            !scrollableSection &&
              'scroll-smooth overflow-y-auto overflow-x-hidden dialog-scrollbar',
            className,
          )}
        >
          {enhancedChildren}
        </div>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  hideCloseButton,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { hideCloseButton?: boolean }) => (
  <div
    className={cn(
      'flex flex-col bg-background p-5 relative text-xl font-medium space-y-4 text-center sm:text-left',
      className,
    )}
    {...props}
  >
    {props.children}
    {!hideCloseButton && (
      <DialogPrimitive.Close className='absolute right-3 top-0 p-1 w-8 h-8 pointer-events-auto text-foreground transition-all hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-foreground-secondary'>
        <X className='h-6 w-6' />
        <span className='sr-only'>Close</span>
      </DialogPrimitive.Close>
    )}
  </div>
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse bg-background py-4 px-5 sm:!flex-row sm:justify-start sm:space-x-4 sticky bottom-0',
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('flex items-center gap-2 text-xl font-medium leading-none', className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-foreground tracking-[0.25px]', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

const DialogSection = ({ className, scrollableSection, ...props }: DialogSectionProps) => (
  <div
    className={cn(
      'flex flex-col space-y-4 bg-background p-5',
      scrollableSection && 'overflow-y-auto overflow-x-hidden dialog-scrollbar flex-1',
      className,
    )}
    {...props}
  />
);
DialogSection.displayName = 'DialogSection';

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogSection,
};
