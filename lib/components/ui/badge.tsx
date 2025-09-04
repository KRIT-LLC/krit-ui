import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';
import { badgeVariants } from './badgeVariants';

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  title?: string;
}

/**
 * Компонент для отображения стилизованного бейджа с поддержкой иконок и вариаций
 *
 * @component
 * @param {object} props - Параметры компонента
 * @param {'secondary' | 'outline' | 'default'} [props.variant] - Стиль оформления
 * @param {'sm' | 'md' | 'lg'} [props.size] - Размер компонента
 * @param {React.ReactNode} [props.icon] - Иконка слева от содержимого
 * @param {React.ReactNode} [props.iconRight] - Иконка справа от содержимого
 * @param {'square' | 'circle'} [props.iconVariant] - Стиль иконки (только для variant='secondary')
 * @param {'row' | 'col'} [props.layout] - Распределение внутренних элементов
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @param {React.ReactNode} props.children - Основное содержимое бейджа
 * @param {string} [props.title] - Текст тултипа (используется если children не строка)
 * @param {React.HTMLAttributes} [props.rest] - Дополнительные HTML-атрибуты
 * @returns {React.ReactElement} Стилизованный бейдж
 *
 * @example
 * <Badge variant="outline" size="md" icon={<Icon />}>
 *   New notification
 * </Badge>
 */
function Badge({
  className,
  variant,
  size,
  icon,
  iconRight,
  iconVariant,
  layout,
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        badgeVariants({
          variant,
          size,
          iconVariant: variant === 'secondary' ? iconVariant : undefined,
          layout,
        }),
        props.onClick ? 'cursor-pointer' : 'cursor-default pointer-events-none',
        className,
      )}
      title={typeof children === 'string' ? children : props.title}
      {...props}
    >
      {icon && <div className={children ? 'ml-[-4px]' : ''}>{icon}</div>}
      {children}
      {iconRight && <div className={children ? 'mr-[-4px]' : ''}>{iconRight}</div>}
    </div>
  );
}

export { Badge };
