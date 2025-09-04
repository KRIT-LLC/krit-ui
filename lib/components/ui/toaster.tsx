import * as Portal from '@radix-ui/react-portal';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';
import { useToast } from '@/hooks/useToast';

/**
 * Пропсы компонента Toaster
 * @interface ToasterProps
 * @property {string} [viewportClassname] - Дополнительные CSS-классы для контейнера уведомлений
 */
interface ToasterProps {
  viewportClassname?: string;
}

/**
 * Компонент для отображения системы уведомлений Toast.
 * Обеспечивает рендеринг всех активных уведомлений в портале.
 * Использует Radix UI Portal для корректного позиционирования.
 *
 * @component
 * @param {ToasterProps} props - Пропсы компонента
 * @returns {React.ReactElement} Провайдер и контейнер для уведомлений
 *
 * @example
 * <Toaster viewportClassname="custom-viewport" />
 */
export function Toaster(props: ToasterProps) {
  const { viewportClassname } = props;
  const { toasts } = useToast();

  return (
    <Portal.Root>
      <ToastProvider>
        {toasts.map(function ({ id, title, description, action, ...props }) {
          return (
            <Toast key={id} {...props}>
              <div className='grid gap-1'>
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && <ToastDescription>{description}</ToastDescription>}
              </div>
              {action}
              <ToastClose />
            </Toast>
          );
        })}
        <ToastViewport className={viewportClassname} />
      </ToastProvider>
    </Portal.Root>
  );
}
