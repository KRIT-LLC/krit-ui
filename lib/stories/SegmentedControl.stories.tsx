import type { Meta, StoryObj } from '@storybook/react';
import { File } from 'lucide-react';
import { SegmentedControl } from '@/components/ui/segmented-control';

// Пример иконки, замените на вашу реализацию

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components/UI/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Сегментированный контрол для переключения между опциями. Построен на основе компонента Tabs с упрощенным API.',
      },
    },
  },
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'Значение выбранной по умолчанию опции',
    },
    options: {
      control: 'object',
      description: 'Массив опций для отображения',
    },
    onClick: {
      action: 'optionClicked',
      description: 'Обработчик клика по опции',
    },
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

// Базовый пример с текстовыми опциями
export const Default: Story = {
  args: {
    defaultValue: 'option1',
    options: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
  },
};

// С иконками
export const WithIcons: Story = {
  args: {
    defaultValue: 'list',
    options: [
      { value: 'grid', label: 'Сетка', icon: <File size={16} /> },
      { value: 'list', label: 'Список', icon: <File size={16} /> },
      { value: 'map', label: 'Карта', icon: <File size={16} /> },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Сегментированный контрол с иконками в опциях.',
      },
    },
  },
};

// Только иконки
export const IconsOnly: Story = {
  args: {
    defaultValue: 'sun',
    options: [
      { value: 'sun', label: '', icon: <File size={16} /> },
      { value: 'moon', label: '', icon: <File size={16} /> },
      { value: 'settings', label: '', icon: <File size={16} /> },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Сегментированный контрол только с иконками (без текстовых меток).',
      },
    },
  },
};

// Неактивная опция
export const WithDisabledOption: Story = {
  args: {
    defaultValue: 'active',
    options: [
      { value: 'active', label: 'Активная' },
      { value: 'disabled', label: 'Неактивная' },
    ],
  },
  render: args => (
    <SegmentedControl
      {...args}
      options={[
        { value: 'active', label: 'Активная' },
        { value: 'disabled', label: 'Неактивная' },
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Пример с неактивной опцией (реализация зависит от базового компонента Tabs).',
      },
    },
  },
};

// Много опций
export const ManyOptions: Story = {
  args: {
    defaultValue: 'option1',
    options: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
      { value: 'option4', label: 'Опция 4' },
      { value: 'option5', label: 'Опция 5' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Сегментированный контрол с большим количеством опций.',
      },
    },
  },
};

// Интерактивный пример
export const Interactive: Story = {
  args: {
    defaultValue: 'view',
    options: [
      { value: 'view', label: 'Просмотр' },
      { value: 'edit', label: 'Редактирование' },
      { value: 'preview', label: 'Предпросмотр' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Интерактивный пример с обработчиком клика.',
      },
    },
  },
};

// Различные размеры (если поддерживаются базовым Tabs)
export const DifferentSizes: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div>
        <h4 className='mb-2'>Маленький размер</h4>
        <SegmentedControl
          defaultValue='small1'
          options={[
            { value: 'small1', label: 'Мал. 1' },
            { value: 'small2', label: 'Мал. 2' },
          ]}
        />
      </div>
      <div>
        <h4 className='mb-2'>Стандартный размер</h4>
        <SegmentedControl
          defaultValue='default1'
          options={[
            { value: 'default1', label: 'Обычная 1' },
            { value: 'default2', label: 'Обычная 2' },
          ]}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Пример различных размеров (реализация зависит от базового компонента Tabs).',
      },
    },
  },
};
