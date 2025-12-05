import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';
import { tabsListVariants, tabsTriggerVariants } from './tabsVariants';

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
 * @param {VariantProps<typeof tabsListVariants>['size']} [props.size] - Размер вкладок (default | icon)
 * @param {React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>} props - Стандартные свойства List из Radix UI
 * @param {React.Ref<React.ElementRef<typeof TabsPrimitive.List>>} ref - Реф для доступа к DOM-элементу
 * @returns {React.ReactElement} Контейнер переключателей вкладок
 */
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>
>(({ className, size, ...props }, ref) => (
  <TabsPrimitive.List ref={ref} className={cn(tabsListVariants({ size }), className)} {...props} />
));
TabsList.displayName = TabsPrimitive.List.displayName;

/**
 * Переключатель отдельной вкладки. Управляет отображением связанного контента.
 *
 * @component
 * @param {object} props - Параметры компонента
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @param {VariantProps<typeof tabsTriggerVariants>['size']} [props.size] - Размер вкладки (default | icon). Используйте 'icon' для вкладок только с иконкой без текста
 * @param {React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>} props - Стандартные свойства Trigger из Radix UI
 * @param {React.Ref<React.ElementRef<typeof TabsPrimitive.Trigger>>} ref - Реф для доступа к DOM-элементу
 * @returns {React.ReactElement} Переключатель вкладки
 */
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> &
    VariantProps<typeof tabsTriggerVariants>
>(({ className, size, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ size }), className)}
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
