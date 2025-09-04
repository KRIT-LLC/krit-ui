import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';
import ArrowDropDown from '@/assets/arrow_drop_down.svg?react';
import { buttonVariants } from './buttonVariants';

export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];

/**
 * Пропсы компонента Button
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Кастомный элемент вместо стандартной кнопки */
  asChild?: boolean;
  /** Отображение стрелки выпадающего списка */
  asDropdown?: boolean;
  /** Иконка перед текстом кнопки */
  icon?: React.ReactNode;
}

/**
 * Интерактивный элемент интерфейса с поддержкой разных стилей и состояний
 *
 * @component
 * @param {ButtonProps} props - Параметры компонента
 * @param {React.Ref<HTMLButtonElement>} ref - Реф для доступа к DOM-элементу
 * @returns {React.ReactElement} Кнопка с заданными свойствами
 *
 * @example
 * <Button variant="primary" size="lg">Нажми меня</Button>
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, asDropdown, icon, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    const children = (
      <>
        {icon ? icon : null}
        {props.children}
      </>
    );
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), asDropdown && 'gap-1')}
        ref={ref}
        {...props}
      >
        {children}
        {asDropdown && <ArrowDropDown />}
      </Comp>
    );
  },
);
Button.displayName = 'Button';
