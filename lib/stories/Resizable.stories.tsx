import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

const meta: Meta<typeof ResizablePanelGroup> = {
  title: 'Components/UI/Resizable',
  component: ResizablePanelGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Компоненты для создания изменяемых панелей. Позволяют пользователям изменять размеры разделов интерфейса.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Направление размещения панелей',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы',
    },
    autoSaveId: {
      control: 'text',
      description: 'ID для автоматического сохранения размеров панелей',
    },
  },
} satisfies Meta<typeof ResizablePanelGroup>;

export default meta;
type Story = StoryObj<typeof ResizablePanelGroup>;

// Базовый пример с горизонтальными панелями
export const Horizontal: Story = {
  render: () => (
    <div className='h-64'>
      <ResizablePanelGroup direction='horizontal' className='max-w-md rounded-lg border'>
        <ResizablePanel defaultSize={50}>
          <div className='flex h-full items-center justify-center p-6'>
            <span className='font-semibold'>Левая панель</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <div className='flex h-full items-center justify-center p-6'>
            <span className='font-semibold'>Правая панель</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

// Вертикальные панели
export const Vertical: Story = {
  render: () => (
    <div className='h-96'>
      <ResizablePanelGroup direction='vertical' className='max-w-md rounded-lg border'>
        <ResizablePanel defaultSize={25}>
          <div className='flex h-full items-center justify-center p-6'>
            <span className='font-semibold'>Верхняя панель</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <div className='flex h-full items-center justify-center p-6'>
            <span className='font-semibold'>Центральная панель</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25}>
          <div className='flex h-full items-center justify-center p-6'>
            <span className='font-semibold'>Нижняя панель</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

// Без видимой ручки
export const WithoutHandle: Story = {
  render: () => (
    <div className='h-64'>
      <ResizablePanelGroup direction='horizontal' className='max-w-md rounded-lg border'>
        <ResizablePanel defaultSize={50}>
          <div className='flex h-full items-center justify-center p-6'>
            <span className='font-semibold'>Левая панель</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <div className='flex h-full items-center justify-center p-6'>
            <span className='font-semibold'>Правая панель</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

// Сложная компоновка
export const ComplexLayout: Story = {
  render: () => (
    <div className='h-96'>
      <ResizablePanelGroup direction='horizontal' className='max-w-4xl rounded-lg border'>
        <ResizablePanel defaultSize={25} minSize={20}>
          <div className='flex h-full items-center justify-center p-6'>
            <span className='font-semibold'>Боковая панель</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <ResizablePanelGroup direction='vertical'>
            <ResizablePanel defaultSize={70}>
              <div className='flex h-full items-center justify-center p-6'>
                <span className='font-semibold'>Основной контент</span>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={30} minSize={20}>
              <div className='flex h-full items-center justify-center p-6'>
                <span className='font-semibold'>Нижняя панель</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

// Пример с реальным контентом
export const WithContent: Story = {
  render: () => (
    <div className='h-96'>
      <ResizablePanelGroup direction='horizontal' className='max-w-4xl rounded-lg border'>
        <ResizablePanel defaultSize={30} minSize={20}>
          <div className='h-full p-4 bg-muted'>
            <h3 className='font-semibold mb-4'>Навигация</h3>
            <ul className='space-y-2'>
              <li className='p-2 hover:bg-accent rounded'>Пункт 1</li>
              <li className='p-2 hover:bg-accent rounded'>Пункт 2</li>
              <li className='p-2 hover:bg-accent rounded'>Пункт 3</li>
              <li className='p-2 hover:bg-accent rounded'>Пункт 4</li>
            </ul>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={70}>
          <div className='h-full p-4'>
            <h2 className='text-xl font-bold mb-4'>Основной контент</h2>
            <p className='text-muted-foreground'>
              Это пример основного контента. Вы можете изменить размер панелей, перетаскивая ручку
              между ними.
            </p>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

// Состояния с ограничениями
export const WithConstraints: Story = {
  render: () => {
    const [sizes, setSizes] = useState([30, 40, 30]);

    return (
      <div className='h-96'>
        <ResizablePanelGroup
          direction='horizontal'
          className='max-w-4xl rounded-lg border'
          onLayout={newSizes => setSizes(newSizes)}
        >
          <ResizablePanel defaultSize={sizes[0]} minSize={10} maxSize={50}>
            <div className='flex flex-col h-full p-4 bg-muted'>
              <span className='font-semibold'>Панель 1</span>
              <span className='text-sm text-muted-foreground mt-2'>{Math.round(sizes[0])}%</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={sizes[1]} minSize={20}>
            <div className='flex flex-col h-full p-4'>
              <span className='font-semibold'>Панель 2</span>
              <span className='text-sm text-muted-foreground mt-2'>{Math.round(sizes[1])}%</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={sizes[2]} minSize={10} maxSize={40}>
            <div className='flex flex-col h-full p-4 bg-muted'>
              <span className='font-semibold'>Панель 3</span>
              <span className='text-sm text-muted-foreground mt-2'>{Math.round(sizes[2])}%</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    );
  },
};
