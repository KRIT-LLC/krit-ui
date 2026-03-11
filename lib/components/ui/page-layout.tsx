import { ReactNode } from 'react';
import { cn } from '@/utils';

interface PageLayoutProps {
  /** Слот для заголовка страницы */
  headerSlot?: ReactNode;
  /** Слот для фильтров */
  filterSlot?: ReactNode;
  /** Слот для основного контента */
  contentSlot?: ReactNode;
  /** Ограничить contentSlot по высоте (overflow-hidden) для внутренней прокрутки контента */
  contentSlotOverflowHidden?: boolean;
}

/**
 * Компонент макета страницы с предустановленными отступами и расположением элементов.
 * Обеспечивает единообразную структуру страниц с заголовком, фильтрами и контентом.
 *
 * @component
 * @param {PageLayoutProps} props - Пропсы компонента
 * @returns {JSX.Element}
 *
 * @example
 * <PageLayout
 *   headerSlot={<PageHeader title="Заголовок" />}
 *   filterSlot={<Filters />}
 *   contentSlot={<Table />}
 * />
 */
export const PageLayout = ({
  headerSlot,
  filterSlot,
  contentSlot,
  contentSlotOverflowHidden = false,
}: PageLayoutProps) => {
  return (
    <div
      className={cn(
        'relative flex min-h-0 flex-1 flex-col pt-4 gap-4',
        contentSlotOverflowHidden ? 'overflow-hidden' : 'overflow-y-auto',
      )}>
      {(headerSlot || filterSlot) && (
        <div className='flex-shrink-0 px-8 flex flex-col gap-4'>
          {headerSlot && <div>{headerSlot}</div>}
          {filterSlot && <div>{filterSlot}</div>}
        </div>
      )}
      {contentSlot && (
        <div className='flex min-h-0 flex-1 flex-col'>{contentSlot}</div>
      )}
    </div>
  );
};
