import * as React from 'react';
import { cn } from '@/utils';

/**
 * Пропсы компонента BottomMenu
 */
export interface BottomMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Текст, отображаемый слева (например, "Выбраны заказы: 27") */
  label: string;
  /** React элементы (кнопки, действия), отображаемые справа */
  actions?: React.ReactNode;
  /** Отображать ли меню (для анимации появления/исчезновения) */
  open?: boolean;
}

/**
 * Универсальный компонент нижнего меню.
 * Отображает фиксированное меню внизу экрана с текстом слева и кнопками действий справа.
 * Используется для групповых операций над выбранными элементами.
 * Автоматически учитывает ширину боковой панели для правильного позиционирования.
 *
 * @component
 * @param {BottomMenuProps} props - Параметры компонента
 * @param {React.Ref<HTMLDivElement>} ref - Реф для доступа к DOM-элементу
 * @returns {React.ReactElement} Компонент нижнего меню
 *
 * @example
 * ```tsx
 * <BottomMenu
 *   label="Выбраны заказы: 27"
 *   actions={
 *     <>
 *       <Button variant="contrast-fade" onClick={() => handleApprove()}>
 *         Утвердить
 *       </Button>
 *       <Button variant="contrast-fade" onClick={() => handleExecute()}>
 *         Выполнить
 *       </Button>
 *     </>
 *   }
 * />
 * ```
 */
export const BottomMenu = React.forwardRef<HTMLDivElement, BottomMenuProps>(
  ({ className, label, actions, open = true, ...props }, ref) => {
    if (!open) {
      return null;
    }

    return (
      <div
        ref={ref}
        style={{ left: 'var(--sidebar-width, 0px)' }}
        className={cn(
          'fixed bottom-0 right-0 flex items-center justify-center p-4',
          'shadow-bottom-menu',
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            'flex w-full items-center justify-between gap-4 rounded-xl bg-background-sidebar p-4',
            'max-w-full',
          )}
        >
          <p className='text-sm font-normal leading-5 tracking-[0.25px] text-foreground-white'>
            {label}
          </p>
          {actions && <div className='flex items-center gap-2'>{actions}</div>}
        </div>
      </div>
    );
  },
);
BottomMenu.displayName = 'BottomMenu';
