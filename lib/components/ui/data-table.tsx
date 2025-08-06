import React from 'react';
import {
  ColumnDef,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  OnChangeFn,
  PaginationState,
  Row,
  RowSelectionState,
  SortingState,
  Table as TanTable,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/utils';
import ChevronLeft from '@/assets/chevron_left.svg?react';
import ChevronRight from '@/assets/chevron_right.svg?react';
import LastPage from '@/assets/last_page.svg?react';
import { Button } from './button';
import { Select } from './select';
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
  headerClassName?: string;
  columnVisibility?: VisibilityState;
  onColumnVisibilityChange?: OnChangeFn<VisibilityState>;
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
  sorting,
  expanded,
  manualSorting = true,
  paginationProps,
  className,
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
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    getRowId,
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: rowCount,
    state: { pagination, rowSelection: selection, sorting, expanded, columnVisibility },
    manualSorting,
    enableRowSelection,
    enableMultiRowSelection,
    onPaginationChange,
    onRowSelectionChange,
    onSortingChange,
    onExpandedChange,
    onColumnVisibilityChange,
    // @ts-ignore
    getSubRows: row => row.subRows,
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
    <div className={cn('relative flex flex-1 flex-col h-full', className)}>
      <Table>
        <TableHeader
          className={cn(isStickyHeader && 'sticky top-0 bg-background z-10', headerClassName)}
        >
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id} className='border-line-primary'>
              {headerGroup.headers.map(header => {
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: header.getSize() }}
                    className={getCellPadding()}
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
        <TableBody>
          {loading
            ? table.getHeaderGroups().map(headerGroup =>
                Array.from({ length: 5 }).map((_, key) => (
                  <TableRow key={key}>
                    {headerGroup.headers.map(header => {
                      return (
                        <TableCell
                          key={header.id}
                          colSpan={header.colSpan}
                          style={{ width: header.column.getSize() }}
                          className={getCellPadding()}
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
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                      className={getCellPadding()}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
                {row.getIsExpanded() && (
                  <TableRow key={`${row.id}-expanded`}>
                    <td colSpan={row.getVisibleCells().length}>
                      {
                        // @ts-ignore
                        row.original.customExpandedContent
                      }
                    </td>
                  </TableRow>
                )}
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                {noResultsText}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {pagination && (
        <DataTablePagination
          paginationProps={paginationProps}
          table={table}
          horizontalPadding={horizontalPadding}
        />
      )}
    </div>
  );
}

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
      variant='ghost'
      className={cn('h-6 w-6 p-0 lg:flex rounded-full', { 'bg-background-theme-fade': active })}
      disabled={active}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export interface PaginationProps {
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
  hideDisplayBy?: boolean;
  previousPage?: () => void;
  nextPage?: () => void;
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
              variant='ghost'
              className='h-6 w-6 p-0 lg:flex rounded-full'
              onClick={() => setPageIndex?.(0)}
              disabled={!canPreviousPage}
            >
              <span className='sr-only'>Go to first page</span>
              <LastPage className='h-6 w-6 rotate-180' />
            </Button>
          )}
          <Button
            variant='ghost'
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
            variant='ghost'
            className='h-6 w-6 p-0 rounded-full'
            onClick={() => nextPage && nextPage()}
            disabled={!canNextPage}
          >
            <span className='sr-only'>Go to next page</span>
            <ChevronRight className='h-6 w-6' />
          </Button>
          {!compact && (
            <Button
              variant='ghost'
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

interface DataTablePaginationProps<TData> {
  table: TanTable<TData>;
  horizontalPadding?: 'small' | 'medium' | 'large';
  paginationProps?: PaginationProps;
}

export function DataTablePagination<TData>({
  table,
  horizontalPadding = 'medium',
  paginationProps,
}: DataTablePaginationProps<TData>) {
  return (
    <Pagination
      {...paginationProps}
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
    <div className='truncate' style={{ width }} title={children}>
      {children}
    </div>
  );
}
