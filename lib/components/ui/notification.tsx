import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { cn } from '@/utils';
import CheckCircleOutline from '@/assets/check_circle_outline.svg?react';
import ErrorOutline from '@/assets/error_outline.svg?react';
import InfoIcon from '@/assets/info.svg?react';
import { Button } from './button';
import { notificationVariants } from './notificationVariants';

/**
 * Пропсы компонента Notification
 */
export interface NotificationProps
  extends React.ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof notificationVariants> {
  /** Текст уведомления */
  children?: React.ReactNode;
  /** Показывать ли кнопку закрытия */
  showClose?: boolean;
  /** Обработчик закрытия уведомления */
  onClose?: () => void;
  /** Кастомная иконка (если не указана, используется иконка по умолчанию для варианта) */
  icon?: React.ReactNode;
}

/**
 * Компонент для отображения уведомлений.
 * Поддерживает различные варианты отображения (error, success, info) и размеры (sm, default).
 *
 * @component
 * @param {NotificationProps} props - Параметры компонента
 * @returns {React.ReactElement} Компонент уведомления
 *
 * @example
 * <Notification variant="success" size="default">Операция выполнена</Notification>
 *
 * @example
 * <Notification variant="error" size="sm" showClose onClose={() => console.log('closed')}>
 *   Что-то пошло не так
 * </Notification>
 */
const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
  ({ className, variant, size, showClose = false, onClose, icon, children, ...props }, ref) => {
    const renderDefaultIcon = () => {
      const iconSize = size === 'sm' ? 'min-w-5 h-5' : 'min-w-6 h-6';
      switch (variant) {
        case 'success':
          return <CheckCircleOutline className={cn(iconSize, 'flex-shrink-0')} />;
        case 'error':
          return <ErrorOutline className={cn(iconSize, 'flex-shrink-0')} />;
        case 'info':
          return <InfoIcon className={cn(iconSize, 'flex-shrink-0')} />;
        default:
          return null;
      }
    };

    const displayIcon = icon !== undefined ? icon : renderDefaultIcon();

    const closeIconSize = size === 'sm' ? 'h-3 w-3' : 'h-4 w-4';

    // line-height равен высоте иконки для визуального выравнивания
    const textLineHeight = size === 'sm' ? 'leading-5' : 'leading-6';

    return (
      <div ref={ref} className={cn(notificationVariants({ variant, size }), className)} {...props}>
        {displayIcon && <div className='flex-shrink-0 self-start'>{displayIcon}</div>}
        <div className={cn('flex-1 min-w-0 text-sm', textLineHeight)}>{children}</div>
        {showClose && (
          <Button
            type='button'
            variant='fade-contrast-transparent'
            size='icon'
            onClick={onClose}
            className={cn(
              'flex-shrink-0 h-auto w-auto p-1 text-foreground/50 hover:text-foreground self-start',
              variant === 'error' && 'text-red-300 hover:text-red-50',
            )}
            aria-label='Закрыть уведомление'
          >
            <X className={closeIconSize} />
          </Button>
        )}
      </div>
    );
  },
);
Notification.displayName = 'Notification';

export { Notification };
