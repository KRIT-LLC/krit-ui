import {
  forwardRef,
  Fragment,
  type CSSProperties,
  type ForwardRefExoticComponent,
  type ReactNode,
  type RefAttributes,
  type RefObject,
  useMemo,
  useRef,
} from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import { cn } from '@/utils';
import { ArrowDropDownIcon } from '@/assets';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

export interface TreeNode<T = unknown> {
  id: number | string;
  level?: number;
  children?: TreeNode<T>[];
  [key: string]: unknown;
  onClick?: () => void;
  onDoubleClick?: () => void;
}

/**
 * Пропсы строки таблицы при использовании `tableRowComponent` или строки по умолчанию в `TreeView`.
 */
export interface TreeViewTableRowProps<T extends TreeNode> {
  node: T;
  children: ReactNode;
  onClick: () => void;
  onDoubleClick: () => void;
  className: string;
  'data-index'?: number | string;
}

export interface TreeViewConfig<T extends TreeNode> {
  getNodeId: (node: T) => number | string;
  getNodeLevel: (node: T) => number;
  getNodeChildren: (node: T) => T[] | undefined;
  hasNestedNodes: (node: T) => boolean;
  isNodeExpanded: (node: T) => boolean;
  isNodeSelected: (node: T, selected: unknown) => boolean;
  getNodeHeadingText: (node: T) => string | number | undefined;
  /** Контент перед иконкой раскрытия в колонке названия (например чекбокс). */
  getNodeHeadingPrefix?: (node: T) => ReactNode;
  getNodeFooterText: (node: T) => string | undefined;
  getNodeCellValues: (node: T) => ReactNode[];
  getNodeHeadingClassName?: (node: T) => string | undefined;
  getNodeHeadingMaxLength?: (node: T) => number | undefined;
  /** Возвращает готовый ReactNode для footer (например ссылку). Если undefined — рендерится getNodeFooterText в span. */
  getNodeFooterNode?: (
    node: T,
    options: { text: string; className: string },
  ) => ReactNode | undefined;
  /** Дополнительные CSS-классы для стандартного футера (когда getNodeFooterNode не используется). */
  getNodeFooterClassName?: (node: T) => string | undefined;
  renderTooltip?: (node: T) => ReactNode;
  renderExpandIcon?: (node: T, isExpanded: boolean, onClick: () => void) => ReactNode;
  /** Ширина колонки направляющих дерева, px (по умолчанию 24). */
  treeGuideColumnWidth?: number;
  /** Смещение якоря линии от начала контентной области, px (по умолчанию половина treeGuideColumnWidth). */
  treeLineAnchorOffset?: number;
  /** Вертикальная позиция соединительной линии в строке (по умолчанию середина строки). */
  treeLineAnchorTop?: number | string;
}

/**
 * Строка таблицы с ref (виртуализатор dnd-kit и др.).
 */
export type TreeViewTableRowComponent<T extends TreeNode> = ForwardRefExoticComponent<
  TreeViewTableRowProps<T> & RefAttributes<HTMLTableRowElement>
>;

const DefaultTableRow = forwardRef<HTMLTableRowElement, TreeViewTableRowProps<TreeNode>>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- node нужен в API кастомной строки
  ({ node: _n, children, onClick, onDoubleClick, className, 'data-index': dataIndex }, ref) => (
    <tr
      ref={ref}
      data-index={dataIndex}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      className={className}>
      {children}
    </tr>
  ),
);
DefaultTableRow.displayName = 'DefaultTableRow';

export interface TreeViewProps<T extends TreeNode> {
  nodes: T[];
  selected?: unknown;
  config: TreeViewConfig<T>;
  headers?: string[];
  /** Кастомные ячейки заголовка (например FiltersColumnHeader). Приоритетнее headers. */
  headerCells?: ReactNode[];
  className?: string;
  columnWidths?: (number | string)[];
  columnAlignments?: ('left' | 'center' | 'right')[];
  onExpand: (node: T) => void;
  /**
   * Кастомная строка таблицы (например, с ref для dnd-kit). По умолчанию — стандартная строка.
   * Должна рендерить &lt;tr ref&gt; в корне и вложить `children` (ячейки &lt;td&gt;).
   */
  tableRowComponent?: TreeViewTableRowComponent<T>;

  // Virtualization props
  virtualized?: boolean;
  estimateRowSize?: number;
  overscan?: number;
  scrollElementRef?: RefObject<HTMLDivElement>;
  /** ID для scroll-контейнера (для синхронизации скролла с другими элементами) */
  scrollContainerId?: string;
  /** Чередование фона строк, как в DataTable */
  striped?: boolean;
  /** Горизонтальные отступы ячеек, как в DataTable; `none` — без доп. отступов (узкие деревья навигации) */
  horizontalPadding?: 'none' | 'small' | 'medium' | 'large';
  /** `compact` — плотные строки без отступов DataTable (дерево настроек Toro) */
  density?: 'default' | 'compact';
  /**
   * Если задан, подменяет содержимое первой ячейки заголовка (например, заголовок + кнопка).
   * Остальные колонки по-прежнему из `headers`. Не используется вместе с `headerCells`.
   */
  renderFirstColumnHeader?: ReactNode;
}

/**
 * TreeView - компонент для отображения иерархических данных в табличном формате.
 */
export const TreeView = <T extends TreeNode>(props: TreeViewProps<T>) => {
  const {
    nodes,
    selected,
    config,
    headers,
    headerCells,
    className,
    columnWidths,
    columnAlignments,
    onExpand,
    tableRowComponent: TableRowFromProps,
    virtualized = false,
    estimateRowSize = 40,
    overscan = 20,
    scrollElementRef: externalScrollRef,
    scrollContainerId,
    striped = false,
    horizontalPadding = 'medium',
    density = 'default',
    renderFirstColumnHeader,
  } = props;

  const Tr = (TableRowFromProps ?? DefaultTableRow) as TreeViewTableRowComponent<T>;

  const isCompact = density === 'compact';

  const getFirstColumnPadding = () => {
    switch (horizontalPadding) {
      case 'none':
        return '';
      case 'small':
        return 'pl-4';
      case 'large':
        return 'pl-8';
      case 'medium':
      default:
        return 'pl-6';
    }
  };

  const getLastColumnPadding = () => {
    switch (horizontalPadding) {
      case 'none':
        return '';
      case 'small':
        return 'pr-4';
      case 'large':
        return 'pr-8';
      case 'medium':
      default:
        return 'pr-6';
    }
  };

  const getRowContentClassName = () =>
    cn(
      'relative flex min-w-0 flex-1',
      isCompact ? 'items-center py-[3px]' : 'items-stretch py-2',
    );

  const getHeadingTextClassName = (node: T, shouldShowCursor: boolean) =>
    cn(
      'truncate font-normal text-foreground-primary',
      isCompact ? 'text-xs leading-4' : 'text-sm leading-5',
      {
        'cursor-pointer': shouldShowCursor,
      },
      config.getNodeHeadingClassName?.(node),
    );

  const getRowClassName = (rowIndex: number, isSelected: boolean) =>
    cn(
      'transition-colors hover:bg-background-primary-hover',
      striped && rowIndex % 2 === 1 && 'bg-background-secondary',
      isSelected && 'bg-background-primary-selected',
    );

  const getTreeGuideWidth = () => config.treeGuideColumnWidth ?? 24;
  const getTreeLineAnchorOffset = () =>
    config.treeLineAnchorOffset ?? getTreeGuideWidth() / 2;
  const getTreeLineAnchorTop = () => {
    const anchorTop = config.treeLineAnchorTop ?? '50%';
    return typeof anchorTop === 'number' ? `${anchorTop}px` : anchorTop;
  };
  const getTreeGuideColumnStyle = (): CSSProperties => {
    const width = getTreeGuideWidth();
    return { width, minWidth: width, maxWidth: width };
  };

  const renderDefaultExpandIcon = (
    hasNested: boolean,
    isExpanded: boolean,
    onClick: () => void,
  ) => {
    if (!hasNested) {
      return <div className='w-6 flex-shrink-0' />;
    }
    return (
      <ArrowDropDownIcon
        className={cn(
          'w-6 h-6 cursor-pointer text-icon-contrast transition-transform duration-200 -rotate-90 flex-shrink-0',
          {
            'rotate-0': isExpanded,
          },
        )}
        onClick={e => {
          e.stopPropagation();
          onClick();
        }}
      />
    );
  };

  const baseFooterClassName =
    'text-foreground-secondary text-xs font-normal leading-4 tracking-[0.4px] truncate';

  const renderFooter = (node: T, footerText: string | undefined): ReactNode => {
    if (!footerText) return null;
    const footerClassName = cn(baseFooterClassName, config.getNodeFooterClassName?.(node));
    const customNode = config.getNodeFooterNode?.(node, {
      text: footerText,
      className: footerClassName,
    });
    if (customNode) return customNode;
    return (
      <span className={footerClassName} title={String(footerText)}>
        {footerText}
      </span>
    );
  };

  const renderTreeGuideColumns = (
    level: number,
    guides: boolean[],
    isLastChild: boolean,
    skipGuides: boolean[],
  ) =>
    Array.from({ length: level }).map((_, i) => (
      <div key={i} className='relative flex-shrink-0' style={getTreeGuideColumnStyle()}>
        {guides[i] && i !== level - 1 && !skipGuides[i] && (
          <div className='absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-line-contrast' />
        )}
        {i === level - 1 && (
          <>
            <div
              className='absolute left-1/2 top-0 w-[1px] -translate-x-1/2 bg-line-contrast'
              style={{ height: getTreeLineAnchorTop() }}
            />
            <div
              className='absolute h-[1px] bg-line-contrast'
              style={{
                top: getTreeLineAnchorTop(),
                left: '50%',
                width: `calc(50% + ${getTreeLineAnchorOffset()}px)`,
              }}
            />
            {!isLastChild && (
              <div
                className='absolute left-1/2 bottom-0 w-[1px] -translate-x-1/2 bg-line-contrast'
                style={{ top: getTreeLineAnchorTop() }}
              />
            )}
          </>
        )}
      </div>
    ));

  const renderTreeHeadingControls = (
    node: T,
    hasNested: boolean,
    isExpanded: boolean,
    shouldShowCursor: boolean,
    headingText: string | number | undefined,
    headingMaxLength: number | undefined,
    footerText: string | undefined,
    children: T[] | undefined,
  ) => (
    <div className='flex min-w-0 flex-1 items-center'>
      {config.getNodeHeadingPrefix?.(node) ? (
        <div
          className='relative z-10 mr-1 flex shrink-0 self-stretch'
          style={getTreeGuideColumnStyle()}>
          <div className='flex items-center justify-center' style={getTreeGuideColumnStyle()}>
            {config.getNodeHeadingPrefix(node)}
          </div>
          {hasNested && isExpanded && (
            <div
              className='absolute left-1/2 w-[1px] -translate-x-1/2 bg-line-contrast'
              style={{ top: '17px', bottom: '-8px' }}
            />
          )}
        </div>
      ) : null}
      {!config.getNodeHeadingPrefix && !!children?.length && isExpanded && (
        <div
          className='absolute bottom-0 w-[1px] -translate-x-1/2 bg-line-contrast'
          style={{ top: getTreeLineAnchorTop(), left: getTreeLineAnchorOffset() }}
        />
      )}
      <div className='relative z-10 flex shrink-0'>
        {config.renderExpandIcon
          ? config.renderExpandIcon(node, isExpanded, () => onExpand(node))
          : renderDefaultExpandIcon(hasNested, isExpanded, () => onExpand(node))}
      </div>
      <div className='ml-2 flex min-w-0 flex-col gap-[2px]'>
        {config.renderTooltip ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  className={getHeadingTextClassName(node, shouldShowCursor)}
                  style={headingMaxLength ? { maxWidth: `${headingMaxLength}ch` } : undefined}>
                  {headingText}
                </span>
              </TooltipTrigger>
              <TooltipContent className='max-w-[300px]'>{config.renderTooltip(node)}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <span
            className={getHeadingTextClassName(node, shouldShowCursor)}
            style={headingMaxLength ? { maxWidth: `${headingMaxLength}ch` } : undefined}
            title={String(headingText ?? '')}>
            {headingText}
          </span>
        )}
        {renderFooter(node, footerText)}
      </div>
    </div>
  );

  const visibleRowIndexByNodeId = useMemo(() => {
    const map = new Map<number | string, number>();
    let index = 0;

    const traverse = (nodeList: T[]) => {
      nodeList.forEach(node => {
        map.set(config.getNodeId(node), index);
        index += 1;

        const children = config.getNodeChildren(node);
        if (children?.length && config.isNodeExpanded(node)) {
          traverse(children);
        }
      });
    };

    traverse(nodes);
    return map;
  }, [nodes, config]);

  const internalScrollRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = (externalScrollRef ?? internalScrollRef) as RefObject<HTMLDivElement>;

  const flattenedNodesWithGuides = useMemo(() => {
    if (!virtualized) return [];

    type FlatNode = { node: T; guides: boolean[]; isLastChild: boolean; skipGuides: boolean[] };
    const result: FlatNode[] = [];

    const traverse = (nodeList: T[], guides: boolean[] = [], skipGuides: boolean[] = []) => {
      nodeList.forEach((node, index) => {
        const isLastChild = index === nodeList.length - 1;
        const level = config.getNodeLevel(node);
        result.push({ node, guides, isLastChild, skipGuides });

        const children = config.getNodeChildren(node);
        const isExpanded = config.isNodeExpanded(node);

        if (children?.length && isExpanded) {
          const newSkipGuides = new Array(level + 1).fill(false);
          for (let i = 0; i < level - 1; i++) {
            newSkipGuides[i] = skipGuides[i] || false;
          }
          if (isLastChild && level > 0) {
            newSkipGuides[level - 1] = true;
          }
          traverse(children, [...guides, true], newSkipGuides);
        }
      });
    };

    traverse(nodes);
    return result;
  }, [nodes, virtualized, config]);

  const virtualizer = useVirtualizer({
    count: virtualized ? flattenedNodesWithGuides.length : 0,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => estimateRowSize,
    overscan,
  });

  const virtualItems = virtualized ? virtualizer.getVirtualItems() : [];

  const paddingTop = virtualized ? (virtualItems[0]?.start ?? 0) : 0;
  const paddingBottom = virtualized
    ? virtualizer.getTotalSize() - (virtualItems[virtualItems.length - 1]?.end ?? 0)
    : 0;

  const getColumnWidth = (index: number): CSSProperties | undefined => {
    if (!columnWidths || !columnWidths[index]) return undefined;
    const width = columnWidths[index];
    return {
      width: typeof width === 'number' ? `${width}px` : width,
      maxWidth: typeof width === 'number' ? `${width}px` : width,
      minWidth: typeof width === 'number' ? `${width}px` : width,
    };
  };

  const getColumnAlignment = (index: number): 'left' | 'center' | 'right' => {
    if (!columnAlignments || !columnAlignments[index]) {
      return index === 0 ? 'left' : 'center';
    }
    return columnAlignments[index];
  };

  const renderFirstColumnCell = (
    node: T,
    level: number,
    guides: boolean[],
    isLastChild: boolean,
    skipGuides: boolean[],
    hasNested: boolean,
    isExpanded: boolean,
    shouldShowCursor: boolean,
    headingText: string | number | undefined,
    headingMaxLength: number | undefined,
    footerText: string | undefined,
    children: T[] | undefined,
    cellValues: ReactNode[],
  ) => (
    <td
      className={cn('border-r border-line-primary p-0', {
        'border-r-0': cellValues.length === 0,
      })}
      style={getColumnWidth(0)}>
      <div className={cn('flex items-stretch', getFirstColumnPadding())}>
        {renderTreeGuideColumns(level, guides, isLastChild, skipGuides)}
        <div className={getRowContentClassName()}>
          {renderTreeHeadingControls(
            node,
            hasNested,
            isExpanded,
            shouldShowCursor,
            headingText,
            headingMaxLength,
            footerText,
            children,
          )}
        </div>
      </div>
    </td>
  );

  const renderDataCells = (cellValues: ReactNode[]) =>
    cellValues.map((value, cellIndex) => (
      <td
        key={cellIndex}
        className={cn(
          'border-r border-line-primary align-middle text-foreground-primary',
          isCompact ? 'py-[3px]' : 'p-2',
          {
            'text-left': getColumnAlignment(cellIndex + 1) === 'left',
            'text-center': getColumnAlignment(cellIndex + 1) === 'center',
            'text-right': getColumnAlignment(cellIndex + 1) === 'right',
            'border-r-0': cellIndex === cellValues.length - 1,
          },
          cellIndex === cellValues.length - 1 && getLastColumnPadding(),
        )}
        style={getColumnWidth(cellIndex + 1)}>
        {value}
      </td>
    ));

  const renderSingleRow = (
    node: T,
    guides: boolean[],
    isLastChild: boolean,
    skipGuides: boolean[] = [],
    rowKey?: number | string,
    measureRef?: (el: Element | null) => void,
  ): ReactNode => {
    const nodeId = config.getNodeId(node);
    const trKey = rowKey !== undefined ? rowKey : nodeId;
    const level = config.getNodeLevel(node);
    const children = config.getNodeChildren(node);
    const hasNested = config.hasNestedNodes(node);
    const isExpanded = config.isNodeExpanded(node);
    const isSelected = selected ? config.isNodeSelected(node, selected) : false;
    const headingText = config.getNodeHeadingText(node);
    const headingMaxLength = config.getNodeHeadingMaxLength?.(node);
    const footerText = config.getNodeFooterText(node);
    const cellValues = config.getNodeCellValues(node);

    const shouldShowCursor = !!(node.onClick || node.onDoubleClick);
    const rowIndex = rowKey !== undefined ? Number(rowKey) : (visibleRowIndexByNodeId.get(nodeId) ?? 0);

    return (
      <Tr
        key={trKey}
        ref={measureRef}
        data-index={rowKey}
        node={node}
        className={cn('group', getRowClassName(rowIndex, isSelected))}
        onClick={() => node.onClick?.()}
        onDoubleClick={() => node.onDoubleClick?.()}>
        {renderFirstColumnCell(
          node,
          level,
          guides,
          isLastChild,
          skipGuides,
          hasNested,
          isExpanded,
          shouldShowCursor,
          headingText,
          headingMaxLength,
          footerText,
          children,
          cellValues,
        )}
        {renderDataCells(cellValues)}
      </Tr>
    );
  };

  const renderNodes = (
    nodesToRender: T[] = [],
    guides: boolean[] = [],
    skipGuides: boolean[] = [],
  ): ReactNode => {
    return nodesToRender.map((node, index) => {
      const nodeId = config.getNodeId(node);
      const level = config.getNodeLevel(node);
      const children = config.getNodeChildren(node);
      const hasNested = config.hasNestedNodes(node);
      const isExpanded = config.isNodeExpanded(node);
      const isSelected = selected ? config.isNodeSelected(node, selected) : false;
      const headingText = config.getNodeHeadingText(node);
      const headingMaxLength = config.getNodeHeadingMaxLength?.(node);
      const footerText = config.getNodeFooterText(node);
      const cellValues = config.getNodeCellValues(node);

      const isLastChild = index === nodesToRender.length - 1;
      const shouldShowCursor = !!(node.onClick || node.onDoubleClick);
      const rowIndex = visibleRowIndexByNodeId.get(nodeId) ?? 0;

      return (
        <Fragment key={nodeId}>
          <Tr
            node={node}
            className={cn('group', getRowClassName(rowIndex, isSelected))}
            onClick={() => node.onClick?.()}
            onDoubleClick={() => node.onDoubleClick?.()}>
            {renderFirstColumnCell(
              node,
              level,
              guides,
              isLastChild,
              skipGuides,
              hasNested,
              isExpanded,
              shouldShowCursor,
              headingText,
              headingMaxLength,
              footerText,
              children,
              cellValues,
            )}
            {renderDataCells(cellValues)}
          </Tr>
          {!!children?.length &&
            isExpanded &&
            (() => {
              const newSkipGuides = new Array(level + 1).fill(false);
              for (let i = 0; i < level - 1; i++) {
                newSkipGuides[i] = skipGuides[i] || false;
              }
              if (isLastChild && level > 0) {
                newSkipGuides[level - 1] = true;
              }
              return renderNodes(children, [...guides, true], newSkipGuides);
            })()}
        </Fragment>
      );
    });
  };

  const headersArray = headers || [];
  const headerItems = headerCells ?? headersArray;
  const hasHeaderLabels =
    headerItems.length > 0 &&
    headerItems.some(header =>
      headerCells ? header !== null && header !== undefined : String(header).trim() !== '',
    );
  const showThead = hasHeaderLabels || renderFirstColumnHeader !== undefined;
  const columnCount = headerCells ? headerItems.length || 1 : Math.max(headersArray.length, 1);

  const thClassName = (index: number, isLast: boolean) =>
    cn(
      'box-border min-h-9 overflow-hidden border-b border-r border-line-primary border-b-line-primary-disabled p-2 text-left font-medium text-foreground-primary align-middle min-w-0',
      index === 0 && getFirstColumnPadding(),
      isLast && cn(getLastColumnPadding(), 'border-r-0'),
      {
        'text-left': index === 0 || getColumnAlignment(index) === 'left',
        'text-center': index !== 0 && getColumnAlignment(index) === 'center',
        'text-right': index !== 0 && getColumnAlignment(index) === 'right',
      },
    );

  return (
    <div
      ref={scrollRef}
      id={scrollContainerId}
      className={cn('h-full overflow-auto', className)}>
      <table className='w-full border-collapse text-sm'>
        {showThead && (
          <thead className='sticky top-0 z-10 bg-background-secondary'>
            <tr>
              {headerCells ? (
                headerItems.map((header, index) => (
                  <th
                    key={index}
                    className={thClassName(index, index === headerItems.length - 1)}
                    style={getColumnWidth(index)}>
                    {header}
                  </th>
                ))
              ) : (
                <>
                  <th className={thClassName(0, headersArray.length <= 1)} style={getColumnWidth(0)}>
                    {renderFirstColumnHeader ??
                      (headersArray[0] != null && String(headersArray[0]).trim() !== '' ? (
                        <span className='block truncate' title={String(headersArray[0])}>
                          {headersArray[0]}
                        </span>
                      ) : null)}
                  </th>
                  {headersArray.slice(1).map((header, index) => (
                    <th
                      key={index + 1}
                      className={thClassName(
                        index + 1,
                        index + 1 === headersArray.length - 1,
                      )}
                      style={getColumnWidth(index + 1)}>
                      <span className='block truncate' title={String(header)}>
                        {header}
                      </span>
                    </th>
                  ))}
                </>
              )}
            </tr>
          </thead>
        )}
        <tbody>
          {virtualized ? (
            <>
              {paddingTop > 0 && (
                <tr style={{ height: `${paddingTop}px` }}>
                  <td colSpan={columnCount} />
                </tr>
              )}
              {virtualItems.map(virtualRow => {
                const { node, guides, isLastChild, skipGuides } =
                  flattenedNodesWithGuides[virtualRow.index];
                return renderSingleRow(
                  node,
                  guides,
                  isLastChild,
                  skipGuides,
                  virtualRow.index,
                  virtualizer.measureElement,
                );
              })}
              {paddingBottom > 0 && (
                <tr style={{ height: `${paddingBottom}px` }}>
                  <td colSpan={columnCount} />
                </tr>
              )}
            </>
          ) : (
            renderNodes(nodes)
          )}
        </tbody>
      </table>
    </div>
  );
};
