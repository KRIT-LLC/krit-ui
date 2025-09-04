import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@/utils';
import { renderTextWithBoldMarkdown } from '../../lib/text';

/**
 * Провайдер для системы всплывающих подсказок.
 * Обеспечивает контекст и управление состоянием для всех Tooltip-компонентов.
 *
 * @component
 * @param {React.ComponentProps<typeof TooltipPrimitive.Provider>} props - Свойства провайдера
 * @returns {React.ReactElement} Провайдер системы подсказок
 */
const TooltipProvider = TooltipPrimitive.Provider;

/**
 * Основной компонент всплывающей подсказки.
 *
 * @component
 * @param {React.ComponentProps<typeof TooltipPrimitive.Root>} props - Свойства компонента
 * @returns {React.ReactElement} Компонент подсказки
 */
const Tooltip = TooltipPrimitive.Root;

/**
 * Триггер для отображения всплывающей подсказки.
 *
 * @component
 * @param {React.ComponentProps<typeof TooltipPrimitive.Trigger>} props - Свойства компонента
 * @returns {React.ReactElement} Триггер подсказки
 */
const TooltipTrigger = TooltipPrimitive.Trigger;

/**
 * Контент всплывающей подсказки.
 *
 * @component
 * @param {object} props - Свойства компонента
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @param {number} [props.sideOffset=4] - Смещение от элемента
 * @param {React.Ref<React.ElementRef<typeof TooltipPrimitive.Content>>} ref - React ref
 * @returns {React.ReactElement} Контент подсказки
 */
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 overflow-hidden rounded-lg bg-background-contrast dark:bg-background-tertiary text-[white] border border-line-secondary px-3 py-2 text-sm shadow-tooltip animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className,
      )}
      {...props}
    >
      {props.children}
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

/**
 * Пропсы компонента InfoTooltip
 * @interface InfoTooltipProps
 * @property {React.ReactNode} [children] - Элемент, для которого показывается подсказка
 * @property {string} [text] - Текст подсказки
 * @property {number} [delayDuration] - Задержка перед показом подсказки (мс)
 */
interface InfoTooltipProps {
  children?: React.ReactNode;
  text?: string;
  delayDuration?: number;
}

/**
 * Упрощенный компонент всплывающей подсказки с предустановленными стилями.
 * Поддерживает форматирование текста с помощью Markdown-подобного синтаксиса.
 *
 * @component
 * @param {InfoTooltipProps} props - Пропсы компонента
 * @returns {React.ReactElement} Компонент информационной подсказки
 *
 * @example
 * <InfoTooltip text="Это **важная** подсказка">
 *   <Button>Наведи меня</Button>
 * </InfoTooltip>
 */
const InfoTooltip = ({ children, text = '', delayDuration }: InfoTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={delayDuration}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent className='w-[300px]'>
          <div className='whitespace-pre-line text-sm'>{renderTextWithBoldMarkdown(text)}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, InfoTooltip };
