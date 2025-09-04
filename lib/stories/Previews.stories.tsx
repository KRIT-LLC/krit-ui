import { useState } from 'react';
import { AttachmentItem } from '@/lib/attachments';
import type { Meta, StoryObj } from '@storybook/react';
import { Previews } from '@/components/ui/previews';

const meta: Meta<typeof Previews> = {
  title: 'Components/UI/Previews',
  component: Previews,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Компонент для отображения и управления вложениями различных типов (изображения, видео, аудио, PDF). Поддерживает предпросмотр, добавление, удаление и сжатие файлов с проверкой ограничений по размеру.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы для контейнера',
    },
    placeholder: {
      control: 'text',
      description: 'Текст-заполнитель при отсутствии вложений',
    },
    data: {
      control: 'object',
      description: 'Массив вложений для отображения',
    },
    accepts: {
      control: 'object',
      description: 'Разрешенные типы файлов',
    },
    multiple: {
      control: 'boolean',
      description: 'Разрешить множественный выбор файлов',
    },
    max: {
      control: 'number',
      description: 'Максимальное количество файлов',
    },
    previewSize: {
      control: 'number',
      description: 'Размер превью в пикселях',
    },
    gap: {
      control: 'number',
      description: 'Отступ между элементами',
    },
    title: {
      control: 'text',
      description: 'Заголовок для изображений',
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Ориентация элементов',
    },
    maxSizes: {
      control: 'object',
      description: 'Максимальные размеры файлов по типам',
    },
    withCompress: {
      control: 'boolean',
      description: 'Включить сжатие файлов',
    },
    onAdd: {
      action: 'onAdd',
      description: 'Обработчик добавления файлов',
    },
    onRemove: {
      action: 'onRemove',
      description: 'Обработчик удаления файлов',
    },
  },
} satisfies Meta<typeof Previews>;

export default meta;
type Story = StoryObj<typeof Previews>;

// Базовый пример с горизонтальной ориентацией
export const Horizontal: Story = {
  args: {
    placeholder: 'Перетащите файлы сюда или нажмите для выбора',
    multiple: true,
    max: 5,
    orientation: 'horizontal',
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовая реализация компонента с горизонтальной ориентацией элементов.',
      },
    },
  },
};

// Пример с вертикальной ориентацией
export const Vertical: Story = {
  args: {
    placeholder: 'Перетащите файлы сюда или нажмите для выбора',
    multiple: true,
    max: 5,
    orientation: 'vertical',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Компонент с вертикальной ориентацией элементов, показывающий дополнительные детали о файлах.',
      },
    },
  },
};

// Пример с предзагруженными данными
export const WithData: Story = {
  args: {
    data: [
      {
        id: 1,
        url: 'https://via.placeholder.com/150',
        fileName: 'image.jpg',
        contentType: 'image/jpeg',
      },
      {
        id: 2,
        url: '/sample.pdf',
        fileName: 'document.pdf',
        contentType: 'application/pdf',
      },
    ],
    orientation: 'horizontal',
  },
  parameters: {
    docs: {
      description: {
        story: 'Компонент с предзагруженными данными для отображения.',
      },
    },
  },
};

// Пример с ограничением количества файлов
export const WithMaxLimit: Story = {
  args: {
    data: [
      {
        id: 1,
        url: 'https://via.placeholder.com/150',
        fileName: 'image1.jpg',
        contentType: 'image/jpeg',
      },
      {
        id: 2,
        url: 'https://via.placeholder.com/150',
        fileName: 'image2.jpg',
        contentType: 'image/jpeg',
      },
    ],
    max: 2,
    orientation: 'horizontal',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Компонент с ограничением максимального количества файлов. Кнопка добавления скрыта при достижении лимита.',
      },
    },
  },
};

// Пример без возможности добавления файлов
export const ReadOnly: Story = {
  args: {
    data: [
      {
        id: 1,
        url: 'https://via.placeholder.com/150',
        fileName: 'image1.jpg',
        contentType: 'image/jpeg',
      },
      {
        id: 2,
        url: '/sample.pdf',
        fileName: 'document.pdf',
        contentType: 'application/pdf',
      },
    ],
    orientation: 'horizontal',
  },
  render: args => <Previews {...args} onAdd={undefined} />,
  parameters: {
    docs: {
      description: {
        story: 'Компонент в режиме только для чтения без возможности добавления новых файлов.',
      },
    },
  },
};

// Пример с разными типами файлов
export const MixedFileTypes: Story = {
  args: {
    data: [
      {
        id: 1,
        url: 'https://via.placeholder.com/150',
        fileName: 'image.jpg',
        contentType: 'image/jpeg',
      },
      {
        id: 2,
        url: '',
        fileName: 'video.mp4',
        contentType: 'video/mp4',
      },
      {
        id: 3,
        url: '',
        fileName: 'audio.mp3',
        contentType: 'audio/mp3',
      },
      {
        id: 4,
        url: '/sample.pdf',
        fileName: 'document.pdf',
        contentType: 'application/pdf',
      },
    ],
    orientation: 'horizontal',
  },
  parameters: {
    docs: {
      description: {
        story: 'Компонент с различными типами файлов: изображения, видео, аудио и PDF.',
      },
    },
  },
};

// Интерактивный пример
export const Interactive: Story = {
  args: {
    placeholder: 'Перетащите файлы сюда или нажмите для выбора',
    multiple: true,
    max: 5,
    orientation: 'horizontal',
  },
  render: function Render(args) {
    const [files, setFiles] = useState<AttachmentItem[]>([]);

    const handleAdd = (newFiles: File[]) => {
      console.log('Added files:', newFiles);
      // В реальном приложении здесь была бы обработка добавления файлов
      setFiles(prev => [
        ...prev,
        ...newFiles.map(file => ({
          id: Math.random(),
          url: URL.createObjectURL(file),
          fileName: file.name,
          contentType: file.type,
          file: file,
        })),
      ]);
    };

    const handleRemove = (index: number) => {
      console.log('Remove file at index:', index);
      setFiles(prev => prev.filter((_, i) => i !== index));
    };

    return (
      <div className='space-y-4'>
        <Previews {...args} data={files} onAdd={handleAdd} onRemove={handleRemove} />
        <div className='text-sm text-muted-foreground'>
          Выбрано файлов: {files.length} / {args.max}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Интерактивный пример компонента с возможностью добавления и удаления файлов.',
      },
    },
  },
};
