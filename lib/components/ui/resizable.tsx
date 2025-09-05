import * as ResizablePrimitive from 'react-resizable-panels';
import { GripVertical } from 'lucide-react';
import { cn } from '@/utils';

/**
 * Контейнер для группы изменяемых панелей. Позволяет создавать интерфейсы с изменяемыми размерами панелей.
 * Основан на react-resizable-panels с дополнительными стилями.
 *
 * @component
 * @param {object} props - Параметры компонента
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @param {'horizontal' | 'vertical'} [props.direction] - Направление размещения панелей
 * @param {React.ComponentProps<typeof ResizablePrimitive.PanelGroup>} props - Стандартные свойства PanelGroup из react-resizable-panels
 * @returns {React.ReactElement} Контейнер для группы изменяемых панелей
 *
 * @example
 * <ResizablePanelGroup direction="horizontal">
 *   <ResizablePanel defaultSize={50}>
 *     <div>Левая панель</div>
 *   </ResizablePanel>
 *   <ResizableHandle withHandle />
 *   <ResizablePanel defaultSize={50}>
 *     <div>Правая панель</div>
 *   </ResizablePanel>
 * </ResizablePanelGroup>
 */
const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn('flex h-full w-full data-[panel-group-direction=vertical]:flex-col', className)}
    {...props}
  />
);

/**
 * Изменяемая панель, которая может быть перетаскиваема для изменения размера.
 * Прямой ре-экспорт Panel из react-resizable-panels.
 */
const ResizablePanel = ResizablePrimitive.Panel;

/**
 * Элемент для изменения размера панелей. Может отображаться с ручкой для перетаскивания.
 * Основан на PanelResizeHandle из react-resizable-panels с дополнительными стилями.
 *
 * @component
 * @param {object} props - Параметры компонента
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @param {boolean} [props.withHandle] - Отображать ли видимую ручку для перетаскивания
 * @param {React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle>} props - Стандартные свойства PanelResizeHandle из react-resizable-panels
 * @returns {React.ReactElement} Элемент для изменения размера панелей
 *
 * @example
 * <ResizableHandle withHandle />
 */
const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      'relative flex w-px items-center justify-center transition-colors bg-line-primary-disabled hover:bg-line-primary [&:hover>div]:border-line-primary [&:hover>div]:text-foreground-primary after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90',
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className='z-10 flex h-4 w-3 items-center justify-center rounded-sm transition-colors text-foreground-primary-disabled bg-background-primary border border-line-primary-disabled hover:text-foreground-primary hover:border-line-primary'>
        <GripVertical className='h-2.5 w-2.5' />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
