// Separator.tsx
import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cn } from '@/utils';

/**
 * Разделитель для визуального отделения элементов интерфейса.
 * Основан на Radix UI Separator с кастомизацией стилей.
 *
 * @component
 * @param {object} props - Параметры компонента
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @param {"horizontal" | "vertical"} [props.orientation="horizontal"] - Ориентация разделителя
 * @param {boolean} [props.decorative=true] - Флаг декоративного элемента (не влияет на доступность)
 * @param {"default" | "sidebar"} [props.intent="default"] - `sidebar` задаёт фон `bg-line-sidebar` для панели сайдбара
 * @param {React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>} props - Стандартные свойства Separator из Radix UI
 * @param {React.Ref<React.ElementRef<typeof SeparatorPrimitive.Root>>} ref - Реф для доступа к DOM-элементу
 * @returns {React.ReactElement} Разделитель с заданными свойствами
 *
 * @example
 * <Separator />
 * <Separator orientation="vertical" className="my-4" />
 * <Separator intent="sidebar" className="ml-3 w-[calc(100%-24px)]" />
 */
export type SeparatorProps = React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & {
  /**
   * `sidebar` — токен `--krit-line-sidebar` для разделителей на фоне `background-sidebar`.
   */
  intent?: 'default' | 'sidebar';
};

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(({ className, orientation = 'horizontal', decorative = true, intent = 'default', ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      'shrink-0',
      intent === 'sidebar' ? 'bg-line-sidebar' : 'bg-line-primary',
      orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
      className,
    )}
    {...props}
  />
));
Separator.displayName = 'Separator';

export { Separator };
