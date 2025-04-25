import { useEffect, useState } from 'react';
import { ExpandedState, RowSelectionState, SortingState } from '@tanstack/react-table';

interface IProps {
  paginationInitialState?: { pageIndex: number; pageSize: number };
  onSort?: (sort: string, sortType: 'asc' | 'desc') => void;
  onPagination?: (pageIndex: number, pageSize: number) => void;
}

export const useTableStates = ({
  paginationInitialState = { pageIndex: 0, pageSize: 20 },
  onSort,
  onPagination,
}: IProps = {}) => {
  const [mounted, setMounted] = useState(false);
  const [selection, setSelection] = useState<RowSelectionState>({});

  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState(paginationInitialState);
  const [expanded, setExpanded] = useState<ExpandedState>({});

  useEffect(() => {
    if (!sorting.length) return;
    const sortColumn = sorting[0].id;
    const sortType = sorting[0].desc ? 'desc' : 'asc';
    onSort?.(sortColumn, sortType);
  }, [sorting, onSort]);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      return;
    }
    if (!pagination) return;
    onPagination?.(pagination.pageIndex, pagination.pageSize);
  }, [pagination, onPagination, mounted]);

  return {
    selection,
    setSelection,
    sorting,
    setSorting,
    pagination,
    setPagination,
    expanded,
    setExpanded,
  };
};
