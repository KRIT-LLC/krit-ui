import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AnalyticsIcon,
  AssignmentIcon,
  BarChartIcon,
  SettingsIcon,
  StarIcon,
  TableChartIcon,
  ViewListIcon,
} from '@/assets';

const meta: Meta<typeof Tabs> = {
  title: 'Components/UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Компонент вкладок для организации контента на отдельные панели. Основан на Radix UI Tabs. Поддерживает варианты размеров: `default` (для вкладок с текстом и иконкой, px-4 py-1.5) и `icon` (для вкладок только с иконкой, px-1 py-1.5).',
      },
    },
  },
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'Значение вкладки по умолчанию',
    },
    value: {
      control: 'text',
      description: 'Текущее значение вкладки (контролируемый режим)',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Ориентация компонента',
    },
    activationMode: {
      control: 'select',
      options: ['automatic', 'manual'],
      description: 'Режим активации вкладок',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы',
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof Tabs>;

// Базовые вкладки
export const Default: Story = {
  render: () => (
    <Tabs defaultValue='tab1' className='w-[400px]'>
      <TabsList>
        <TabsTrigger value='tab1'>Вкладка 1</TabsTrigger>
        <TabsTrigger value='tab2'>Вкладка 2</TabsTrigger>
        <TabsTrigger value='tab3'>Вкладка 3</TabsTrigger>
      </TabsList>
      <TabsContent value='tab1' className='p-4'>
        Контент первой вкладки
      </TabsContent>
      <TabsContent value='tab2' className='p-4'>
        Контент второй вкладки
      </TabsContent>
      <TabsContent value='tab3' className='p-4'>
        Контент третьей вкладки
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример использования вкладок с горизонтальной ориентацией.',
      },
    },
  },
};

// Вертикальные вкладки
export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue='tab1' orientation='vertical' className='flex gap-4 w-[400px]'>
      <TabsList className='flex-col h-auto'>
        <TabsTrigger value='tab1'>Вкладка 1</TabsTrigger>
        <TabsTrigger value='tab2'>Вкладка 2</TabsTrigger>
        <TabsTrigger value='tab3'>Вкладка 3</TabsTrigger>
      </TabsList>
      <div className='flex-1'>
        <TabsContent value='tab1' className='p-4'>
          Контент первой вкладки
        </TabsContent>
        <TabsContent value='tab2' className='p-4'>
          Контент второй вкладки
        </TabsContent>
        <TabsContent value='tab3' className='p-4'>
          Контент третьей вкладки
        </TabsContent>
      </div>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Вертикальная ориентация вкладок.',
      },
    },
  },
};

// С иконками и текстом (default размер)
export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue='tab1' className='w-[400px]'>
      <TabsList>
        <TabsTrigger value='tab1' size='default'>
          <StarIcon className='w-5 h-5' />
          Вкладка 1
        </TabsTrigger>
        <TabsTrigger value='tab2' size='default'>
          <SettingsIcon className='w-5 h-5' />
          Вкладка 2
        </TabsTrigger>
        <TabsTrigger value='tab3' size='default'>
          <AssignmentIcon className='w-5 h-5' />
          Вкладка 3
        </TabsTrigger>
      </TabsList>
      <TabsContent value='tab1' className='p-4'>
        Контент первой вкладки с иконкой и текстом (размер default)
      </TabsContent>
      <TabsContent value='tab2' className='p-4'>
        Контент второй вкладки с иконкой и текстом (размер default)
      </TabsContent>
      <TabsContent value='tab3' className='p-4'>
        Контент третьей вкладки с иконкой и текстом (размер default)
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Вкладки с иконками и текстом. Используется размер `default` (px-4 py-1.5) для оптимальных отступов при наличии текста.',
      },
    },
  },
};

// Только иконки (icon размер)
export const IconOnly: Story = {
  render: () => (
    <Tabs defaultValue='tab1' className='w-[400px]'>
      <TabsList>
        <TabsTrigger value='tab1' size='icon'>
          <StarIcon className='w-6 h-6' />
        </TabsTrigger>
        <TabsTrigger value='tab2' size='icon'>
          <SettingsIcon className='w-6 h-6' />
        </TabsTrigger>
        <TabsTrigger value='tab3' size='icon'>
          <AssignmentIcon className='w-6 h-6' />
        </TabsTrigger>
        <TabsTrigger value='tab4' size='icon'>
          <AnalyticsIcon className='w-6 h-6' />
        </TabsTrigger>
      </TabsList>
      <TabsContent value='tab1' className='p-4'>
        Контент первой вкладки только с иконкой (размер icon)
      </TabsContent>
      <TabsContent value='tab2' className='p-4'>
        Контент второй вкладки только с иконкой (размер icon)
      </TabsContent>
      <TabsContent value='tab3' className='p-4'>
        Контент третьей вкладки только с иконкой (размер icon)
      </TabsContent>
      <TabsContent value='tab4' className='p-4'>
        Контент четвертой вкладки только с иконкой (размер icon)
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Вкладки только с иконками без текста. Используется размер `icon` (px-1 py-1.5) для компактных отступов при отсутствии текста.',
      },
    },
  },
};

// Комбинация размеров
export const MixedSizes: Story = {
  render: () => (
    <div className='flex flex-col gap-8'>
      <div>
        <h3 className='mb-4 text-sm font-medium'>Вкладки с текстом и иконками (default)</h3>
        <Tabs defaultValue='tab1' className='w-[400px]'>
          <TabsList>
            <TabsTrigger value='tab1' size='default'>
              <ViewListIcon className='w-5 h-5' />
              Список
            </TabsTrigger>
            <TabsTrigger value='tab2' size='default'>
              <TableChartIcon className='w-5 h-5' />
              Таблица
            </TabsTrigger>
            <TabsTrigger value='tab3' size='default'>
              <BarChartIcon className='w-5 h-5' />
              График
            </TabsTrigger>
          </TabsList>
          <TabsContent value='tab1' className='p-4'>
            Контент с размером default (px-4 py-1.5)
          </TabsContent>
          <TabsContent value='tab2' className='p-4'>
            Контент с размером default (px-4 py-1.5)
          </TabsContent>
          <TabsContent value='tab3' className='p-4'>
            Контент с размером default (px-4 py-1.5)
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <h3 className='mb-4 text-sm font-medium'>Вкладки только с иконками (icon)</h3>
        <Tabs defaultValue='tab4' className='w-[400px]'>
          <TabsList>
            <TabsTrigger value='tab4' size='icon'>
              <ViewListIcon className='w-6 h-6' />
            </TabsTrigger>
            <TabsTrigger value='tab5' size='icon'>
              <TableChartIcon className='w-6 h-6' />
            </TabsTrigger>
            <TabsTrigger value='tab6' size='icon'>
              <BarChartIcon className='w-6 h-6' />
            </TabsTrigger>
          </TabsList>
          <TabsContent value='tab4' className='p-4'>
            Контент с размером icon (px-1 py-1.5)
          </TabsContent>
          <TabsContent value='tab5' className='p-4'>
            Контент с размером icon (px-1 py-1.5)
          </TabsContent>
          <TabsContent value='tab6' className='p-4'>
            Контент с размером icon (px-1 py-1.5)
          </TabsContent>
        </Tabs>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Сравнение двух вариантов размеров: `default` для вкладок с текстом и иконками, `icon` для вкладок только с иконками.',
      },
    },
  },
};

// Отключенная вкладка
export const DisabledTab: Story = {
  render: () => (
    <Tabs defaultValue='tab1' className='w-[400px]'>
      <TabsList>
        <TabsTrigger value='tab1'>Активная</TabsTrigger>
        <TabsTrigger value='tab2' disabled>
          Отключенная
        </TabsTrigger>
        <TabsTrigger value='tab3'>Активная</TabsTrigger>
      </TabsList>
      <TabsContent value='tab1' className='p-4'>
        Контент активной вкладки
      </TabsContent>
      <TabsContent value='tab2' className='p-4'>
        Контент отключенной вкладки
      </TabsContent>
      <TabsContent value='tab3' className='p-4'>
        Контент активной вкладки
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Пример с отключенной вкладкой.',
      },
    },
  },
};
