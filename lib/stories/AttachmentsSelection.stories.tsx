// lib/components/ui/attachmentsSection.stories.tsx
import { AttachmentItem } from '@/lib/attachments';
import type { Meta, StoryObj } from '@storybook/react';
import { AttachmentsSection } from '@/components/ui/attachmentsSection';

const exampleImages: AttachmentItem[] = [
  {
    id: 1,
    url: 'https://example.com/photo.jpg',
    fileName: 'nature.jpg',
    contentType: 'image/jpeg',
  },
];

const exampleVideos: AttachmentItem[] = [
  {
    id: 2,
    url: 'https://example.com/video1.mp4',
    fileName: 'demo.mp4',
    contentType: 'video/mp4',
  },
];

const exampleDocs: AttachmentItem[] = [
  {
    id: 3,
    url: 'https://example.com/doc1.pdf',
    fileName: 'report.pdf',
    contentType: 'application/pdf',
  },
];

const meta: Meta<typeof AttachmentsSection> = {
  title: 'Components/UI/AttachmentsSection',
  component: AttachmentsSection,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
    },
    previewsOrientation: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
    },
    accepts: {
      control: 'check',
      options: ['image/*', 'video/*', 'application/pdf'],
    },
    withCompress: {
      control: 'boolean',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Компонент для управления и отображения вложений с группировкой по типам',
      },
    },
  },
  args: {
    title: 'Медиаматериалы',
    tabs: [
      {
        label: 'Изображения',
        items: exampleImages,
        canAdd: true,
      },
      {
        label: 'Видео',
        items: exampleVideos,
        maxFiles: 3,
      },
      {
        label: 'Документы',
        items: exampleDocs,
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof AttachmentsSection>;

export const Default: Story = {};

export const HorizontalLayout: Story = {
  args: {
    orientation: 'horizontal',
    previewsOrientation: 'vertical',
  },
};

export const EmptyState: Story = {
  args: {
    tabs: [],
  },
};

export const WithFileUpload: Story = {
  args: {
    onAdd: async files => console.log('Added files:', files),
    onRemove: async index => console.log('Removed file at index:', index),
  },
};

export const RestrictedTypes: Story = {
  args: {
    accepts: ['image', 'pdf'],
    maxSizes: {
      image: 2 * 1024 * 1024,
      pdf: 5 * 1024 * 1024,
    },
  },
};

export const WithCompression: Story = {
  args: {
    withCompress: true,
    previewsOrientation: 'vertical',
  },
};
