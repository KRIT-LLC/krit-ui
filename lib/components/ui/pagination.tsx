import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/utils';
import ChevronLeft from '@/assets/chevron_left.svg?react';
import ChevronRight from '@/assets/chevron_right.svg?react';
import LastPage from '@/assets/last_page.svg?react';
import { Button } from './button';
import { Select } from './select';

function PaginationButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Button
      variant='fade-contrast-transparent'
      className={cn('h-6 w-6 p-0 lg:flex rounded-full', { 'bg-background-theme-fade': active })}
      disabled={active}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

/**
 * Свойства компонента пагинации
 */
export interface PaginationProps {
  /** Горизонтальные отступы компонента */
  horizontalPadding?: 'small' | 'medium' | 'large';
  /** Дополнительные CSS-классы для контейнера */
  className?: string;
  /** Количество элементов на странице */
  pageSize?: number;
  /** Общее количество страниц */
  pageCount?: number;
  /** Индекс текущей страницы (начиная с 0) */
  pageIndex?: number;
  /** Возможность перейти на предыдущую страницу */
  canPreviousPage?: boolean;
  /** Возможность перейти на следующую страницу */
  canNextPage?: boolean;
  /** Количество выбранных элементов */
  selectedCount?: number;
  /** Общее количество элементов */
  totalCount?: number;
  /** Компактный режим без кнопок первой/последней страницы */
  compact?: boolean;
  /** Скрыть селектор размера страницы */
  hideDisplayBy?: boolean;
  /** Обработчик перехода на предыдущую страницу */
  previousPage?: () => void;
  /** Обработчик перехода на следующую страницу */
  nextPage?: () => void;
  /** Обработчик изменения размера страницы */
  setPageSize?: (value: number) => void;
  /** Обработчик изменения индекса страницы */
  setPageIndex?: (value: number) => void;
}

/**
 * Компонент пагинации для навигации по страницам данных
 * Поддерживает выбор размера страницы, отображение выбранных элементов и различные варианты отображения
 *
 * @component
 * @param {PaginationProps} props - Параметры компонента
 * @param {'small' | 'medium' | 'large'} [props.horizontalPadding='medium'] - Горизонтальные отступы компонента
 * @param {string} [props.className] - Дополнительные CSS-классы для контейнера
 * @param {number} [props.pageSize] - Количество элементов на странице
 * @param {number} [props.pageCount=0] - Общее количество страниц
 * @param {number} [props.pageIndex=0] - Индекс текущей страницы (начиная с 0)
 * @param {boolean} [props.canPreviousPage] - Возможность перейти на предыдущую страницу
 * @param {boolean} [props.canNextPage] - Возможность перейти на следующую страницу
 * @param {number} [props.selectedCount] - Количество выбранных элементов
 * @param {number} [props.totalCount] - Общее количество элементов
 * @param {boolean} [props.compact=false] - Компактный режим без кнопок первой/последней страницы
 * @param {boolean} [props.hideDisplayBy=false] - Скрыть селектор размера страницы
 * @param {function} [props.previousPage] - Обработчик перехода на предыдущую страницу
 * @param {function} [props.nextPage] - Обработчик перехода на следующую страницу
 * @param {function} [props.setPageSize] - Обработчик изменения размера страницы
 * @param {function} [props.setPageIndex] - Обработчик изменения индекса страницы
 * @returns {React.ReactElement} Компонент пагинации
 *
 * @example
 * // Базовое использование
 * <Pagination
 *   pageSize={20}
 *   pageCount={10}
 *   pageIndex={0}
 *   canPreviousPage={false}
 *   canNextPage={true}
 *   setPageSize={(size) => setPageSize(size)}
 *   setPageIndex={(index) => setPageIndex(index)}
 *   previousPage={() => setPageIndex(pageIndex - 1)}
 *   nextPage={() => setPageIndex(pageIndex + 1)}
 * />
 *
 * @example
 * // С выбранными элементами
 * <Pagination
 *   pageSize={20}
 *   pageCount={10}
 *   pageIndex={2}
 *   canPreviousPage={true}
 *   canNextPage={true}
 *   selectedCount={5}
 *   totalCount={200}
 *   setPageSize={(size) => setPageSize(size)}
 *   setPageIndex={(index) => setPageIndex(index)}
 *   previousPage={() => setPageIndex(pageIndex - 1)}
 *   nextPage={() => setPageIndex(pageIndex + 1)}
 * />
 *
 * @example
 * // Компактный режим
 * <Pagination
 *   pageSize={20}
 *   pageCount={10}
 *   pageIndex={4}
 *   canPreviousPage={true}
 *   canNextPage={true}
 *   compact={true}
 *   setPageSize={(size) => setPageSize(size)}
 *   setPageIndex={(index) => setPageIndex(index)}
 *   previousPage={() => setPageIndex(pageIndex - 1)}
 *   nextPage={() => setPageIndex(pageIndex + 1)}
 * />
 */
export function Pagination({
  horizontalPadding,
  className,
  pageSize,
  pageCount = 0,
  pageIndex = 0,
  canPreviousPage,
  canNextPage,
  selectedCount,
  totalCount,
  compact,
  hideDisplayBy,
  previousPage,
  nextPage,
  setPageSize,
  setPageIndex,
}: PaginationProps) {
  const { t } = useTranslation();
  const getCellPadding = () => {
    switch (horizontalPadding) {
      case 'small':
        return 'px-6';
      case 'large':
        return 'px-10';
      case 'medium':
      default:
        return 'px-8';
    }
  };

  const isFirstPageActive = pageCount <= 3 ? pageIndex === 0 : pageIndex < pageCount - 3;
  const getFirstPageNumber = () => {
    if (pageCount <= 3) return 1;
    if (pageIndex < pageCount - 3) return pageIndex + 1;
    else return pageCount - 3;
  };
  const onFirstPageClick = () => {
    if (pageCount <= 3) return setPageIndex?.(0);
    setPageIndex?.(pageIndex < pageCount - 3 ? pageIndex : pageCount - 4);
  };

  const isAfterFirstPageActive = pageCount <= 3 ? pageIndex === 1 : pageIndex === pageCount - 3;
  const getAfterFirstPageNumber = () => {
    if (pageCount <= 3) return 2;
    if (pageIndex < pageCount - 3) return pageIndex + 2;
    else return pageCount - 2;
  };
  const onAfterFirstPageClick = () => {
    if (pageCount <= 3) return setPageIndex?.(1);
    setPageIndex?.(pageIndex < pageCount - 3 ? pageIndex + 1 : pageCount - 3);
  };

  return (
    <div
      className={cn(
        'mt-auto sticky bottom-0 bg-background flex items-center justify-between min-h-[52px] h-[52px] rounded-bl-3xl rounded-br-3xl border-t border-line-primary',
        getCellPadding(),
        className,
      )}
    >
      {!hideDisplayBy && (
        <div className='flex items-center space-x-2'>
          <Select
            options={[
              { value: '10', label: `${t('displayBy')} 10` },
              { value: '20', label: `${t('displayBy')} 20` },
              { value: '30', label: `${t('displayBy')} 30` },
              { value: '40', label: `${t('displayBy')} 40` },
              { value: '50', label: `${t('displayBy')} 50` },
            ]}
            triggerClassName='h-8 text-sm text-foreground-secondary border-none hover:bg-[transparent] px-0'
            placeholder={`${t('displayBy')} ${pageSize}`}
            value={`${pageSize}`}
            onValueChange={(value: string) => setPageSize?.(Number(value))}
          />
          {!!selectedCount && (
            <div className='flex-1 text-sm text-foreground-secondary'>
              {`${t('selected')} ${selectedCount} ${t('of')} ${totalCount}`}
            </div>
          )}
        </div>
      )}
      <div className='flex items-center space-x-6 lg:space-x-8'>
        <div className='flex items-center text-foreground-secondary'>
          {!compact && (
            <Button
              variant='fade-contrast-transparent'
              className='h-6 w-6 p-0 lg:flex rounded-full'
              onClick={() => setPageIndex?.(0)}
              disabled={!canPreviousPage}
            >
              <span className='sr-only'>Go to first page</span>
              <LastPage className='h-6 w-6 rotate-180' />
            </Button>
          )}
          <Button
            variant='fade-contrast-transparent'
            className='h-6 w-6 p-0 rounded-full'
            onClick={() => previousPage && previousPage()}
            disabled={!canPreviousPage}
          >
            <span className='sr-only'>Go to previous page</span>
            <ChevronLeft className='h-6 w-6' />
          </Button>
          <PaginationButton active={isFirstPageActive} onClick={onFirstPageClick}>
            {getFirstPageNumber()}
          </PaginationButton>
          {pageCount > 1 && (
            <PaginationButton active={isAfterFirstPageActive} onClick={onAfterFirstPageClick}>
              {getAfterFirstPageNumber()}
            </PaginationButton>
          )}
          {pageCount > 2 && (
            <>
              {pageCount > 3 && <span className='cursor-default'>...</span>}
              {pageCount > 3 && (
                <PaginationButton
                  active={pageIndex === pageCount - 2}
                  onClick={() => setPageIndex?.(pageCount - 2)}
                >
                  {pageCount - 1}
                </PaginationButton>
              )}
              <PaginationButton
                active={pageIndex === pageCount - 1}
                onClick={() => setPageIndex?.(pageCount - 1)}
              >
                {pageCount}
              </PaginationButton>
            </>
          )}
          <Button
            variant='fade-contrast-transparent'
            className='h-6 w-6 p-0 rounded-full'
            onClick={() => nextPage && nextPage()}
            disabled={!canNextPage}
          >
            <span className='sr-only'>Go to next page</span>
            <ChevronRight className='h-6 w-6' />
          </Button>
          {!compact && (
            <Button
              variant='fade-contrast-transparent'
              className='hidden h-6 w-6 p-0 lg:flex rounded-full'
              onClick={() => setPageIndex?.(pageCount - 1)}
              disabled={!canNextPage}
            >
              <span className='sr-only'>Go to last page</span>
              <LastPage className='h-6 w-6' />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
