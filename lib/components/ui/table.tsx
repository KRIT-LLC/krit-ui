import * as React from 'react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/utils';

/**
 * Контейнер таблицы с поддержкой прокрутки и базовой стилизацией.
 *
 * @component
 * @param {object} props - Параметры компонента
 * @param {string} [props.className] - Дополнительные CSS-классы для элемента table
 * @param {string} [props.rootClassName] - Дополнительные CSS-классы для контейнера
 * @param {React.Ref<HTMLTableElement>} ref - Реф для доступа к DOM-элементу таблицы
 * @returns {React.ReactElement} Контейнер таблицы с вложенной таблицей
 */
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement> & {
    rootClassName?: string;
  }
>(({ className, rootClassName, ...props }, ref) => (
  <div className={cn('relative w-full h-full flex items-start overflow-auto', rootClassName)}>
    <table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props} />
  </div>
));
Table.displayName = 'Table';

/**
 * Заголовок таблицы. Содержит элементы TableHead.
 * Поддерживает режим липкого заголовка, который остается видимым при прокрутке.
 *
 * @component
 * @param {object} props - Параметры компонента
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @param {boolean} [props.sticky] - Если true, заголовок фиксируется при прокрутке (position: sticky)
 * @param {React.Ref<HTMLTableSectionElement>} ref - Реф для доступа к DOM-элементу
 * @returns {React.ReactElement} Секция заголовка таблицы
 */
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement> & { sticky?: boolean }
>(({ className, sticky, children, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      'bg-background [&_tr]:border-b',
      sticky ? 'sticky print:static z-30 top-0 [&_tr]:border-none' : '',
      className,
      sticky ? 'border-none [&_tr]:border-none' : '',
    )}
    {...props}
  >
    {sticky && className?.includes('border-t') && <Separator className='absolute w-full' />}
    {children}
    {sticky && <Separator className='absolute w-full' />}
    {sticky && <Separator className='bg-[transparent]' />}
  </thead>
));
TableHeader.displayName = 'TableHeader';

/**
 * Тело таблицы. Содержит основные данные таблицы в виде TableRow и TableCell.
 *
 * @component
 * @param {object} props - Параметры компонента
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @param {React.Ref<HTMLTableSectionElement>} ref - Реф для доступа к DOM-элементу
 * @returns {React.ReactElement} Секция тела таблицы
 */
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
));
TableBody.displayName = 'TableBody';

/**
 * Подвал таблицы. Обычно содержит итоги или дополнительную информацию.
 *
 * @component
 * @param {object} props - Параметры компонента
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @param {React.Ref<HTMLTableSectionElement>} ref - Реф для доступа к DOM-элементу
 * @returns {React.ReactElement} Секция подвала таблицы
 */
const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn('border-t bg-background font-medium [&>tr]:last:border-b-0', className)}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

/**
 * Строка таблицы. Содержит ячейки TableHead или TableCell.
 * Поддерживает интерактивные состояния: hover и выделение.
 *
 * @component
 * @param {object} props - Параметры компонента
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @param {number} [props.dataIndex] - Индекс строки в данных, добавляется как data-атрибут для доступа через DOM
 * @param {'table' | 'list'} [props.variant='table'] - Вариант стиля: 'table' - стандартный стиль, 'list' - стиль списка
 * @param {React.Ref<HTMLTableRowElement>} ref - Реф для доступа к DOM-элементу
 * @returns {React.ReactElement} Строка таблицы
 */
const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & { dataIndex?: number; variant?: 'table' | 'list' }
>(({ className, dataIndex, variant = 'table', ...props }, ref) => (
  <tr
    ref={ref}
    data-index={dataIndex}
    className={cn(
      variant === 'list'
        ? 'border-b border-line-primary data-[state=selected]:bg-background-tertiary'
        : 'transition-colors hover:bg-background-primary-hover data-[state=selected]:bg-background-tertiary even:bg-background-secondary',
      className,
    )}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

/**
 * Заголовочная ячейка таблицы. Используется в TableHeader.
 *
 * @component
 * @param {object} props - Параметры компонента
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @param {'table' | 'list'} [props.variant='table'] - Вариант стиля: 'table' - стандартный стиль, 'list' - стиль списка
 * @param {React.Ref<HTMLTableCellElement>} ref - Реф для доступа к DOM-элементу
 * @returns {React.ReactElement} Заголовочная ячейка таблицы
 */
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & { variant?: 'table' | 'list' }
>(({ className, variant = 'table', ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-12 text-left font-normal text-foreground-secondary [&:has([role=checkbox])]:pr-0',
      variant === 'list' ? 'align-top' : 'align-middle',
      variant === 'list'
        ? 'py-4 first:pl-0 last:pr-0 [&:not(:first-child)]:pl-4'
        : 'px-4 border-r border-line-primary last:border-r-0',
      className,
    )}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

/**
 * Ячейка таблицы с данными. Используется в TableBody.
 *
 * @component
 * @param {object} props - Параметры компонента
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @param {'table' | 'list'} [props.variant='table'] - Вариант стиля: 'table' - стандартный стиль, 'list' - стиль списка
 * @param {React.Ref<HTMLTableCellElement>} ref - Реф для доступа к DOM-элементу
 * @returns {React.ReactElement} Ячейка таблицы с данными
 */
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement> & { variant?: 'table' | 'list' }
>(({ className, variant = 'table', ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      variant === 'list' ? 'align-top' : 'align-middle',
      '[&:has([role=checkbox])]:pr-0',
      variant === 'list'
        ? 'py-4 first:pl-0 last:pr-0 [&:not(:first-child)]:pl-4'
        : 'p-4 border-r border-line-primary last:border-r-0',
      className,
    )}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

/**
 * Заголовок таблицы. Описывает содержание таблицы.
 *
 * @component
 * @param {object} props - Параметры компонента
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @param {React.Ref<HTMLTableCaptionElement>} ref - Реф для доступа к DOM-элементу
 * @returns {React.ReactElement} Заголовок таблицы
 */
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn('mt-4 text-sm text-muted-foreground', className)} {...props} />
));
TableCaption.displayName = 'TableCaption';

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
