// MultiSelect.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from '@/components/ui/button';
import { MultiSelect, MultiSelectOptionType, MultiSelectProps } from '@/components/ui/multi-select';

const meta: Meta<typeof MultiSelect> = {
  title: 'Components/UI/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Компонент для множественного выбора опций с поддержкой поиска, группировки и создания новых опций.',
      },
    },
  },
  argTypes: {
    options: {
      control: 'object',
      description: 'Опции для выбора',
    },
    value: {
      control: 'object',
      description: 'Выбранные значения',
    },
    placeholder: {
      control: 'text',
      description: 'Текст-заполнитель при отсутствии выбранных значений',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'secondary-outline', 'tertiary', 'text'],
      description: 'Вариант стиля кнопки-триггера',
    },
    disabled: {
      control: 'boolean',
      description: 'Неактивное состояние',
    },
    isLoading: {
      control: 'boolean',
      description: 'Состояние загрузки',
    },
    isError: {
      control: 'boolean',
      description: 'Состояние ошибки',
    },
    showAllOption: {
      control: 'boolean',
      description: 'Отображение опции "Выбрать все"',
    },
    showReset: {
      control: 'boolean',
      description: 'Отображение кнопки сброса',
    },
    showBadge: {
      control: 'boolean',
      description: 'Отображение выбранных значений в виде бейджей',
    },
    maxSelected: {
      control: 'number',
      description: 'Максимальное количество выбираемых элементов',
    },
    shouldFilter: {
      control: 'boolean',
      description: 'Включение фильтрации опций',
    },
    required: {
      control: 'boolean',
      description: 'Обязательное поле',
    },
    onCreate: {
      action: 'onCreate',
      description: 'Callback создания новой опции',
    },
    onChange: {
      action: 'onChange',
      description: 'Callback изменения выбранных значений',
    },
  },
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof MultiSelect>;

const defaultOptions: MultiSelectOptionType[] = [
  { label: 'JavaScript', value: 'js' },
  { label: 'TypeScript', value: 'ts' },
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
];

// Interactive wrapper component
const InteractiveMultiSelect = (props: MultiSelectProps) => {
  const [selected, setSelected] = React.useState<string[]>(props.value || []);

  const handleChange = (newValue: string[]) => {
    setSelected(newValue);
    props.onChange?.(newValue);
  };

  return <MultiSelect {...props} value={selected} onChange={handleChange} />;
};

// Базовая история
export const Default: Story = {
  render: args => <InteractiveMultiSelect {...args} />,
  args: {
    options: defaultOptions,
    value: ['js', 'react'],
    placeholder: 'Select technologies',
    onChange: fn(),
  },
};

// С ограничением выбора
export const WithMaxSelected: Story = {
  render: args => <InteractiveMultiSelect {...args} />,
  args: {
    options: defaultOptions,
    value: ['js'],
    maxSelected: 2,
    placeholder: 'Select up to 2 technologies',
    onChange: fn(),
  },
};

// С бейджами
export const WithBadges: Story = {
  render: args => <InteractiveMultiSelect {...args} />,
  args: {
    options: defaultOptions,
    value: ['js', 'react', 'ts'],
    showBadge: true,
    placeholder: 'Select technologies',
    onChange: fn(),
  },
};

// С группами
export const WithGroups: Story = {
  render: args => <InteractiveMultiSelect {...args} />,
  args: {
    options: [
      {
        label: 'Frontend',
        value: 'frontend',
        children: [
          { label: 'React', value: 'react' },
          { label: 'Vue', value: 'vue' },
        ],
      },
      {
        label: 'Backend',
        value: 'backend',
        children: [
          { label: 'Node.js', value: 'node' },
          { label: 'Django', value: 'django' },
        ],
      },
    ],
    value: ['react'],
    placeholder: 'Select technologies',
    onChange: fn(),
  },
};

// С созданием новых опций
export const WithCreation: Story = {
  render: args => <InteractiveMultiSelect {...args} />,
  args: {
    options: defaultOptions,
    value: ['js'],
    createLabel: 'Create:',
    placeholder: 'Select or create technology',
    onChange: fn(),
    onCreate: fn(),
  },
};

// В состоянии загрузки
export const Loading: Story = {
  args: {
    options: [],
    value: [],
    isLoading: true,
    placeholder: 'Loading options...',
    onChange: fn(),
  },
};

// В состоянии ошибки
export const Error: Story = {
  args: {
    options: [],
    value: [],
    isError: true,
    placeholder: 'Failed to load options',
    onChange: fn(),
    onRefetch: fn(),
  },
};

// С кастомным рендером опций
export const CustomRender: Story = {
  render: args => <InteractiveMultiSelect {...args} />,
  args: {
    options: defaultOptions,
    value: ['js'],
    placeholder: 'Select technologies',
    onChange: fn(),
    renderOption: (option, isChecked) => (
      <div className='flex items-center gap-2'>
        <span className={`w-3 h-3 rounded-full ${isChecked ? 'bg-green-500' : 'bg-gray-300'}`} />
        <span className='font-medium'>{option.label}</span>
        <span className='text-xs text-gray-500'>({option.value})</span>
      </div>
    ),
  },
};

// С предварительным поиском
export const WithDefaultSearch: Story = {
  render: args => <InteractiveMultiSelect {...args} />,
  args: {
    options: defaultOptions,
    value: [],
    defaultSearchedValue: 'script',
    placeholder: 'Search technologies',
    onChange: fn(),
  },
};

// Обязательное поле
export const Required: Story = {
  render: args => <InteractiveMultiSelect {...args} />,
  args: {
    options: defaultOptions,
    value: [],
    required: true,
    placeholder: 'Select technologies *',
    onChange: fn(),
  },
};

// Неактивное состояние
export const Disabled: Story = {
  args: {
    options: defaultOptions,
    value: ['js'],
    disabled: true,
    placeholder: 'Select technologies',
    onChange: fn(),
  },
};

// С кнопкой сброса
export const WithReset: Story = {
  render: args => <InteractiveMultiSelect {...args} />,
  args: {
    options: defaultOptions,
    value: ['js', 'react'],
    showReset: true,
    placeholder: 'Select technologies',
    onChange: fn(),
  },
};

// С опцией "Выбрать все"
export const WithSelectAll: Story = {
  render: args => <InteractiveMultiSelect {...args} />,
  args: {
    options: defaultOptions,
    value: ['js'],
    showAllOption: true,
    placeholder: 'Select technologies',
    onChange: fn(),
  },
};

// Комплексный пример
export const Complex: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>(['js']);

    return (
      <div className='flex flex-col gap-4 max-w-md'>
        <MultiSelect
          options={defaultOptions}
          value={selected}
          onChange={setSelected}
          placeholder='Select technologies'
          showAllOption
          showReset
          showBadge
          maxSelected={3}
        />
        <Button onClick={() => setSelected([])}>Clear selection</Button>
      </div>
    );
  },
};
