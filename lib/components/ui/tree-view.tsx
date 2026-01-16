import { Fragment, ReactNode } from 'react';
import cn from 'classnames';

export interface TreeNode<T = unknown> {
  id: number | string;
  level?: number;
  children?: TreeNode<T>[];
  [key: string]: unknown;
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
  renderExpandIcon?: (node: T, isExpanded: boolean, onClick: () => void) => ReactNode;
}

interface TreeViewProps<T extends TreeNode> {
  nodes: T[];
  selected?: unknown;
  onExpand: (node: T) => void;
  onDoubleClick: (node: T) => void;
  config: TreeViewConfig<T>;
  headers: string[];
  className?: string;
  columnWidths?: (number | string)[];
  columnAlignments?: ('left' | 'center' | 'right')[];
}

const INDENT = 16;

/**
 * TreeView - компонент для отображения иерархических данных в табличном формате.
 *
 * @component
 * @template T - Тип узла дерева, должен расширять TreeNode
 * @param {TreeViewProps<T>} props - Параметры компонента
 * @param {T[]} props.nodes - Массив узлов дерева для отображения
 * @param {unknown} [props.selected] - Текущий выбранный узел
 * @param {function} props.onExpand - Обработчик разворачивания/сворачивания узла
 * @param {function} props.onDoubleClick - Обработчик двойного клика на узел
 * @param {TreeViewConfig<T>} props.config - Конфигурация для работы с узлами дерева
 * @param {string[]} props.headers - Заголовки колонок таблицы
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
 * <TreeView
 *   nodes={myNodes}
 *   selected={selectedId}
 *   onExpand={handleExpand}
 *   onDoubleClick={handleDoubleClick}
 *   config={config}
 *   headers={['Название', 'Значение 1', 'Значение 2']}
 * />
 * ```
 */
export const TreeView = <T extends TreeNode>(props: TreeViewProps<T>) => {
  const {
    nodes,
    selected,
    onExpand,
    onDoubleClick,
    config,
    headers,
    className,
    columnWidths,
    columnAlignments,
  } = props;

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

  const renderDefaultExpandIcon = (hasNested: boolean, isExpanded: boolean, onClick: () => void) => {
    if (!hasNested) {
      return <div className='w-6 flex-shrink-0' />;
    }
    return (
      <svg
        className={cn(
          'w-6 h-6 cursor-pointer text-icon-contrast transition-transform duration-200 -rotate-90 flex-shrink-0',
          {
            'rotate-0': isExpanded,
          },
        )}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <path d='M7 10L12 15L17 10H7Z' fill='currentColor' />
      </svg>
    );
  };

  const renderNodes = (nodesToRender: T[] = []): ReactNode => {
    return nodesToRender.map((node) => {
      const nodeId = config.getNodeId(node);
      const level = config.getNodeLevel(node);
      const children = config.getNodeChildren(node);
      const hasNested = config.hasNestedNodes(node);
      const isExpanded = config.isNodeExpanded(node);
      const isSelected = selected ? config.isNodeSelected(node, selected) : false;
      const headingText = config.getNodeHeadingText(node);
      const footerText = config.getNodeFooterText(node);
      const cellValues = config.getNodeCellValues(node);

      return (
        <Fragment key={nodeId}>
          <tr className='cursor-pointer' onDoubleClick={() => onDoubleClick(node)}>
            <td
              className={cn('py-1 align-middle', {
                'bg-background-primary-selected': isSelected,
              })}
              style={{
                paddingLeft: `${level * INDENT + 8}px`,
                ...getColumnWidth(0),
              }}>
              <div className='flex items-center gap-2'>
                {config.renderExpandIcon ? (
                  config.renderExpandIcon(node, isExpanded, () => onExpand(node))
                ) : (
                  renderDefaultExpandIcon(hasNested, isExpanded, () => onExpand(node))
                )}
                <div className='flex flex-col gap-0.5 min-w-0'>
                  <span
                    className='text-foreground-primary text-sm font-normal truncate'
                    title={String(headingText ?? '')}>
                    {headingText}
                  </span>
                  {footerText && (
                    <span
                      className='text-foreground-secondary text-xs font-normal leading-4 tracking-[0.4px] truncate'
                      title={String(footerText ?? '')}>
                      {footerText}
                    </span>
                  )}
                </div>
              </div>
            </td>
            {cellValues.map((value, index) => (
              <td
                key={index}
                className={cn('py-1 align-middle', {
                  'text-left': getColumnAlignment(index + 1) === 'left',
                  'text-center': getColumnAlignment(index + 1) === 'center',
                  'text-right': getColumnAlignment(index + 1) === 'right',
                  'bg-background-primary-selected': isSelected,
                })}
                style={getColumnWidth(index + 1)}>
                {value}
              </td>
            ))}
          </tr>
          {!!children?.length && renderNodes(children)}
        </Fragment>
      );
    });
  };

  return (
    <div className={cn('h-full overflow-auto', className)}>
      <table className='w-full border-collapse'>
        <thead className='sticky top-0 z-10 bg-background-secondary'>
          <tr>
            <th
              className='px-2 py-2 text-left text-foreground-primary text-sm font-medium leading-5 tracking-[0.25px]'
              style={getColumnWidth(0)}>
              {headers[0] || ''}
            </th>
            {headers.slice(1).map((header, index) => (
              <th
                key={index}
                className={cn(
                  'px-2 py-2 text-foreground-primary text-sm font-medium leading-5 tracking-[0.25px]',
                  {
                    'text-left': getColumnAlignment(index + 1) === 'left',
                    'text-center': getColumnAlignment(index + 1) === 'center',
                    'text-right': getColumnAlignment(index + 1) === 'right',
                  },
                )}
                style={getColumnWidth(index + 1)}>
                {header}
              </th>
            ))}
          </tr>
          <tr>
            <td colSpan={headers.length} className='h-[1px] p-0'>
              <div className='bg-line-primary-disabled w-full h-[1px]'></div>
            </td>
          </tr>
        </thead>
        <tbody>{renderNodes(nodes)}</tbody>
      </table>
    </div>
  );
};
