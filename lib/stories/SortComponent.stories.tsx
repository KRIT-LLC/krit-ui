import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SortComponent, SortOrder } from '@/components/ui/sort-component';

const meta: Meta<typeof SortComponent> = {
  title: 'Components/UI/SortComponent',
  component: SortComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Компонент сортировки с выбором поля и переключением направления. Соответствует дизайну из Figma: кнопка с иконкой фильтра слева, текстом посередине и chevron справа.',
      },
    },
  },
  argTypes: {
    sortOrder: {
      control: 'select',
      options: [SortOrder.ASC, SortOrder.DESC],
      description: 'Текущий порядок сортировки',
    },
    sortField: {
      control: 'text',
      description: 'Текущее поле сортировки',
    },
    className: {
      control: 'text',
      description: 'Дополнительные классы для контейнера',
    },
    options: {
      control: 'object',
      description: 'Опции для выбора поля сортировки',
    },
    placeholder: {
      control: 'text',
      description: 'Текст плейсхолдера для селекта',
    },
    onOrderToggle: {
      action: 'orderToggle',
      description: 'Обработчик переключения порядка сортировки',
    },
    onFieldChange: {
      action: 'fieldChange',
      description: 'Обработчик изменения поля сортировки',
    },
  },
} satisfies Meta<typeof SortComponent>;

export default meta;
type Story = StoryObj<typeof SortComponent>;

// Базовый пример без выбранного поля
export const Default: Story = {
  args: {
    options: [
      { value: 'date', label: 'Дата создания' },
      { value: 'name', label: 'Название' },
      { value: 'status', label: 'Статус' },
    ],
  },
};

// С выбранным полем и порядком сортировки
export const WithSelectedField: Story = {
  render: function Render() {
    const [sortField, setSortField] = useState<string | undefined>('date');
    const [sortOrder, setSortOrder] = useState<typeof SortOrder.ASC | typeof SortOrder.DESC>(
      SortOrder.DESC,
    );

    const options = [
      { value: 'date', label: 'Дата создания' },
      { value: 'name', label: 'Название' },
      { value: 'status', label: 'Статус' },
    ];

    const handleOrderToggle = () => {
      setSortOrder(prev => (prev === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC));
    };

    const handleFieldChange = (field: string) => {
      setSortField(field);
    };

    return (
      <SortComponent
        sortField={sortField}
        sortOrder={sortOrder}
        options={options}
        onOrderToggle={handleOrderToggle}
        onFieldChange={handleFieldChange}
      />
    );
  },
};

// С порядком сортировки ASC
export const Ascending: Story = {
  render: function Render() {
    const [sortField, setSortField] = useState<string | undefined>('name');
    const [sortOrder, setSortOrder] = useState<typeof SortOrder.ASC | typeof SortOrder.DESC>(
      SortOrder.ASC,
    );

    const options = [
      { value: 'date', label: 'Дата создания' },
      { value: 'name', label: 'Название' },
      { value: 'status', label: 'Статус' },
    ];

    const handleOrderToggle = () => {
      setSortOrder(prev => (prev === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC));
    };

    const handleFieldChange = (field: string) => {
      setSortField(field);
    };

    return (
      <SortComponent
        sortField={sortField}
        sortOrder={sortOrder}
        options={options}
        onOrderToggle={handleOrderToggle}
        onFieldChange={handleFieldChange}
      />
    );
  },
};

// С большим количеством опций
export const WithManyOptions: Story = {
  args: {
    options: [
      { value: 'date', label: 'Дата создания' },
      { value: 'name', label: 'Название' },
      { value: 'status', label: 'Статус' },
      { value: 'priority', label: 'Приоритет' },
      { value: 'author', label: 'Автор' },
      { value: 'category', label: 'Категория' },
      { value: 'type', label: 'Тип' },
    ],
  },
};

// Интерактивный пример с управлением состоянием
export const Interactive: Story = {
  render: function Render() {
    const [sortField, setSortField] = useState<string | undefined>('date');
    const [sortOrder, setSortOrder] = useState<typeof SortOrder.ASC | typeof SortOrder.DESC>(
      SortOrder.DESC,
    );

    const options = [
      { value: 'date', label: 'Дата создания' },
      { value: 'name', label: 'Название' },
      { value: 'status', label: 'Статус' },
      { value: 'priority', label: 'Приоритет' },
    ];

    const handleOrderToggle = () => {
      setSortOrder(prev => (prev === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC));
    };

    const handleFieldChange = (field: string) => {
      setSortField(field);
    };

    return (
      <div className='space-y-4'>
        <SortComponent
          sortField={sortField}
          sortOrder={sortOrder}
          options={options}
          onOrderToggle={handleOrderToggle}
          onFieldChange={handleFieldChange}
        />
        <div className='text-sm text-foreground-secondary'>
          <div>Выбранное поле: {sortField || 'не выбрано'}</div>
          <div>
            Порядок сортировки: {sortOrder === SortOrder.ASC ? 'По возрастанию' : 'По убыванию'}
          </div>
        </div>
      </div>
    );
  },
};

// Пример с кастомным плейсхолдером
export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Выберите поле для сортировки',
    options: [
      { value: 'date', label: 'Дата создания' },
      { value: 'name', label: 'Название' },
      { value: 'status', label: 'Статус' },
    ],
  },
};
