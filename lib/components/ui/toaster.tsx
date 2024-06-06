import * as Portal from '@radix-ui/react-portal';
import { useToast } from '@/hooks/useToast.ts';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast.tsx';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <Portal.Root>
      <ToastProvider>
        {toasts.map(function({ id, title, description, action, ...props }) {
          return (
            <Toast key={id} {...props}>
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && <ToastDescription>{description}</ToastDescription>}
              </div>
              {action}
              <ToastClose />
            </Toast>
          );
        })}
        <ToastViewport />
      </ToastProvider>
    </Portal.Root>
  );
}
