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
 *       <Button variant="fade-contrast-filled" onClick={() => handleApprove()}>
 *         Утвердить
 *       </Button>
 *       <Button variant="fade-contrast-filled" onClick={() => handleExecute()}>
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
        style={{ left: 'calc(var(--sidebar-width, 0px) + 1rem)' }}
        className={cn(
          'fixed bottom-[8px] right-4 flex h-[52px] items-center justify-between gap-4',
          'rounded-[12px] border-0 bg-background-sidebar px-4 py-2 shadow-none',
          className,
        )}
        {...props}
      >
        <p className='text-sm font-normal leading-5 tracking-[0.25px] text-foreground-white'>
          {label}
        </p>
        {actions && <div className='flex items-center gap-2'>{actions}</div>}
      </div>
    );
  },
);
BottomMenu.displayName = 'BottomMenu';
