// Skeleton.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '@/components/ui/skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/UI/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Компонент-плейсхолдер для отображения во время загрузки контента с анимированным эффектом пульсации.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы для кастомизации внешнего вида',
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof Skeleton>;

// Базовый скелетон
export const Default: Story = {
  args: {
    className: 'h-4 w-full',
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый плейсхолдер в виде строки текста.',
      },
    },
  },
};

// Круглый скелетон (для аватаров)
export const Circular: Story = {
  args: {
    className: 'h-12 w-12 rounded-full',
  },
  parameters: {
    docs: {
      description: {
        story: 'Круглый плейсхолдер, подходящий для аватаров или иконок.',
      },
    },
  },
};

// Прямоугольный скелетон (для изображений)
export const Rectangular: Story = {
  args: {
    className: 'h-32 w-full rounded-md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Прямоугольный плейсхолдер для картинок или медиа-контента.',
      },
    },
  },
};

// Комплексный пример - карточка пользователя
export const UserCard: Story = {
  render: () => (
    <div className='flex items-center space-x-4 max-w-md'>
      <Skeleton className='h-12 w-12 rounded-full' />
      <div className='space-y-2 flex-1'>
        <Skeleton className='h-4 w-3/4' />
        <Skeleton className='h-4 w-1/2' />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Комплексный пример использования скелетона для карточки пользователя.',
      },
    },
  },
};

// Пример для списка
export const List: Story = {
  render: () => (
    <div className='space-y-3 max-w-md'>
      <div className='flex items-center space-x-4'>
        <Skeleton className='h-12 w-12 rounded-full' />
        <div className='space-y-2 flex-1'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-3/4' />
        </div>
      </div>
      <div className='flex items-center space-x-4'>
        <Skeleton className='h-12 w-12 rounded-full' />
        <div className='space-y-2 flex-1'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-3/4' />
        </div>
      </div>
      <div className='flex items-center space-x-4'>
        <Skeleton className='h-12 w-12 rounded-full' />
        <div className='space-y-2 flex-1'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-3/4' />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Пример использования скелетона для списка элементов.',
      },
    },
  },
};

// Пример для детальной страницы
export const DetailPage: Story = {
  render: () => (
    <div className='space-y-4 max-w-2xl'>
      <Skeleton className='h-8 w-3/4' />
      <Skeleton className='h-4 w-full' />
      <Skeleton className='h-4 w-full' />
      <Skeleton className='h-4 w-2/3' />
      <div className='pt-4'>
        <Skeleton className='h-64 w-full rounded-md' />
      </div>
      <div className='space-y-2 pt-4'>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-3/4' />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Комплексный пример использования скелетона для детальной страницы.',
      },
    },
  },
};

// Скелетон с кастомными стилями
export const WithCustomStyle: Story = {
  args: {
    className: 'h-6 w-48 bg-background-warning/50',
  },
  parameters: {
    docs: {
      description: {
        story: 'Скелетон с кастомными стилями (цвет и размер).',
      },
    },
  },
};
