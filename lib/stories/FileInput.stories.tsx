// FileInput.stories.tsx
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { FileInput } from '@/components/ui/file-input';

const meta: Meta<typeof FileInput> = {
  title: 'Components/UI/FileInput',
  component: FileInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Компонент для выбора файла с валидацией и превью. Поддерживает ограничение по размеру и типу файлов.',
      },
    },
  },
  argTypes: {
    accept: {
      control: 'text',
      description: 'Допустимые типы файлов (например: image/*, .pdf)',
    },
    maxFileSize: {
      control: 'number',
      description: 'Максимальный размер файла в байтах',
    },
    error: {
      control: 'text',
      description: 'Сообщение об ошибке или флаг ошибки',
    },
    defaultValue: {
      control: 'text',
      description: 'Значение имени файла по умолчанию',
    },
    disabled: {
      control: 'boolean',
      description: 'Блокировка взаимодействия с компонентом',
    },
    onAdd: {
      action: 'fileAdded',
      description: 'Callback при добавлении файла',
    },
    onFileRemove: {
      action: 'fileRemoved',
      description: 'Callback при удалении файла',
    },
    onClick: {
      action: 'clicked',
      description: 'Callback при клике на поле ввода',
    },
  },
} satisfies Meta<typeof FileInput>;

export default meta;
type Story = StoryObj<typeof FileInput>;

export const Default: Story = {
  args: {
    maxFileSize: 5242880, // 5MB
    accept: 'image/*',
    placeholder: 'Выберите файл',
    onAdd: action('fileAdded'),
    onFileRemove: action('fileRemoved'),
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: 'Файл слишком большой',
    defaultValue: 'large_image.jpg',
  },
};

export const WithDefaultValue: Story = {
  args: {
    ...Default.args,
    defaultValue: 'example.pdf',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    defaultValue: 'locked.jpg',
  },
};
