// Toast.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';
import { Toast, ToastAction, ToastProvider, ToastViewport } from '@/components/ui/toast';
import { useToast } from '@/hooks/useToast';

const meta: Meta<typeof Toast> = {
  title: 'Components/UI/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Система уведомлений Toast. Показывает временные уведомления в углу экрана. Поддерживает различные типы уведомлений: стандартные, успешные и ошибки.',
      },
    },
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'success'],
      description: 'Тип уведомления',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы',
    },
  },
  decorators: [
    Story => (
      <ToastProvider>
        <Story />
        <ToastViewport />
      </ToastProvider>
    ),
  ],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof Toast>;

// Вспомогательный компонент для демонстрации
const ToastDemo = ({ variant }: { variant?: 'default' | 'destructive' | 'success' }) => {
  const { toast } = useToast();

  return (
    <Button
      variant='fade-contrast-outlined'
      onClick={() => {
        toast({
          variant,
          title:
            variant === 'success'
              ? 'Успешно!'
              : variant === 'destructive'
                ? 'Ошибка!'
                : 'Уведомление',
          description:
            variant === 'success'
              ? 'Операция выполнена успешно.'
              : variant === 'destructive'
                ? 'Что-то пошло не так.'
                : 'Посмотрите, что произошло в системе.',
        });
      }}
    >
      Показать {variant || 'default'} уведомление
    </Button>
  );
};

// Стандартное уведомление
export const Default: Story = {
  render: () => <ToastDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Стандартное информационное уведомление.',
      },
    },
  },
};

// Успешное уведомление
export const Success: Story = {
  render: () => <ToastDemo variant='success' />,
  parameters: {
    docs: {
      description: {
        story: 'Уведомление об успешном выполнении операции с зеленой подсветкой.',
      },
    },
  },
};

// Уведомление об ошибке
export const Destructive: Story = {
  render: () => <ToastDemo variant='destructive' />,
  parameters: {
    docs: {
      description: {
        story: 'Уведомление об ошибке с красной подсветкой.',
      },
    },
  },
};

// С действиями
export const WithAction: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <Button
        variant='fade-contrast-outlined'
        onClick={() => {
          toast({
            title: 'Запрос',
            description: 'Хотите выполнить это действие?',
            action: (
              <ToastAction altText='Подтвердить' onClick={() => alert('Действие подтверждено!')}>
                Подтвердить
              </ToastAction>
            ),
          });
        }}
      >
        Показать уведомление с действием
      </Button>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Уведомление с кнопкой действия.',
      },
    },
  },
};

// Длительное уведомление
export const WithLongContent: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <Button
        variant='fade-contrast-outlined'
        onClick={() => {
          toast({
            title: 'Очень длинный заголовок уведомления, который не помещается в одну строку',
            description:
              'Это очень подробное описание уведомления, которое содержит много информации и занимает несколько строк. Текст должен быть достаточно длинным, чтобы продемонстрировать, как компонент обрабатывает многострочный контент.',
          });
        }}
      >
        Показать длинное уведомление
      </Button>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Уведомление с длинным текстом, демонстрирующее адаптивность компонента.',
      },
    },
  },
};

// Комплексный пример
export const ComplexExample: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <div className='flex flex-col gap-2'>
        <Button
          onClick={() => {
            toast({
              title: 'Обычное уведомление',
              description: 'Это стандартное информационное сообщение',
            });
          }}
        >
          Информация
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
          Успех
        </Button>

        <Button
          variant='warning-filled'
          onClick={() => {
            toast({
              variant: 'destructive',
              title: 'Ошибка',
              description: 'Произошла ошибка при выполнении',
              action: <ToastAction altText='Повторить'>Повторить</ToastAction>,
            });
          }}
        >
          Ошибка
        </Button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Комплексный пример использования всех типов уведомлений с различными действиями.',
      },
    },
  },
};
