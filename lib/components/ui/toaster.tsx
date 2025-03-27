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

interface ToasterProps {
  viewportClassname?: string;
}

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
