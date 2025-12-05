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
  ({ className, variant, size, asChild = false, asDropdown, icon, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    // Если asChild=true, мы не можем добавлять дополнительные элементы (иконки, стрелки)
    // так как Slot ожидает только одного потомка
    if (asChild) {
      return (
        <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
          {children}
        </Comp>
      );
    }

    // Для обычного случая (не asChild) рендерим все элементы
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {icon && <span className='w-6 h-6 flex items-center justify-center'>{icon}</span>}
        {children}
        {asDropdown && <ArrowDropDown className='w-6 h-6' />}
      </Comp>
    );
  },
);
Button.displayName = 'Button';
