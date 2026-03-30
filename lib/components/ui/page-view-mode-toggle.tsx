/* eslint-disable react-refresh/only-export-components -- Публичный API: PAGE_VIEW_TAB и PageViewTab вместе с переключателем */
import { TableRowsOutlineIcon, ViewSidebarOutlineIcon } from '@/assets';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/utils';

import { TabsList, TabsTrigger } from './tabs';

/**
 * Значения вкладок переключения вида «список с панелью» / «таблица».
 */
export const PAGE_VIEW_TAB = {
  LIST: 'list',
  TABLE: 'table',
} as const;

export type PageViewTab = (typeof PAGE_VIEW_TAB)[keyof typeof PAGE_VIEW_TAB];

export interface PageViewModeToggleProps {
  /** Дополнительные классы для `TabsList` */
  className?: string;
  /** Подписи для доступности; по умолчанию ключи `listView` / `tableView` из ThemeProvider */
  listAriaLabel?: string;
  tableAriaLabel?: string;
}

/**
 * Переключатель вида «список с панелью» / «таблица» для экранов с {@link PAGE_VIEW_TAB}.
 * Размещается внутри родительского `Tabs` с соответствующим `value` и `onValueChange`.
 *
 * @component
 */
export const PageViewModeToggle = ({
  className,
  listAriaLabel,
  tableAriaLabel,
}: PageViewModeToggleProps) => {
  const { t } = useTranslation();

  return (
    <TabsList className={cn(className)}>
      <TabsTrigger
        value={PAGE_VIEW_TAB.LIST}
        size='icon'
        aria-label={listAriaLabel ?? t('listView')}>
        <ViewSidebarOutlineIcon />
      </TabsTrigger>
      <TabsTrigger
        value={PAGE_VIEW_TAB.TABLE}
        size='icon'
        aria-label={tableAriaLabel ?? t('tableView')}>
        <TableRowsOutlineIcon />
      </TabsTrigger>
    </TabsList>
  );
};
