import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';
import { PreviewFull } from '@/components/ui/previewFull';

const meta: Meta<typeof PreviewFull> = {
  title: 'Components/UI/PreviewFull',
  component: PreviewFull,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Компонент для полноэкранного просмотра медиа-контента с поддержкой навигации, поворота и управления. Поддерживает изображения, видео, аудио и PDF файлы.',
      },
    },
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'URL источника медиа-контента',
    },
    name: {
      control: 'text',
      description: 'Название файла (особенно важно для PDF)',
    },
    type: {
      control: 'select',
      options: ['image', 'video', 'audio', 'pdf'],
      description: 'Тип контента',
    },
    onPrev: {
      action: 'onPrev',
      description: 'Функция перехода к предыдущему элементу в галерее',
    },
    onNext: {
      action: 'onNext',
      description: 'Функция перехода к следующему элементу в галерее',
    },
    onRemove: {
      action: 'onRemove',
      description: 'Функция удаления текущего элемента',
    },
  },
} satisfies Meta<typeof PreviewFull>;

export default meta;
type Story = StoryObj<typeof PreviewFull>;

// Базовая история с изображением
export const Image: Story = {
  args: {
    src: 'https://via.placeholder.com/800x600',
    type: 'image',
    name: 'placeholder.jpg',
  },
  render: args => (
    <PreviewFull {...args}>
      <Button>Просмотр изображения</Button>
    </PreviewFull>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Базовая реализация компонента для просмотра изображений.',
      },
    },
  },
};

// Видео контент
export const Video: Story = {
  args: {
    src: '',
    type: 'video',
    name: 'video.mp4',
  },
  render: args => (
    <PreviewFull {...args}>
      <Button>Просмотр видео</Button>
    </PreviewFull>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Компонент для просмотра видео с элементами управления воспроизведением.',
      },
    },
  },
};

// Аудио контент
export const Audio: Story = {
  args: {
    src: '',
    type: 'audio',
    name: 'audio.mp3',
  },
  render: args => (
    <PreviewFull {...args}>
      <Button>Просмотр аудио</Button>
    </PreviewFull>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Компонент для прослушивания аудиофайлов с элементами управления.',
      },
    },
  },
};

// PDF документ
export const PDF: Story = {
  args: {
    src: '/sample.pdf',
    type: 'pdf',
    name: 'document.pdf',
  },
  render: args => (
    <PreviewFull {...args}>
      <Button>Просмотр PDF</Button>
    </PreviewFull>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Компонент для работы с PDF-файлами, предоставляющий ссылку для скачивания/просмотра.',
      },
    },
  },
};

// С навигацией
export const WithNavigation: Story = {
  args: {
    src: 'https://via.placeholder.com/800x600',
    type: 'image',
    name: 'placeholder.jpg',
    onPrev: () => console.log('Previous'),
    onNext: () => console.log('Next'),
  },
  render: args => (
    <PreviewFull {...args}>
      <Button>Просмотр с навигацией</Button>
    </PreviewFull>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Компонент с поддержкой навигации между элементами (кнопки вперед/назад).',
      },
    },
  },
};

// С функцией удаления
export const WithRemove: Story = {
  args: {
    src: 'https://via.placeholder.com/800x600',
    type: 'image',
    name: 'placeholder.jpg',
    onRemove: () => Promise.resolve(console.log('Remove')),
  },
  render: args => (
    <PreviewFull {...args}>
      <Button>Просмотр с удалением</Button>
    </PreviewFull>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Компонент с функцией удаления текущего элемента.',
      },
    },
  },
};

// Полный функционал
export const FullFeatured: Story = {
  args: {
    src: 'https://via.placeholder.com/800x600',
    type: 'image',
    name: 'placeholder.jpg',
    onPrev: () => console.log('Previous'),
    onNext: () => console.log('Next'),
    onRemove: () => Promise.resolve(console.log('Remove')),
  },
  render: args => (
    <PreviewFull {...args}>
      <Button>Полнофункциональный просмотр</Button>
    </PreviewFull>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Компонент со всем доступным функционалом: навигация, поворот и удаление.',
      },
    },
  },
};
