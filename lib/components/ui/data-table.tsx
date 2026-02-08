import React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  OnChangeFn,
  PaginationState,
  Row,
  RowSelectionState,
  SortingState,
  Table as TanTable,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { cn } from '@/utils';
import { Pagination, PaginationProps } from './pagination';
import { Skeleton } from './skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  horizontalPadding?: 'small' | 'medium' | 'large';
  rowCount?: number;
  noResultsText?: string;
  enableRowSelection?: boolean;
  enableMultiRowSelection?: boolean;
  selection?: RowSelectionState;
  pagination?: PaginationState;
  sorting?: SortingState;
  expanded?: ExpandedState;
  manualSorting?: boolean;
  paginationProps?: PaginationProps;
  className?: string;
  selectedRowClassName?: string;
  onSortingChange?: OnChangeFn<SortingState>;
  getRowId?: (originalRow: TData, index: number, parent?: Row<TData> | undefined) => string;
  onPaginationChange?: OnChangeFn<PaginationState>;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  onRowClick?: (row: TData) => void;
  onExpandedChange?: OnChangeFn<ExpandedState>;
  loading?: boolean;
  skeletonClassName?: string;
  isStickyHeader?: boolean;
  additionalSlot?: React.ReactNode;
  headerClassName?: string;
  columnVisibility?: VisibilityState;
  onColumnVisibilityChange?: OnChangeFn<VisibilityState>;
  columnFilters?: ColumnFiltersState;
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
  rowHoverContent?: (row: TData) => React.ReactNode;
  hideHeader?: boolean;
  variant?: 'table' | 'list';
}

/**
 * Расширенная таблица данных с пагинацией, сортировкой и виртуализацией
 * @component
 * @template TData - Тип элементов данных
 * @template TValue - Тип значений колонок
 * @param {Object} props - Параметры компонента
 * @param {ColumnDef<TData, TValue>[]} props.columns - Конфигурация колонок
 * @param {TData[]} props.data - Данные для отображения
 * @param {'small' | 'medium' | 'large'} [props.horizontalPadding='medium'] - Горизонтальные отступы
 * @param {number} [props.rowCount] - Общее количество строк (для серверной пагинации)
 * @param {string} [props.noResultsText='No results.'] - Текст при отсутствии данных
 * @param {boolean} [props.enableRowSelection=false] - Разрешить выбор строк
 * @param {boolean} [props.enableMultiRowSelection=false] - Разрешить множественный выбор
 * @param {RowSelectionState} [props.selection] - Состояние выбранных строк
 * @param {PaginationState} [props.pagination] - Состояние пагинации
 * @param {SortingState} [props.sorting] - Состояние сортировки
 * @param {boolean} [props.manualSorting=true] - Ручное управление сортировкой
 * @param {PaginationProps} [props.paginationProps] - Свойства пагинации
 * @param {string} [props.className] - Дополнительные классы
 * @param {function} [props.onRowClick] - Обработчик клика по строке
 * @param {boolean} [props.loading] - Состояние загрузки
 * @param {boolean} [props.isStickyHeader] - Фиксированный заголовок
 * @param {boolean} [props.hideHeader=false] - Скрыть строку с заголовками
 * @param {'table' | 'list'} [props.variant='table'] - Вариант стиля таблицы: 'table' - стандартный стиль с границами, 'list' - стиль списка без вертикальных границ и фона строк
 */

export function DataTable<TData, TValue>({
  columns,
  data,
  horizontalPadding = 'medium',
  rowCount,
  noResultsText = 'No results.',
  enableRowSelection = false,
  enableMultiRowSelection = false,
  selection = {},
  pagination,
  sorting,
  expanded,
  manualSorting = true,
  paginationProps,
  className,
  additionalSlot,
  selectedRowClassName,
  onSortingChange,
  getRowId,
  onPaginationChange,
  onRowSelectionChange,
  onRowClick,
  onExpandedChange,
  loading,
  skeletonClassName = 'h-5',
  isStickyHeader,
  headerClassName,
  columnVisibility,
  onColumnVisibilityChange,
  columnFilters,
  onColumnFiltersChange,
  rowHoverContent,
  hideHeader = false,
  variant = 'table',
}: DataTableProps<TData, TValue>) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [hoveredRow, setHoveredRow] = React.useState<TData | null>(null);
  const table = useReactTable({
    getRowId,
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    manualPagination: true,
    rowCount: rowCount,
    state: {
      pagination,
      rowSelection: selection,
      sorting,
      expanded,
      columnVisibility,
      columnFilters,
    },
    manualSorting,
    enableRowSelection,
    enableMultiRowSelection,
    enableColumnResizing: false,
    onPaginationChange,
    onRowSelectionChange,
    onSortingChange,
    onExpandedChange,
    onColumnVisibilityChange,
    onColumnFiltersChange,
    // @ts-expect-error – допускаем наличие подстрок для вложенных строк
    getSubRows: row => row.subRows,
  });

  const getCellPadding = () => {
    if (variant === 'list') {
      // Для варианта list минимальные паддинги только на первой и последней ячейке
      switch (horizontalPadding) {
        case 'small':
          return 'first:pl-0 last:pr-0';
        case 'large':
          return 'first:pl-0 last:pr-0';
        case 'medium':
        default:
          return 'first:pl-0 last:pr-0';
      }
    }
    switch (horizontalPadding) {
      case 'small':
        return 'first:pl-6 last:pr-6';
      case 'large':
        return 'first:pl-10 last:pr-10';
      case 'medium':
      default:
        return 'first:pl-8 last:pr-8';
    }
  };

  const handleRowMouseEnter = (e: React.MouseEvent<HTMLTableRowElement>, rowData: TData) => {
    if (!rowHoverContent || !wrapperRef.current) return;

    const rowEl = e.currentTarget;
    const rowRect = rowEl.getBoundingClientRect();
    const wrapperRect = wrapperRef.current.getBoundingClientRect();

    // Устанавливаем CSS Custom Properties для позиционирования
    wrapperRef.current.style.setProperty('--hover-top', `${rowRect.top - wrapperRect.top}px`);
    wrapperRef.current.style.setProperty('--hover-height', `${rowRect.height}px`);
    wrapperRef.current.style.setProperty('--hover-visible', '1');

    setHoveredRow(rowData);
  };

  const handleRowMouseLeave = () => {
    if (!rowHoverContent || !wrapperRef.current) return;
    wrapperRef.current.style.setProperty('--hover-visible', '0');
  };

  return (
    <div
      ref={wrapperRef}
      onMouseLeave={handleRowMouseLeave}
      className={cn('relative flex flex-1 flex-col h-full', className)}
    >
      <Table>
        {!hideHeader && (
          <TableHeader
            className={cn(isStickyHeader && 'sticky top-0 bg-background z-20', headerClassName)}
          >
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow
                key={headerGroup.id}
                className='border-line-primary'
                variant={variant}
                isHeader
              >
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{
                        minWidth: header.getSize(),
                        width: header.getSize(),
                      }}
                      className={variant === 'list' ? '' : getCellPadding()}
                      variant={variant}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
        )}
        <TableBody>
          {loading
            ? table.getHeaderGroups().map(headerGroup =>
                Array.from({ length: 5 }).map((_, key) => (
                  <TableRow key={key} variant={variant}>
                    {headerGroup.headers.map(header => {
                      return (
                        <TableCell
                          key={header.id}
                          colSpan={header.colSpan}
                          style={{
                            minWidth: header.column.getSize(),
                            width: header.column.getSize(),
                          }}
                          className={variant === 'list' ? '' : getCellPadding()}
                          variant={variant}
                        >
                          <Skeleton className={cn('w-full', skeletonClassName)} />
                        </TableCell>
                      );
                    })}
                  </TableRow>
                )),
              )
            : null}
          {loading ? null : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <React.Fragment key={row.id}>
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && !selectedRowClassName && 'selected'}
                  className={cn(row.getIsSelected() ? selectedRowClassName : '')}
                  onClick={() => onRowClick?.(row.original)}
                  onMouseEnter={e => handleRowMouseEnter(e, row.original)}
                  variant={variant}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell
                      key={cell.id}
                      style={{
                        minWidth: cell.column.getSize(),
                        width: cell.column.getSize(),
                      }}
                      className={variant === 'list' ? '' : getCellPadding()}
                      variant={variant}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
                {row.getIsExpanded() && (
                  <TableRow key={`${row.id}-expanded`} variant={variant}>
                    <td colSpan={row.getVisibleCells().length}>
                      {
                        // @ts-expect-error – в некоторых сущностях содержится кастомный JSX
                        row.original.customExpandedContent
                      }
                    </td>
                  </TableRow>
                )}
              </React.Fragment>
            ))
          ) : (
            <TableRow variant={variant}>
              <TableCell
                colSpan={columns.length}
                className={cn('h-24 text-center', variant === 'list' ? '' : getCellPadding())}
                variant={variant}
              >
                {noResultsText}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {rowHoverContent && hoveredRow && (
        <div
          className='absolute bottom-0 left-0 right-0 z-20 pointer-events-none transition-opacity duration-200'
          style={{
            top: 'var(--hover-top)',
            height: 'var(--hover-height)',
            opacity: 'var(--hover-visible)',
          }}
        >
          <div
            className={cn(
              'h-full flex items-center justify-end pointer-events-none',
              getCellPadding(),
            )}
          >
            <div className='pointer-events-auto'>{rowHoverContent(hoveredRow)}</div>
          </div>
        </div>
      )}
      {additionalSlot}
      {pagination && (
        <DataTablePagination
          paginationProps={paginationProps}
          table={table}
          horizontalPadding={horizontalPadding}
          variant={variant}
        />
      )}
    </div>
  );
}

interface TruncatedCellProps {
  width?: number;
  children?: string;
}

export function TruncatedCell({ width, children }: TruncatedCellProps) {
  return (
    <div className='truncate' style={{ width }} title={children}>
      {children}
    </div>
  );
}

interface DataTablePaginationProps<TData> {
  table: TanTable<TData>;
  horizontalPadding?: 'small' | 'medium' | 'large';
  paginationProps?: PaginationProps;
  variant?: 'table' | 'list';
}

export function DataTablePagination<TData>({
  table,
  horizontalPadding = 'medium',
  paginationProps,
  variant = 'table',
}: DataTablePaginationProps<TData>) {
  // Автоматически применяем стили для варианта list
  const listVariantClassName =
    variant === 'list' ? 'bg-background-secondary rounded-none mt-4 border-none' : '';

  return (
    <Pagination
      {...paginationProps}
      horizontalPadding={horizontalPadding}
      className={cn(paginationProps?.className, listVariantClassName)}
      pageSize={table.getState().pagination.pageSize}
      pageCount={table.getPageCount()}
      pageIndex={table.getState().pagination.pageIndex}
      canPreviousPage={table.getCanPreviousPage()}
      canNextPage={table.getCanNextPage()}
      selectedCount={table.getFilteredSelectedRowModel().rows.length}
      totalCount={table.getFilteredRowModel().rows.length}
      previousPage={table.previousPage}
      nextPage={table.nextPage}
      setPageSize={table.setPageSize}
      setPageIndex={table.setPageIndex}
    />
  );
}
