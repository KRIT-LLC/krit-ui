import { Fragment, ReactNode, useMemo, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { cn } from '@/utils';
import { ArrowDropDownIcon } from '@/assets';

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
  getNodeFooterText: (node: T) => string | undefined;
  getNodeCellValues: (node: T) => ReactNode[];
  getNodeHeadingClassName?: (node: T) => string | undefined;
  renderExpandIcon?: (node: T, isExpanded: boolean, onClick: () => void) => ReactNode;
}

export interface TreeViewProps<T extends TreeNode> {
  nodes: T[];
  selected?: unknown;
  config: TreeViewConfig<T>;
  headers?: string[];
  className?: string;
  columnWidths?: (number | string)[];
  columnAlignments?: ('left' | 'center' | 'right')[];
  onExpand: (node: T) => void;

  // Virtualization props
  virtualized?: boolean;
  estimateRowSize?: number;
  overscan?: number;
  scrollElementRef?: React.RefObject<HTMLDivElement>;
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
    className,
    columnWidths,
    columnAlignments,
    onExpand,
    virtualized = false,
    estimateRowSize = 40,
    overscan = 20,
    scrollElementRef: externalScrollRef,
  } = props;

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

  const renderSingleRow = (
    node: T,
    guides: boolean[],
    isLastChild: boolean,
    skipGuides: boolean[] = [],
  ): ReactNode => {
    const nodeId = config.getNodeId(node);
    const level = config.getNodeLevel(node);
    const children = config.getNodeChildren(node);
    const hasNested = config.hasNestedNodes(node);
    const isExpanded = config.isNodeExpanded(node);
    const isSelected = selected ? config.isNodeSelected(node, selected) : false;
    const headingText = config.getNodeHeadingText(node);
    const footerText = config.getNodeFooterText(node);
    const cellValues = config.getNodeCellValues(node);

    const shouldShowCursor = !!(node.onClick || node.onDoubleClick);

    return (
      <tr
        key={nodeId}
        onClick={() => node.onClick?.()}
        onDoubleClick={() => node.onDoubleClick?.()}
      >
        <td
          className={cn('p-0 border-r border-line-primary', {
            'bg-background-primary-selected': isSelected,
            'border-r-0': cellValues.length === 0,
          })}
          style={getColumnWidth(0)}
        >
          <div className='flex items-stretch'>
            {/* Spacers for indentation and guide lines */}
            {Array.from({ length: level }).map((_, i) => (
              <div key={i} className='relative w-6 flex-shrink-0'>
                {/* Vertical line for ancestors */}
                {guides[i] && !(i === level - 1 && isLastChild) && !skipGuides[i] && (
                  <div className='absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-line-contrast' />
                )}
                {/* Connection lines for current level */}
                {i === level - 1 && (
                  <>
                    {/* Vertical line from top to center */}
                    <div className='absolute left-1/2 top-0 h-1/2 w-[1px] -translate-x-1/2 bg-line-contrast' />
                    {/* Horizontal line from center to right */}
                    <div className='absolute left-1/2 top-1/2 h-[1px] w-1/2 bg-line-contrast' />
                    {/* Vertical line from center to bottom if not last child */}
                    {!isLastChild && (
                      <div className='absolute left-1/2 top-1/2 bottom-0 w-[1px] -translate-x-1/2 bg-line-contrast' />
                    )}
                  </>
                )}
              </div>
            ))}

            <div className='flex items-center py-[3px] flex-1 min-w-0 relative'>
              {/* Vertical line from parent icon to children */}
              {!!children?.length && isExpanded && (
                <div className='absolute left-3 top-1/2 bottom-0 w-[1px] -translate-x-1/2 bg-line-contrast' />
              )}
              <div className='relative z-10 flex'>
                {config.renderExpandIcon
                  ? config.renderExpandIcon(node, isExpanded, () => onExpand(node))
                  : renderDefaultExpandIcon(hasNested, isExpanded, () => onExpand(node))}
              </div>
              <div className='flex flex-col gap-[2px] min-w-0 ml-2'>
                <span
                  className={cn(
                    'text-foreground-primary text-xs font-normal leading-4 truncate',
                    {
                      'cursor-pointer': shouldShowCursor,
                    },
                    config.getNodeHeadingClassName?.(node),
                  )}
                  title={String(headingText ?? '')}
                >
                  {headingText}
                </span>
                {footerText && (
                  <span
                    className='text-foreground-secondary text-xs font-normal leading-4 tracking-[0.4px] truncate'
                    title={String(footerText ?? '')}
                  >
                    {footerText}
                  </span>
                )}
              </div>
            </div>
          </div>
        </td>
        {cellValues.map((value, index) => (
          <td
            key={index}
            className={cn('py-[3px] align-middle border-r border-line-primary', {
              'text-left': getColumnAlignment(index + 1) === 'left',
              'text-center': getColumnAlignment(index + 1) === 'center',
              'text-right': getColumnAlignment(index + 1) === 'right',
              'bg-background-primary-selected': isSelected,
              'border-r-0': index === cellValues.length - 1,
            })}
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
      const footerText = config.getNodeFooterText(node);
      const cellValues = config.getNodeCellValues(node);

      const isLastChild = index === nodesToRender.length - 1;

      // Определяем, должен ли узел показывать cursor-pointer
      // Показываем cursor-pointer если у ноды есть onClick или onDoubleClick
      const shouldShowCursor = !!(node.onClick || node.onDoubleClick);

      return (
        <Fragment key={nodeId}>
          <tr onClick={() => node.onClick?.()} onDoubleClick={() => node.onDoubleClick?.()}>
            <td
              className={cn('p-0 border-r border-line-primary', {
                'bg-background-primary-selected': isSelected,
                'border-r-0': cellValues.length === 0,
              })}
              style={getColumnWidth(0)}
            >
              <div className='flex items-stretch'>
                {/* Spacers for indentation and guide lines */}
                {Array.from({ length: level }).map((_, i) => (
                  <div key={i} className='relative w-6 flex-shrink-0'>
                    {/* Vertical line for ancestors */}
                    {guides[i] && !(i === level - 1 && isLastChild) && !skipGuides[i] && (
                      <div className='absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-line-contrast' />
                    )}
                    {/* Connection lines for current level */}
                    {i === level - 1 && (
                      <>
                        {/* Vertical line from top to center */}
                        <div className='absolute left-1/2 top-0 h-1/2 w-[1px] -translate-x-1/2 bg-line-contrast' />
                        {/* Horizontal line from center to right */}
                        <div className='absolute left-1/2 top-1/2 h-[1px] w-1/2 bg-line-contrast' />
                        {/* Vertical line from center to bottom if not last child */}
                        {!isLastChild && (
                          <div className='absolute left-1/2 top-1/2 bottom-0 w-[1px] -translate-x-1/2 bg-line-contrast' />
                        )}
                      </>
                    )}
                  </div>
                ))}

                <div className='flex items-center py-[3px] flex-1 min-w-0 relative'>
                  {/* Vertical line from parent icon to children */}
                  {!!children?.length && isExpanded && (
                    <div className='absolute left-3 top-1/2 bottom-0 w-[1px] -translate-x-1/2 bg-line-contrast' />
                  )}
                  <div className='relative z-10 flex'>
                    {config.renderExpandIcon
                      ? config.renderExpandIcon(node, isExpanded, () => onExpand(node))
                      : renderDefaultExpandIcon(hasNested, isExpanded, () => onExpand(node))}
                  </div>
                  <div className='flex flex-col gap-[2px] min-w-0 ml-2'>
                    <span
                      className={cn(
                        'text-foreground-primary text-xs font-normal leading-4 truncate',
                        {
                          'cursor-pointer': shouldShowCursor,
                        },
                        config.getNodeHeadingClassName?.(node),
                      )}
                      title={String(headingText ?? '')}
                    >
                      {headingText}
                    </span>
                    {footerText && (
                      <span
                        className='text-foreground-secondary text-xs font-normal leading-4 tracking-[0.4px] truncate'
                        title={String(footerText ?? '')}
                      >
                        {footerText}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </td>
            {cellValues.map((value, index) => (
              <td
                key={index}
                className={cn('py-[3px] align-middle border-r border-line-primary', {
                  'text-left': getColumnAlignment(index + 1) === 'left',
                  'text-center': getColumnAlignment(index + 1) === 'center',
                  'text-right': getColumnAlignment(index + 1) === 'right',
                  'bg-background-primary-selected': isSelected,
                  'border-r-0': index === cellValues.length - 1,
                })}
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
  const hasHeaders = headersArray.length > 0 && headersArray.some(header => header.trim() !== '');

  return (
    <div ref={scrollRef} className={cn('h-full overflow-auto', className)}>
      <table className='w-full border-collapse'>
        {hasHeaders && (
          <thead className='sticky top-0 z-10 bg-background-secondary'>
            <tr>
              <th
                className={cn(
                  'px-2 py-[8px] text-left text-foreground-primary text-sm font-medium leading-5 tracking-[0.25px] border-r border-line-primary',
                  {
                    'border-r-0': headersArray.length === 1,
                  },
                )}
                style={getColumnWidth(0)}
              >
                {headersArray[0] || ''}
              </th>
              {headersArray.slice(1).map((header, index) => (
                <th
                  key={index}
                  className={cn(
                    'px-2 py-[8px] text-foreground-primary text-sm font-medium leading-5 tracking-[0.25px] border-r border-line-primary',
                    {
                      'text-left': getColumnAlignment(index + 1) === 'left',
                      'text-center': getColumnAlignment(index + 1) === 'center',
                      'text-right': getColumnAlignment(index + 1) === 'right',
                      'border-r-0': index === headersArray.slice(1).length - 1,
                    },
                  )}
                  style={getColumnWidth(index + 1)}
                >
                  {header}
                </th>
              ))}
            </tr>
            <tr>
              <td colSpan={headersArray.length} className='h-[1px] p-0'>
                <div className='bg-line-primary-disabled w-full h-[1px]'></div>
              </td>
            </tr>
          </thead>
        )}
        <tbody>
          {virtualized ? (
            <>
              {paddingTop > 0 && (
                <tr style={{ height: `${paddingTop}px` }}>
                  <td colSpan={headersArray.length || 1} />
                </tr>
              )}
              {virtualItems.map(virtualRow => {
                const { node, guides, isLastChild, skipGuides } =
                  flattenedNodesWithGuides[virtualRow.index];
                return renderSingleRow(node, guides, isLastChild, skipGuides);
              })}
              {paddingBottom > 0 && (
                <tr style={{ height: `${paddingBottom}px` }}>
                  <td colSpan={headersArray.length || 1} />
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
