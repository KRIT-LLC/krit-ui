import * as React from 'react';
import { cn } from '@/utils';
import { Separator } from '@/components/ui/separator';

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
 *
 * @component
 * @param {object} props - Параметры компонента
 * @param {string} [props.className] - Дополнительные CSS-классы
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
  {sticky && className?.includes('border-t') && <Separator className="absolute w-full" />}
  {children}
  {sticky && <Separator className="absolute w-full" />}
  {sticky && <Separator className="bg-[transparent]" />}
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
 *
 * @component
 * @param {object} props - Параметры компонента
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @param {React.Ref<HTMLTableRowElement>} ref - Реф для доступа к DOM-элементу
 * @returns {React.ReactElement} Строка таблицы
 */
const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'transition-colors hover:bg-background-primary-hover data-[state=selected]:bg-background-tertiary',
        className,
      )}
      {...props}
    />
  ),
);
TableRow.displayName = 'TableRow';

/**
 * Заголовочная ячейка таблицы. Используется в TableHeader.
 *
 * @component
 * @param {object} props - Параметры компонента
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @param {React.Ref<HTMLTableCellElement>} ref - Реф для доступа к DOM-элементу
 * @returns {React.ReactElement} Заголовочная ячейка таблицы
 */
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-12 px-4 text-left align-middle font-normal text-foreground-secondary [&:has([role=checkbox])]:pr-0',
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
 * @param {React.Ref<HTMLTableCellElement>} ref - Реф для доступа к DOM-элементу
 * @returns {React.ReactElement} Ячейка таблицы с данными
 */
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
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
