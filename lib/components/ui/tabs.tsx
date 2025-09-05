import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/utils';

/**
 * Контейнер для компонентов вкладок. Обеспечивает базовую функциональность и состояние вкладок.
 * Основан на Radix UI Tabs.
 *
 * @component
 * @param {React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>} props - Свойства компонента
 * @returns {React.ReactElement} Контейнер вкладок
 */
const Tabs = TabsPrimitive.Root;

/**
 * Контейнер для переключателей вкладок. Обеспечивает группировку и стилизацию кнопок переключения.
 *
 * @component
 * @param {object} props - Параметры компонента
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @param {React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>} props - Стандартные свойства List из Radix UI
 * @param {React.Ref<React.ElementRef<typeof TabsPrimitive.List>>} ref - Реф для доступа к DOM-элементу
 * @returns {React.ReactElement} Контейнер переключателей вкладок
 */
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex h-9 items-center justify-center rounded-lg bg-background-secondary p-1 text-foreground',
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

/**
 * Переключатель отдельной вкладки. Управляет отображением связанного контента.
 *
 * @component
 * @param {object} props - Параметры компонента
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @param {React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>} props - Стандартные свойства Trigger из Radix UI
 * @param {React.Ref<React.ElementRef<typeof TabsPrimitive.Trigger>>} ref - Реф для доступа к DOM-элементу
 * @returns {React.ReactElement} Переключатель вкладки
 */
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex gap-1 items-center justify-center whitespace-nowrap rounded-md px-3 h-7 text-sm font-normal ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background-contrast-fade data-[state=active]:text-foreground data-[state=active]:shadow-sm',
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

/**
 * Контейнер для контента вкладки. Отображается при активации связанного переключателя.
 *
 * @component
 * @param {object} props - Параметры компонента
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @param {React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>} props - Стандартные свойства Content из Radix UI
 * @param {React.Ref<React.ElementRef<typeof TabsPrimitive.Content>>} ref - Реф для доступа к DOM-элементу
 * @returns {React.ReactElement} Контейнер контента вкладки
 */
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
