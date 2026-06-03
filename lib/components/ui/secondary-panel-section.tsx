import { ReactNode } from 'react';

import { cn } from '@/utils';

export interface SecondaryPanelSectionProps {
  /** Текст при отсутствии данных */
  emptyStateText: ReactNode;
  /** Слот для кнопки или панели действий над контентом */
  actionsSlot?: ReactNode;
  /** Контент при наличии данных */
  children?: ReactNode;
  /** Показать пустое состояние вместо children */
  isEmpty: boolean;
  /** Дополнительные классы для внешнего контейнера */
  className?: string;
  /** Дополнительные классы для внутренней колонки */
  innerClassName?: string;
}

export const SecondaryPanelSection = ({
  emptyStateText,
  actionsSlot,
  children,
  isEmpty,
  className,
  innerClassName,
}: SecondaryPanelSectionProps) => (
  <div className={cn('box-border rounded-lg bg-background-secondary p-6', className)}>
    <div className={cn('flex w-full flex-col items-stretch gap-4', innerClassName)}>
      {actionsSlot != null ? <div className='self-start'>{actionsSlot}</div> : null}
      {isEmpty ? (
        <div className='flex w-full items-center justify-center rounded-lg bg-background-primary py-8'>
          <p className='text-center text-sm leading-5 tracking-[0.25px] text-foreground-primary'>
            {emptyStateText}
          </p>
        </div>
      ) : (
        children
      )}
    </div>
  </div>
);
