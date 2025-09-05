import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    variants: {
      required: {
        true: 'after:content-["*"] after:ml-0.5 after:text-foreground-error',
      },
    },
    defaultVariants: {
      required: false,
    },
  },
);
/**
 * Компонент метки для полей ввода с поддержкой обозначения обязательных полей.
 * Основан на Radix UI Label с дополнительными стилями и функциональностью.
 *
 * @component
 * @param {object} props - Параметры компонента
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @param {boolean} [props.required] - Флаг обязательного поля
 * @param {React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>} props - Стандартные свойства Label из Radix UI
 * @param {React.Ref<React.ElementRef<typeof LabelPrimitive.Root>>} ref - Реф для доступа к DOM-элементу
 * @returns {React.ReactElement} Метка с заданными свойствами
 *
 * @example
 * <Label htmlFor="email">Email адрес</Label>
 * <Label required htmlFor="password">Пароль</Label>
 */
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, required, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ required }), className)}
    {...props}
  />
));

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
