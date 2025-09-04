import type { Meta, StoryObj } from '@storybook/react';
import { ConfirmModal } from '@/components/ui/confirm-modal';

const meta: Meta<typeof ConfirmModal> = {
  title: 'Components/UI/Confirm Modal',
  component: ConfirmModal,
  tags: ['autodocs'],
  argTypes: {
    confirmType: {
      control: { type: 'select' },
      options: ['contrast', 'destructive'],
    },
    inputRequired: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component: 'Модальное окно подтверждения действия с поддержкой кастомного ввода',
      },
    },
  },
  decorators: [
    Story => (
      <div className='min-h-[400px] flex items-center justify-center'>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Basic: StoryObj<typeof ConfirmModal> = {
  render: () => (
    <ConfirmModal
      title='Подтвердите действие'
      description='Вы уверены что хотите выполнить это действие?'
    >
      Открыть модалку
    </ConfirmModal>
  ),
};

export const WithInput: StoryObj<typeof ConfirmModal> = {
  render: () => (
    <ConfirmModal
      title='Введите комментарий'
      inputPlaceholder='Оставьте комментарий...'
      inputRequired
      inputRequiredLabel='Комментарий обязателен для заполнения'
    >
      Добавить комментарий
    </ConfirmModal>
  ),
};

export const Deletion: StoryObj<typeof ConfirmModal> = {
  render: () => (
    <ConfirmModal
      title='Удаление проекта'
      description='Это действие нельзя будет отменить'
      confirmType='destructive'
      confirmText='Удалить навсегда'
    >
      Удалить проект
    </ConfirmModal>
  ),
};
