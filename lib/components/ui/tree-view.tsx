import { Fragment, ReactNode, useMemo, useRef, type CSSProperties } from 'react';
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

  // Virtualization props
  virtualized?: boolean;
  estimateRowSize?: number;
  overscan?: number;
  scrollElementRef?: React.RefObject<HTMLDivElement>;
  /** ID для scroll-контейнера (для синхронизации скролла с другими элементами) */
  scrollContainerId?: string;
  /** Чередование фона строк, как в DataTable */
  striped?: boolean;
  /** Горизонтальные отступы ячеек, как в DataTable */
  horizontalPadding?: 'small' | 'medium' | 'large';
}

/**
 * TreeView - компонент для отображения иерархических данных в табличном формате.
 *
 * @component
 * @template T - Тип узла дерева, должен расширять TreeNode
 * @param {TreeViewProps<T>} props - Параметры компонента
 * @param {T[]} props.nodes - Массив узлов дерева для отображения. Каждый узел может содержать onClick и onDoubleClick
 * @param {unknown} [props.selected] - Текущий выбранный узел
 * @param {function} props.onExpand - Обработчик разворачивания/сворачивания узла
 * @param {TreeViewConfig<T>} props.config - Конфигурация для работы с узлами дерева
 * @param {string[]} [props.headers] - Заголовки колонок таблицы
 * @param {string} [props.className] - Дополнительные CSS-классы для контейнера
 * @param {(number|string)[]} [props.columnWidths] - Ширины колонок (px или строка с единицами)
 * @param {('left'|'center'|'right')[]} [props.columnAlignments] - Выравнивание содержимого колонок
 * @returns {React.ReactElement} Компонент TreeView
 *
 * @example
 * ```tsx
 * const config: TreeViewConfig<MyNode> = {
 *   getNodeId: (node) => node.id,
 *   getNodeLevel: (node) => node.level ?? 0,
 *   getNodeChildren: (node) => node.children,
 *   hasNestedNodes: (node) => !!node.children?.length,
 *   isNodeExpanded: (node) => node.expanded,
 *   isNodeSelected: (node, selected) => node.id === selected,
 *   getNodeHeadingText: (node) => node.name,
 *   getNodeFooterText: (node) => node.description,
 *   getNodeCellValues: (node) => [node.value1, node.value2],
 * };
 *
 * const nodes = myNodes.map(node => ({
 *   ...node,
 *   onClick: node.hasAction ? () => handleClick(node) : undefined,
 * }));
 *
 * <TreeView
 *   nodes={nodes}
 *   selected={selectedId}
 *   onExpand={handleExpand}
 *   config={config}
 *   headers={['Название', 'Значение 1', 'Значение 2']}
 * />
 * ```
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
    virtualized = false,
    estimateRowSize = 40,
    overscan = 20,
    scrollElementRef: externalScrollRef,
    scrollContainerId,
    striped = true,
    horizontalPadding = 'medium',
  } = props;

  const getFirstColumnPadding = () => {
    switch (horizontalPadding) {
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
      case 'small':
        return 'pr-4';
      case 'large':
        return 'pr-8';
      case 'medium':
      default:
        return 'pr-6';
    }
  };

  const getRowClassName = (rowIndex: number, isSelected: boolean) =>
    cn(
      'group transition-colors hover:bg-background-primary-hover',
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
          style={getTreeGuideColumnStyle()}
        >
          <div
            className='flex items-center justify-center'
            style={getTreeGuideColumnStyle()}
          >
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
                  className={cn(
                    'truncate text-sm font-normal leading-5 text-foreground-primary',
                    {
                      'cursor-pointer': shouldShowCursor,
                    },
                    config.getNodeHeadingClassName?.(node),
                  )}
                  style={headingMaxLength ? { maxWidth: `${headingMaxLength}ch` } : undefined}
                >
                  {headingText}
                </span>
              </TooltipTrigger>
              <TooltipContent className='max-w-[300px]'>{config.renderTooltip(node)}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <span
            className={cn(
              'truncate text-sm font-normal leading-5 text-foreground-primary',
              {
                'cursor-pointer': shouldShowCursor,
              },
              config.getNodeHeadingClassName?.(node),
            )}
            style={headingMaxLength ? { maxWidth: `${headingMaxLength}ch` } : undefined}
            title={String(headingText ?? '')}
          >
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

  const internalScrollRef = useRef<HTMLDivElement>(null);
  const scrollRef = externalScrollRef || internalScrollRef;

  // Flatten visible nodes for virtualization
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
          // If this is the last child, don't show parent's guide line through its DIRECT children only
          const newSkipGuides = new Array(level + 1).fill(false);
          // Copy only the skipGuides that are still relevant (ancestors)
          for (let i = 0; i < level - 1; i++) {
            newSkipGuides[i] = skipGuides[i] || false;
          }
          // Add skip for parent level if this is the last child
          if (isLastChild && level > 0) {
            newSkipGuides[level - 1] = true;
          }
          // Show guide line through direct children even if this node is last child
          traverse(children, [...guides, true], newSkipGuides);
        }
      });
    };

    traverse(nodes);
    return result;
  }, [nodes, virtualized, config]);

  // Setup virtualizer (must be called unconditionally per React Hooks rules)
  const virtualizer = useVirtualizer({
    count: virtualized ? flattenedNodesWithGuides.length : 0,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => estimateRowSize,
    overscan,
  });

  const virtualItems = virtualized ? virtualizer.getVirtualItems() : [];

  // Calculate padding for virtualization
  const paddingTop = virtualized ? virtualItems[0]?.start || 0 : 0;
  const paddingBottom = virtualized
    ? virtualizer.getTotalSize() - (virtualItems[virtualItems.length - 1]?.end || 0)
    : 0;

  const getColumnWidth = (index: number): React.CSSProperties | undefined => {
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
    const rowIndex = rowKey !== undefined ? Number(rowKey) : visibleRowIndexByNodeId.get(nodeId) ?? 0;

    return (
      <tr
        key={trKey}
        ref={measureRef}
        data-index={rowKey}
        className={getRowClassName(rowIndex, isSelected)}
        onClick={() => node.onClick?.()}
        onDoubleClick={() => node.onDoubleClick?.()}
      >
        <td
          className={cn('border-r border-line-primary p-0', {
            'border-r-0': cellValues.length === 0,
          })}
          style={getColumnWidth(0)}
        >
          <div className={cn('flex items-stretch', getFirstColumnPadding())}>
            {renderTreeGuideColumns(level, guides, isLastChild, skipGuides)}

            <div className='relative flex min-w-0 flex-1 items-stretch py-2'>
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
        {cellValues.map((value, index) => (
          <td
            key={index}
            className={cn(
              'border-r border-line-primary p-2 align-middle text-foreground-primary',
              {
                'text-left': getColumnAlignment(index + 1) === 'left',
                'text-center': getColumnAlignment(index + 1) === 'center',
                'text-right': getColumnAlignment(index + 1) === 'right',
                'border-r-0': index === cellValues.length - 1,
              },
              index === cellValues.length - 1 && getLastColumnPadding(),
            )}
            style={getColumnWidth(index + 1)}
          >
            {value}
          </td>
        ))}
      </tr>
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

      // Определяем, должен ли узел показывать cursor-pointer
      // Показываем cursor-pointer если у ноды есть onClick или onDoubleClick
      const shouldShowCursor = !!(node.onClick || node.onDoubleClick);
      const rowIndex = visibleRowIndexByNodeId.get(nodeId) ?? 0;

      return (
        <Fragment key={nodeId}>
          <tr
            className={getRowClassName(rowIndex, isSelected)}
            onClick={() => node.onClick?.()}
            onDoubleClick={() => node.onDoubleClick?.()}
          >
            <td
              className={cn('border-r border-line-primary p-0', {
                'border-r-0': cellValues.length === 0,
              })}
              style={getColumnWidth(0)}
            >
              <div className={cn('flex items-stretch', getFirstColumnPadding())}>
                {renderTreeGuideColumns(level, guides, isLastChild, skipGuides)}

                <div className='relative flex min-w-0 flex-1 items-stretch py-2'>
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
            {cellValues.map((value, index) => (
              <td
                key={index}
                className={cn(
                  'border-r border-line-primary p-2 align-middle text-foreground-primary',
                  {
                    'text-left': getColumnAlignment(index + 1) === 'left',
                    'text-center': getColumnAlignment(index + 1) === 'center',
                    'text-right': getColumnAlignment(index + 1) === 'right',
                    'border-r-0': index === cellValues.length - 1,
                  },
                  index === cellValues.length - 1 && getLastColumnPadding(),
                )}
                style={getColumnWidth(index + 1)}
              >
                {value}
              </td>
            ))}
          </tr>
          {!!children?.length &&
            isExpanded &&
            (() => {
              // Don't show parent's guide line through its DIRECT children only
              const newSkipGuides = new Array(level + 1).fill(false);
              // Copy only the skipGuides that are still relevant (ancestors)
              for (let i = 0; i < level - 1; i++) {
                newSkipGuides[i] = skipGuides[i] || false;
              }
              // Add skip for parent level if this is the last child
              if (isLastChild && level > 0) {
                newSkipGuides[level - 1] = true;
              }
              // Show guide line through direct children even if this node is last child
              return renderNodes(children, [...guides, true], newSkipGuides);
            })()}
        </Fragment>
      );
    });
  };

  const headersArray = headers || [];
  const headerItems = headerCells ?? headersArray;
  const hasHeaders =
    headerItems.length > 0 &&
    headerItems.some((header) =>
      headerCells ? header !== null && header !== undefined : String(header).trim() !== '',
    );

  return (
    <div
      ref={scrollRef}
      id={scrollContainerId}
      className={cn('h-full overflow-auto', className)}>
      <table className='w-full border-collapse text-sm'>
        {hasHeaders && (
          <thead className='sticky top-0 z-10 bg-background-secondary'>
            <tr>
              {headerItems.map((header, index) => (
                <th
                  key={index}
                  className={cn(
                    'box-border min-h-9 overflow-hidden border-b border-r border-line-primary border-b-line-primary-disabled p-2 text-left font-medium text-foreground-primary align-middle min-w-0',
                    index === 0 && getFirstColumnPadding(),
                    index === headerItems.length - 1 && cn(getLastColumnPadding(), 'border-r-0'),
                    {
                      'text-left': index === 0 || getColumnAlignment(index) === 'left',
                      'text-center': index !== 0 && getColumnAlignment(index) === 'center',
                      'text-right': index !== 0 && getColumnAlignment(index) === 'right',
                    },
                  )}
                  style={getColumnWidth(index)}
                >
                  {headerCells ? (
                    header
                  ) : (
                    <span className='block truncate' title={String(header)}>
                      {header}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {virtualized ? (
            <>
              {paddingTop > 0 && (
                <tr style={{ height: `${paddingTop}px` }}>
                  <td colSpan={headerItems.length || 1} />
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
                  <td colSpan={headerItems.length || 1} />
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
