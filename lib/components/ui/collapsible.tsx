import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

/**
 * Примитив для создания раскрывающихся элементов
 * @component
 * @see {@link https://www.radix-ui.com/primitives/docs/components/collapsible Radix UI Collapsible}
 */
const Collapsible = CollapsiblePrimitive.Root;

/**
 * Триггер для управления состоянием раскрытия
 * @component
 */
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;
/**
 * Контейнер для скрываемого контента
 * @component
 */
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
