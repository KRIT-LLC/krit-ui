import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Компонент вкладок для организации контента на отдельные панели. Основан на Radix UI Tabs.',
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

// С иконками
export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue='tab1' className='w-[400px]'>
      <TabsList>
        <TabsTrigger value='tab1'>
          <span>⭐</span>
          Вкладка 1
        </TabsTrigger>
        <TabsTrigger value='tab2'>
          <span>🚀</span>
          Вкладка 2
        </TabsTrigger>
        <TabsTrigger value='tab3'>
          <span>🎯</span>
          Вкладка 3
        </TabsTrigger>
      </TabsList>
      <TabsContent value='tab1' className='p-4'>
        Контент первой вкладки с иконкой
      </TabsContent>
      <TabsContent value='tab2' className='p-4'>
        Контент второй вкладки с иконкой
      </TabsContent>
      <TabsContent value='tab3' className='p-4'>
        Контент третьей вкладки с иконкой
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Вкладки с иконками в переключателях.',
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
