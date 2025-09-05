import * as React from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { cn } from '@/utils';
import CheckCircleOutline from '@/assets/check_circle_outline.svg?react';
import ErrorOutline from '@/assets/error_outline.svg?react';

/**
 * Провайдер для системы уведомлений Toast.
 * Обеспечивает контекст и управление состоянием для всех Toast-компонентов.
 *
 * @component
 * @param {React.ComponentProps<typeof ToastPrimitives.Provider>} props - Свойства провайдера
 * @returns {React.ReactElement} Провайдер системы уведомлений
 */
const ToastProvider = ToastPrimitives.Provider;

/**
 * Контейнер для отображения Toast-уведомлений.
 * Фиксирует позицию и стилизацию области показа уведомлений.
 *
 * @component
 * @param {object} props - Свойства компонента
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @param {React.Ref<React.ElementRef<typeof ToastPrimitives.Viewport>>} ref - React ref
 * @returns {React.ReactElement} Контейнер для уведомлений
 */
const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      'fixed top-0 z-[200] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px] gap-4',
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg py-3 px-4 shadow-float transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'destructive group bg-background-error-fade text-foreground-error border border-line-primary',
        success:
          'success group bg-background-success-fade text-foreground-success border border-line-primary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

/**
 * Основной компонент Toast-уведомления.
 * Поддерживает различные варианты отображения (default, destructive, success).
 *
 * @component
 * @param {object} props - Свойства компонента
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @param {'default' | 'destructive' | 'success'} [props.variant] - Вариант стилизации
 * @param {React.Ref<React.ElementRef<typeof ToastPrimitives.Root>>} ref - React ref
 * @returns {React.ReactElement} Компонент уведомления
 */
const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>
>(({ className, variant, children, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    >
      <div className='flex gap-2 whitespace-pre-line'>
        {variant === 'destructive' && <ErrorOutline className='min-w-6 h-6' />}
        {variant === 'success' && <CheckCircleOutline className='min-w-6 h-6' />}
        {children}
      </div>
    </ToastPrimitives.Root>
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

/**
 * Кнопка действия внутри Toast-уведомления.
 *
 * @component
 * @param {object} props - Свойства компонента
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @param {React.Ref<React.ElementRef<typeof ToastPrimitives.Action>>} ref - React ref
 * @returns {React.ReactElement} Кнопка действия
 */
const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-[transparent] px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-background-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive',
      className,
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

/**
 * Кнопка закрытия Toast-уведомления.
 *
 * @component
 * @param {object} props - Свойства компонента
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @param {React.Ref<React.ElementRef<typeof ToastPrimitives.Close>>} ref - React ref
 * @returns {React.ReactElement} Кнопка закрытия
 */
const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600',
      className,
    )}
    toast-close=''
    {...props}
  >
    <X className='h-4 w-4' />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

/**
 * Заголовок Toast-уведомления.
 *
 * @component
 * @param {object} props - Свойства компонента
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @param {React.Ref<React.ElementRef<typeof ToastPrimitives.Title>>} ref - React ref
 * @returns {React.ReactElement} Заголовок уведомления
 */
const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn('text-sm leading-5 tracking-[0.25px]', className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

/**
 * Описание/содержание Toast-уведомления.
 *
 * @component
 * @param {object} props - Свойства компонента
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @param {React.Ref<React.ElementRef<typeof ToastPrimitives.Description>>} ref - React ref
 * @returns {React.ReactElement} Описание уведомления
 */
const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn('text-sm opacity-90', className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
