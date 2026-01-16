import { useState, ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TreeView, TreeNode, TreeViewConfig } from '@/components/ui/tree-view';

// Типы для примеров
interface MachineryNode extends TreeNode {
  name: string;
  code: string;
  status?: string;
  expanded?: boolean;
  hasIssues?: boolean;
  hasWarning?: boolean;
}

interface SettingsNode extends TreeNode {
  name: string;
  expanded?: boolean;
}

const meta: Meta<typeof TreeView> = {
  title: 'Components/UI/TreeView',
  component: TreeView,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Компонент для отображения иерархических данных в табличном формате. Поддерживает разворачивание/сворачивание узлов, выделение, настройку ширины колонок и их выравнивания.',
      },
    },
  },
} satisfies Meta<typeof TreeView>;

export default meta;
type Story = StoryObj<typeof TreeView>;

// Пример данных для иерархии оборудования (из макета 4376-75019)
const machineryData: MachineryNode[] = [
  {
    id: '1',
    name: 'Металлургический комплекс ГРОСС - Plant',
    code: 'GR-FIX-URP/003 • 83191',
    level: 0,
    expanded: true,
    children: [
      {
        id: '1-1',
        name: 'Металлургический комплекс ГРОСС - Pl...',
        code: 'GR-FIX-URP/003 • 83191',
        level: 1,
        expanded: true,
        children: [
          {
            id: '1-1-1',
            name: 'Металлургический комплекс ГРОСС - Pl...',
            code: 'GR-FIX-URP/003 • 83191',
            level: 2,
            expanded: false,
            children: [],
          },
          {
            id: '1-1-2',
            name: 'Металлургический комплекс [ ГРОСС...',
            code: 'GR-FIX-URP/003 • 83191',
            level: 2,
            hasWarning: true,
            expanded: false,
            children: [],
          },
          {
            id: '1-1-3',
            name: 'Металлургический комплекс ГРО',
            code: 'GR-FIX-URP/003 • 83191',
            level: 2,
            hasWarning: true,
            hasIssues: true,
            expanded: false,
            children: [],
          },
        ],
      },
      {
        id: '1-2',
        name: 'Металлургический комплекс ГРОСС - Pl...',
        code: 'GR-FIX-URP/003 • 83191',
        level: 1,
        expanded: false,
        children: [],
      },
    ],
  },
  {
    id: '2',
    name: 'Металлургический комплекс ГРОСС - Plant',
    code: 'GR-FIX-URP/003 • 83191',
    level: 0,
    expanded: false,
    children: [],
  },
  {
    id: '3',
    name: 'Металлургический комплекс ГРОСС -...',
    code: 'GR-FIX-URP/003 • 83191',
    level: 0,
    expanded: true,
    children: [
      {
        id: '3-1',
        name: 'Промежуточный вал в сборке',
        code: 'GR-FIX-URP/003 • 83191',
        level: 1,
        expanded: false,
        children: [],
      },
    ],
  },
];

// Пример данных для иерархии настроек (из макета 5268-99425)
const settingsData: SettingsNode[] = [
  {
    id: '1',
    name: 'Общие настройки',
    level: 0,
    expanded: true,
    children: [
      {
        id: '1-1',
        name: 'Организационная структура',
        level: 1,
        children: [],
      },
      {
        id: '1-2',
        name: 'Единицы измерения',
        level: 1,
        children: [],
      },
    ],
  },
  {
    id: '2',
    name: 'Объекты ремонта',
    level: 0,
    expanded: true,
    children: [
      {
        id: '2-1',
        name: 'Общее',
        level: 1,
        expanded: true,
        children: [
          {
            id: '2-1-1',
            name: 'Классы',
            level: 2,
            children: [],
          },
          {
            id: '2-1-2',
            name: 'Признаки',
            level: 2,
            children: [],
          },
          {
            id: '2-1-3',
            name: 'Виды объекта',
            level: 2,
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: '3',
    name: 'Сообщения',
    level: 0,
    expanded: true,
    children: [
      {
        id: '3-1',
        name: 'Виды сообщения',
        level: 1,
        expanded: true,
        children: [
          {
            id: '3-1-1',
            name: 'Каталоги кодов',
            level: 2,
            expanded: false,
            children: [],
          },
          {
            id: '3-1-2',
            name: 'Профили каталогов',
            level: 2,
            children: [],
          },
          {
            id: '3-1-3',
            name: 'Каталоги',
            level: 2,
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: '4',
    name: 'Заказы',
    level: 0,
    expanded: true,
    children: [
      {
        id: '4-1',
        name: 'Виды заказов',
        level: 1,
        children: [],
      },
      {
        id: '4-2',
        name: 'Виды работ ТОРО',
        level: 1,
        children: [],
      },
    ],
  },
  {
    id: '5',
    name: 'Уведомления',
    level: 0,
    children: [],
  },
];

// История оборудования с таблицей
export const MachineryHierarchy: Story = {
  render: () => {
    const [nodes, setNodes] = useState<MachineryNode[]>(machineryData);
    const [selected, setSelected] = useState<string | null>('1-1-3');

    const handleExpand = (node: MachineryNode) => {
      const updateNode = (items: MachineryNode[]): MachineryNode[] => {
        return items.map((item) => {
          if (item.id === node.id) {
            return { ...item, expanded: !item.expanded };
          }
          if (item.children) {
            return { ...item, children: updateNode(item.children as MachineryNode[]) };
          }
          return item;
        });
      };
      setNodes(updateNode(nodes));
    };

    const handleDoubleClick = (node: MachineryNode) => {
      setSelected(node.id as string);
    };

    const config: TreeViewConfig<MachineryNode> = {
      getNodeId: (node) => node.id,
      getNodeLevel: (node) => node.level ?? 0,
      getNodeChildren: (node) => node.children as MachineryNode[] | undefined,
      hasNestedNodes: (node) => !!node.children?.length,
      isNodeExpanded: (node) => node.expanded ?? false,
      isNodeSelected: (node, selected) => node.id === selected,
      getNodeHeadingText: (node) => node.name,
      getNodeFooterText: (node) => node.code || '',
      getNodeCellValues: (node): ReactNode[] => {
        return [
          <div key='col1' className='flex items-center justify-center gap-1'>
            {node.hasIssues && (
              <svg
                className='w-5 h-5 text-red-500'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z'
                  fill='currentColor'
                />
              </svg>
            )}
            {node.hasWarning && (
              <svg
                className='w-5 h-5 text-orange-500'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z'
                  fill='currentColor'
                />
              </svg>
            )}
            <span className='text-sm text-foreground-primary'>2</span>
          </div>,
        ];
      },
      renderExpandIcon: (node, isExpanded, onClick) => {
        const hasNested = !!node.children?.length;
        if (!hasNested) {
          return <div className='w-6 flex-shrink-0' />;
        }
        return (
          <svg
            className={`w-6 h-6 cursor-pointer text-icon-contrast transition-transform duration-200 ${
              isExpanded ? 'rotate-0' : '-rotate-90'
            } flex-shrink-0`}
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
      },
    };

    return (
      <div className='w-full h-[600px] border border-line-primary rounded-lg overflow-hidden'>
        <TreeView
          nodes={nodes}
          selected={selected}
          onExpand={handleExpand}
          onDoubleClick={handleDoubleClick}
          config={config}
          headers={['Название', '']}
          columnWidths={['auto', 60]}
          columnAlignments={['left', 'center']}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Пример иерархии оборудования с таблицей. Отображает название оборудования, код и статусы (ошибки, предупреждения). Основан на макете Figma 4376-75019.',
      },
    },
  },
};

// История настроек
export const SettingsHierarchy: Story = {
  render: () => {
    const [nodes, setNodes] = useState<SettingsNode[]>(settingsData);
    const [selected, setSelected] = useState<string | null>('3-1-1');

    const handleExpand = (node: SettingsNode) => {
      const updateNode = (items: SettingsNode[]): SettingsNode[] => {
        return items.map((item) => {
          if (item.id === node.id) {
            return { ...item, expanded: !item.expanded };
          }
          if (item.children) {
            return { ...item, children: updateNode(item.children as SettingsNode[]) };
          }
          return item;
        });
      };
      setNodes(updateNode(nodes));
    };

    const handleDoubleClick = (node: SettingsNode) => {
      setSelected(node.id as string);
    };

    const config: TreeViewConfig<SettingsNode> = {
      getNodeId: (node) => node.id,
      getNodeLevel: (node) => node.level ?? 0,
      getNodeChildren: (node) => node.children as SettingsNode[] | undefined,
      hasNestedNodes: (node) => !!node.children?.length,
      isNodeExpanded: (node) => node.expanded ?? false,
      isNodeSelected: (node, selected) => node.id === selected,
      getNodeHeadingText: (node) => node.name,
      getNodeFooterText: () => '',
      getNodeCellValues: () => [],
      renderExpandIcon: (node, isExpanded, onClick) => {
        const hasNested = !!node.children?.length;
        if (!hasNested) {
          return <div className='w-6 flex-shrink-0' />;
        }
        return (
          <svg
            className={`w-6 h-6 cursor-pointer text-icon-contrast transition-transform duration-200 ${
              isExpanded ? 'rotate-0' : '-rotate-90'
            } flex-shrink-0`}
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
      },
    };

    return (
      <div className='w-full h-[600px] border border-line-primary rounded-lg overflow-hidden'>
        <TreeView
          nodes={nodes}
          selected={selected}
          onExpand={handleExpand}
          onDoubleClick={handleDoubleClick}
          config={config}
          headers={['Название']}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Пример иерархии настроек. Простое дерево без дополнительных колонок. Основан на макете Figma 5268-99425.',
      },
    },
  },
};

// Простой пример
export const Basic: Story = {
  render: () => {
    interface SimpleNode extends TreeNode {
      name: string;
      value: string;
      expanded?: boolean;
    }

    const simpleData: SimpleNode[] = [
      {
        id: '1',
        name: 'Корневой узел 1',
        value: 'Значение 1',
        level: 0,
        expanded: true,
        children: [
          {
            id: '1-1',
            name: 'Дочерний узел 1.1',
            value: 'Значение 1.1',
            level: 1,
            children: [],
          },
          {
            id: '1-2',
            name: 'Дочерний узел 1.2',
            value: 'Значение 1.2',
            level: 1,
            children: [],
          },
        ],
      },
      {
        id: '2',
        name: 'Корневой узел 2',
        value: 'Значение 2',
        level: 0,
        expanded: false,
        children: [
          {
            id: '2-1',
            name: 'Дочерний узел 2.1',
            value: 'Значение 2.1',
            level: 1,
            children: [],
          },
        ],
      },
    ];

    const [nodes, setNodes] = useState<SimpleNode[]>(simpleData);
    const [selected, setSelected] = useState<string | null>(null);

    const handleExpand = (node: SimpleNode) => {
      const updateNode = (items: SimpleNode[]): SimpleNode[] => {
        return items.map((item) => {
          if (item.id === node.id) {
            return { ...item, expanded: !item.expanded };
          }
          if (item.children) {
            return { ...item, children: updateNode(item.children as SimpleNode[]) };
          }
          return item;
        });
      };
      setNodes(updateNode(nodes));
    };

    const handleDoubleClick = (node: SimpleNode) => {
      setSelected(node.id as string);
    };

    const config: TreeViewConfig<SimpleNode> = {
      getNodeId: (node) => node.id,
      getNodeLevel: (node) => node.level ?? 0,
      getNodeChildren: (node) => node.children as SimpleNode[] | undefined,
      hasNestedNodes: (node) => !!node.children?.length,
      isNodeExpanded: (node) => node.expanded ?? false,
      isNodeSelected: (node, selected) => node.id === selected,
      getNodeHeadingText: (node) => node.name,
      getNodeFooterText: () => '',
      getNodeCellValues: (node) => [
        <span key='value' className='text-sm text-foreground-secondary'>
          {node.value}
        </span>,
      ],
    };

    return (
      <div className='w-full h-[400px] border border-line-primary rounded-lg overflow-hidden'>
        <TreeView
          nodes={nodes}
          selected={selected}
          onExpand={handleExpand}
          onDoubleClick={handleDoubleClick}
          config={config}
          headers={['Название', 'Значение']}
          columnWidths={[300, 200]}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Простой пример использования TreeView с двумя колонками.',
      },
    },
  },
};

// Пример с множественными колонками
export const MultiColumn: Story = {
  render: () => {
    interface DataNode extends TreeNode {
      name: string;
      description: string;
      status: string;
      value: number;
      date: string;
      expanded?: boolean;
    }

    const multiColumnData: DataNode[] = [
      {
        id: '1',
        name: 'Проект A',
        description: 'Описание проекта A',
        status: 'Активный',
        value: 1000,
        date: '01.01.2024',
        level: 0,
        expanded: true,
        children: [
          {
            id: '1-1',
            name: 'Задача A.1',
            description: 'Подзадача 1',
            status: 'В работе',
            value: 500,
            date: '15.01.2024',
            level: 1,
            children: [],
          },
          {
            id: '1-2',
            name: 'Задача A.2',
            description: 'Подзадача 2',
            status: 'Завершена',
            value: 500,
            date: '20.01.2024',
            level: 1,
            children: [],
          },
        ],
      },
      {
        id: '2',
        name: 'Проект B',
        description: 'Описание проекта B',
        status: 'Завершен',
        value: 2000,
        date: '01.02.2024',
        level: 0,
        children: [],
      },
    ];

    const [nodes, setNodes] = useState<DataNode[]>(multiColumnData);
    const [selected, setSelected] = useState<string | null>(null);

    const handleExpand = (node: DataNode) => {
      const updateNode = (items: DataNode[]): DataNode[] => {
        return items.map((item) => {
          if (item.id === node.id) {
            return { ...item, expanded: !item.expanded };
          }
          if (item.children) {
            return { ...item, children: updateNode(item.children as DataNode[]) };
          }
          return item;
        });
      };
      setNodes(updateNode(nodes));
    };

    const handleDoubleClick = (node: DataNode) => {
      setSelected(node.id as string);
    };

    const config: TreeViewConfig<DataNode> = {
      getNodeId: (node) => node.id,
      getNodeLevel: (node) => node.level ?? 0,
      getNodeChildren: (node) => node.children as DataNode[] | undefined,
      hasNestedNodes: (node) => !!node.children?.length,
      isNodeExpanded: (node) => node.expanded ?? false,
      isNodeSelected: (node, selected) => node.id === selected,
      getNodeHeadingText: (node) => node.name,
      getNodeFooterText: (node) => node.description,
      getNodeCellValues: (node) => [
        <span key='status' className='text-sm text-foreground-secondary'>
          {node.status}
        </span>,
        <span key='value' className='text-sm text-foreground-primary font-medium'>
          {node.value.toLocaleString('ru-RU')}
        </span>,
        <span key='date' className='text-sm text-foreground-secondary'>
          {node.date}
        </span>,
      ],
    };

    return (
      <div className='w-full h-[400px] border border-line-primary rounded-lg overflow-hidden'>
        <TreeView
          nodes={nodes}
          selected={selected}
          onExpand={handleExpand}
          onDoubleClick={handleDoubleClick}
          config={config}
          headers={['Название', 'Статус', 'Значение', 'Дата']}
          columnWidths={[300, 120, 120, 120]}
          columnAlignments={['left', 'left', 'right', 'center']}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Пример с множественными колонками и разным выравниванием. Демонстрирует использование дополнительного текста под названием узла.',
      },
    },
  },
};
