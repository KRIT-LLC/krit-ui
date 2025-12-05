import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/useToast';

const meta: Meta<typeof Toaster> = {
  title: 'Components/UI/Toaster',
  component: Toaster,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Система отображения уведомлений Toast. Рендерит все активные уведомления через портал. Используется вместе с хуком useToast.',
      },
    },
    layout: 'centered',
  },
  argTypes: {
    viewportClassname: {
      control: 'text',
      description: 'Дополнительные CSS-классы для контейнера уведомлений',
    },
  },
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof Toaster>;

// Компонент для демонстрации работы Toaster
const ToastDemo = () => {
  const { toast } = useToast();

  return (
    <div className='flex flex-col gap-4'>
      <Button
        onClick={() => {
          toast({
            title: 'Обычное уведомление',
            description: 'Это стандартное информационное сообщение',
          });
        }}
      >
        Показать обычное уведомление
      </Button>

      <Button
        variant='theme-filled'
        onClick={() => {
          toast({
            variant: 'success',
            title: 'Успех!',
            description: 'Операция завершена успешно',
          });
        }}
      >
        Показать успешное уведомление
      </Button>

      <Button
        variant='warning-filled'
        onClick={() => {
          toast({
            variant: 'destructive',
            title: 'Ошибка',
            description: 'Произошла ошибка при выполнении',
          });
        }}
      >
        Показать уведомление об ошибке
      </Button>
    </div>
  );
};

// Базовая демонстрация
export const Default: Story = {
  render: () => (
    <>
      <ToastDemo />
      <Toaster />
    </>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Базовая демонстрация работы системы уведомлений с различными типами сообщений.',
      },
    },
  },
};

// С кастомным классом для контейнера
export const WithCustomViewport: Story = {
  render: () => (
    <>
      <ToastDemo />
      <Toaster viewportClassname='top-10 right-10' />
    </>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toaster с кастомным позиционированием контейнера уведомлений.',
      },
    },
  },
};
