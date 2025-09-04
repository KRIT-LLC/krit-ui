import * as React from 'react';
import { cn } from '@/utils';

/**
 * Компонент-плейсхолдер для отображения во время загрузки контента.
 * Создает анимированный эффект пульсации, имитирующий загружаемый контент.
 *
 * @component
 * @param {object} props - Параметры компонента
 * @param {string} [props.className] - Дополнительные CSS-классы для кастомизации
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Стандартные HTML-атрибуты div элемента
 * @returns {React.ReactElement} Анимированный плейсхолдер загрузки
 *
 * @example
 * // Простой плейсхолдер
 * <Skeleton className="h-4 w-full" />
 *
 * @example
 * // Плейсхолдер для аватара
 * <Skeleton className="h-12 w-12 rounded-full" />
 */
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-background-contrast-fade/50', className)}
      {...props}
    />
  );
}
Skeleton.displayName = 'Skeleton';

export { Skeleton };
