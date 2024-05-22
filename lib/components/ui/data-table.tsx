import {
  ColumnDef,
  OnChangeFn,
  PaginationState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  Table as TanTable,
  RowSelectionState,
  Row,
} from '@tanstack/react-table';
import { useTranslation } from 'react-i18next'; // TODO: Решить вопрос с локализацией
import ChevronLeft from '@/assets/chevron_left.svg?react';
import ChevronRight from '@/assets/chevron_right.svg?react';
import LastPage from '@/assets/last_page.svg?react';
import { cn } from '@/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';
import { Button } from './button';
import { Select } from './select';

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
  getRowId?: (originalRow: TData, index: number, parent?: Row<TData> | undefined) => string;
  onPaginationChange?: OnChangeFn<PaginationState>;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  onRowClick?: (row: TData) => void;
}

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
  getRowId,
  onPaginationChange,
  onRowSelectionChange,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    getRowId,
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: rowCount,
    state: { pagination, rowSelection: selection },
    enableRowSelection,
    enableMultiRowSelection,
    onPaginationChange,
    onRowSelectionChange,
  });

  const getCellPadding = () => {
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

  return (
    <div className="relative flex flex-1 flex-col h-full overflow-auto">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: header.getSize() }}
                    className={getCellPadding()}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                onClick={() => onRowClick?.(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} style={{ width: cell.column.getSize() }} className={getCellPadding()}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {noResultsText}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {pagination && <DataTablePagination table={table} horizontalPadding={horizontalPadding} />}
    </div>
  );
}

interface PaginationProps {
  horizontalPadding?: 'small' | 'medium' | 'large';
  className?: string;
  pageSize?: number;
  pageCount?: number;
  pageIndex?: number;
  canPreviousPage?: boolean;
  canNextPage?: boolean;
  selectedCount?: number;
  totalCount?: number;
  compact?: boolean;
  previousPage: () => void;
  nextPage: () => void;
  setPageSize?: (value: number) => void;
  setPageIndex?: (value: number) => void;
}

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

  return (
    <div
      className={cn(
        'mt-auto sticky bottom-0 bg-background flex items-center justify-between min-h-[52px] h-[52px] rounded-bl-3xl rounded-br-3xl border-t border-line-primary',
        getCellPadding(),
        className
      )}
    >
      <div className="flex items-center space-x-2">
        <Select
          options={[
            { value: '10', label: `${t('displayBy')} 10` },
            { value: '20', label: `${t('displayBy')} 20` },
            { value: '30', label: `${t('displayBy')} 30` },
            { value: '40', label: `${t('displayBy')} 40` },
            { value: '50', label: `${t('displayBy')} 50` },
          ]}
          triggerClassName="h-8 text-sm text-foreground-secondary border-none hover:bg-[transparent] px-0"
          placeholder={`${t('displayBy')} ${pageSize}`}
          value={`${pageSize}`}
          onValueChange={(value: string) => setPageSize?.(Number(value))}
        />
        {!!selectedCount && (
          <div className="flex-1 text-sm text-foreground-secondary">
            {`${t('selected')} ${selectedCount} ${t('of')} ${totalCount}`}
          </div>
        )}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        {!compact && (
          <div className="flex w-[140px] items-center justify-center text-sm text-foreground-secondary">
            {`${t('page')} ${pageIndex + 1} ${t('of')} ${pageCount || 1}`}
          </div>
        )}
        <div className="flex items-center space-x-2 text-foreground-secondary">
          {!compact && (
            <Button
              variant="ghost"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => setPageIndex?.(0)}
              disabled={!canPreviousPage}
            >
              <span className="sr-only">Go to first page</span>
              <LastPage className="h-6 w-6 rotate-180" />
            </Button>
          )}
          <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => previousPage()} disabled={!canPreviousPage}>
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => nextPage()} disabled={!canNextPage}>
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-6 w-6" />
          </Button>
          {!compact && (
            <Button
              variant="ghost"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => setPageIndex?.(pageCount - 1)}
              disabled={!canNextPage}
            >
              <span className="sr-only">Go to last page</span>
              <LastPage className="h-6 w-6" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

interface DataTablePaginationProps<TData> {
  table: TanTable<TData>;
  horizontalPadding?: 'small' | 'medium' | 'large';
}

export function DataTablePagination<TData>({ table, horizontalPadding = 'medium' }: DataTablePaginationProps<TData>) {
  return (
    <Pagination
      horizontalPadding={horizontalPadding}
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

interface TruncatedCellProps {
  width?: number;
  children?: string;
}

export function TruncatedCell({ width, children }: TruncatedCellProps) {
  return (
    <div className="truncate" style={{ width }} title={children}>
      {children}
    </div>
  );
}
