import { ReactNode } from 'react';
import { cn } from '@/utils';
import ArrowBack from '@/assets/arrow_back.svg?react';
import ChevronLeft from '@/assets/chevron_left.svg?react';
import ChevronRight from '@/assets/chevron_right.svg?react';

interface PageHeaderProps {
  /** Дополнительные CSS-классы для корневого элемента */
  className?: string;
  /** Заголовок страницы (может быть строкой или React-элементом) */
  title?: ReactNode;
  /** Действия, связанные с заголовком (отображаются рядом с заголовком) */
  titleActions?: ReactNode;
  /** Дополнительная мета-информация слева от заголовка */
  leftMeta?: string | number;
  /** Дополнительная мета-информация рядом с заголовком */
  meta?: string | number;
  /** Действия в правой части заголовка */
  actions?: ReactNode;
  /** Callback-функция для кнопки "Назад" */
  onBack?: () => void;
  /** Callback-функция для кнопки "Вперед" */
  onNext?: () => void;
  /** Callback-функция для кнопки "Назад" в контексте навигации */
  onPrevious?: () => void;
}

/**
 * Компонент заголовка страницы с навигацией и дополнительными действиями.
 * Поддерживает кнопки навигации (назад, вперед), мета-информацию и действия.
 *
 * @component
 * @param {PageHeaderProps} props - Пропсы компонента
 * @returns {JSX.Element}
 *
 * @example
 * <PageHeader
 *   title="Заголовок страницы"
 *   meta="Мета-информация"
 *   onBack={() => console.log('Назад')}
 *   actions={<Button>Действие</Button>}
 * />
 */

export const PageHeader = ({
  className,
  title,
  titleActions,
  leftMeta,
  meta,
  actions,
  onBack,
  onNext,
  onPrevious,
}: PageHeaderProps) => {
  const hasNextOrPrevious = onNext || onPrevious;
  return (
    <div className={cn('w-full flex justify-between items-center', className)}>
      <div className='flex gap-2 items-center'>
        {onBack && (
          <div
            className='p-2 cursor-pointer hover:text-foreground-primary-disabled'
            onClick={onBack}
          >
            <ArrowBack />
          </div>
        )}
        {hasNextOrPrevious && (
          <div
            className={cn(
              'p-2 cursor-pointer hover:text-foreground-primary-disabled',
              !onPrevious && 'opacity-50 pointer-events-none',
            )}
            onClick={onPrevious}
          >
            <ChevronLeft />
          </div>
        )}
        {hasNextOrPrevious && (
          <div
            className={cn(
              'p-2 cursor-pointer hover:text-foreground-primary-disabled',
              !onNext && 'opacity-50 pointer-events-none',
            )}
            onClick={onNext}
          >
            <ChevronRight />
          </div>
        )}
        {leftMeta && (
          <div className='text-[28px] font-medium tracking-[0.18px] text-foreground-primary opacity-50'>
            {leftMeta}
          </div>
        )}
        <div className='text-[28px] font-medium tracking-[0.18px] text-foreground-primary flex items-center gap-1'>
          {title}
        </div>
        <div className='text-[28px] font-medium tracking-[0.18px] text-foreground-theme'>
          {meta}
        </div>
        <div className='flex gap-3 items-center ml-2'>{titleActions}</div>
      </div>
      <div className='flex gap-4'>{actions}</div>
    </div>
  );
};
