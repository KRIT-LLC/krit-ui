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
 * @param {React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>} props - Стандартные свойства Separator из Radix UI
 * @param {React.Ref<React.ElementRef<typeof SeparatorPrimitive.Root>>} ref - Реф для доступа к DOM-элементу
 * @returns {React.ReactElement} Разделитель с заданными свойствами
 *
 * @example
 * <Separator />
 * <Separator orientation="vertical" className="my-4" />
 */
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      'shrink-0 bg-line-primary',
      orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
      className,
    )}
    {...props}
  />
));
Separator.displayName = 'Separator';

export { Separator };
