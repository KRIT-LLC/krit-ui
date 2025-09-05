// NetworkErrorMessage.stories.tsx
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NetworkErrorMessage } from '@/components/ui/network-error-message';

/**
 * Компонент NetworkErrorMessage отображает состояние загрузки или ошибки сети.
 * Поддерживает различные режимы отображения (блочный и строчный) и предоставляет
 * возможность повторной попытки загрузки при ошибках.
 *
 * Компонент интегрирован с системой переводов приложения и использует Preloader
 * для индикации процесса загрузки.
 */

const meta: Meta<typeof NetworkErrorMessage> = {
  title: 'Components/UI/NetworkErrorMessage',
  component: NetworkErrorMessage,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Компонент для отображения состояния загрузки или ошибки сети с возможностью повторной попытки.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    textSize: {
      control: 'select',
      options: ['base', 'sm'],
      description: 'Размер текста сообщения',
    },
    isLoading: {
      control: 'boolean',
      description: 'Флаг состояния загрузки',
    },
    isError: {
      control: 'boolean',
      description: 'Флаг состояния ошибки сети',
    },
    center: {
      control: 'boolean',
      description: 'Выравнивание по центру',
    },
    inline: {
      control: 'boolean',
      description: 'Inline-режим отображения',
    },
    onRefetch: {
      action: 'refetch',
      description: 'Функция для повторной попытки загрузки',
    },
  },
};

export default meta;
type Story = StoryObj<typeof NetworkErrorMessage>;

// Вспомогательный компонент для демонстрации работы onRefetch
const NetworkErrorMessageWithState = (args: any) => {
  const [isLoading, setIsLoading] = useState(args.isLoading);
  const [isError, setIsError] = useState(args.isError);

  const simulateLoading = () => {
    setIsLoading(true);
    setIsError(false);

    // Имитация загрузки
    setTimeout(() => {
      setIsLoading(false);
      setIsError(true);
    }, 2000);
  };

  const simulateRefetch = () => {
    args.onRefetch?.();
    simulateLoading();
  };

  return (
    <div className='p-4 border rounded-lg'>
      <h3 className='text-lg font-medium mb-2'>Содержимое страницы</h3>
      <NetworkErrorMessage
        {...args}
        isLoading={isLoading}
        isError={isError}
        onRefetch={simulateRefetch}
      />
    </div>
  );
};

/**
 * Состояние загрузки
 * Отображает индикатор процесса загрузки данных
 */
export const Loading: Story = {
  args: {
    isLoading: true,
    isError: false,
  },
};

/**
 * Состояние ошибки сети
 * Отображает сообщение об ошибке и кнопку для повторной попытки
 */
export const Error: Story = {
  args: {
    isLoading: false,
    isError: true,
  },
};

/**
 * Inline-режим отображения
 * Компонент отображается в строке с другим контентом
 */
export const InlineMode: Story = {
  render: args => (
    <div>
      <span>Статус загрузки: </span>
      <NetworkErrorMessage {...args} inline />
    </div>
  ),
  args: {
    isLoading: true,
    isError: false,
    inline: true,
  },
};

/**
 * Центрированное отображение
 * Компонент выровнен по центру контейнера
 */
export const Centered: Story = {
  args: {
    isLoading: false,
    isError: true,
    center: true,
  },
};

/**
 * Маленький размер текста
 * Компактный вариант отображения для ограниченного пространства
 */
export const SmallText: Story = {
  args: {
    isLoading: false,
    isError: true,
    textSize: 'sm',
  },
};

/**
 * Интерактивный пример
 * Демонстрирует переход между состояниями загрузки и ошибки
 */
export const InteractiveExample: Story = {
  render: args => <NetworkErrorMessageWithState {...args} />,
  args: {
    isLoading: false,
    isError: true,
  },
};

/**
 * Комбинация состояний
 * Демонстрирует различные комбинации свойств компонента
 */
export const Combined: Story = {
  render: () => (
    <div className='space-y-4'>
      <div className='p-4 border rounded-lg'>
        <h4 className='font-medium mb-2'>Обычная загрузка</h4>
        <NetworkErrorMessage isLoading={true} />
      </div>

      <div className='p-4 border rounded-lg'>
        <h4 className='font-medium mb-2'>Ошибка с возможностью повтора</h4>
        <NetworkErrorMessage isError={true} onRefetch={() => console.log('Refetch')} />
      </div>

      <div className='p-4 border rounded-lg'>
        <h4 className='font-medium mb-2'>Inline загрузка</h4>
        <div>
          Загрузка данных: <NetworkErrorMessage isLoading={true} inline />
        </div>
      </div>
    </div>
  ),
};
