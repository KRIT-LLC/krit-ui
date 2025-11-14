import { useState } from 'react';
import { ColumnFiltersState } from '@tanstack/react-table';

export const useColumnFilters = () => {
  const [state, setState] = useState<ColumnFiltersState>([]);

  const get = <T = string>(id: string, filtersState?: ColumnFiltersState) =>
    (filtersState || state).find(item => item.id === id)?.value as T | undefined;

  return { state, setState, get };
};
