// Notification.stories.tsx
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { Notification } from '@/components/ui/notification';

const meta: Meta<typeof Notification> = {
  title: 'Components/UI/Notification',
  component: Notification,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Компонент для отображения уведомлений. Поддерживает три варианта (error, success, info) и два размера (sm, default). Кнопка закрытия опциональна и по умолчанию выключена. Содержит только текст без заголовков, как в макете Figma.',
      },
    },
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['error', 'success', 'info'],
      description: 'Вариант уведомления',
    },
    size: {
      control: 'select',
      options: ['sm', 'default'],
      description: 'Размер уведомления',
    },
    showClose: {
      control: 'boolean',
      description: 'Показывать ли кнопку закрытия',
    },
    onClose: {
      action: 'closed',
      description: 'Обработчик закрытия уведомления',
    },
    icon: {
      control: 'object',
      description: 'Кастомная иконка',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы',
    },
  },
} satisfies Meta<typeof Notification>;

export default meta;
type Story = StoryObj<typeof Notification>;

// Базовое уведомление
export const Default: Story = {
  args: {
    variant: 'info',
    size: 'default',
    children: 'Text information',
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовое информационное уведомление стандартного размера.',
      },
    },
  },
};

// Вариант Error
export const Error: Story = {
  args: {
    variant: 'error',
    size: 'default',
    children: 'Text information',
  },
  parameters: {
    docs: {
      description: {
        story: 'Уведомление об ошибке с красной подсветкой.',
      },
    },
  },
};

// Вариант Success
export const Success: Story = {
  args: {
    variant: 'success',
    size: 'default',
    children: 'Text information',
  },
  parameters: {
    docs: {
      description: {
        story: 'Уведомление об успешном выполнении операции с зеленой подсветкой.',
      },
    },
  },
};

// Вариант Info
export const Info: Story = {
  args: {
    variant: 'info',
    size: 'default',
    children: 'Text information',
  },
  parameters: {
    docs: {
      description: {
        story: 'Информационное уведомление с синей подсветкой.',
      },
    },
  },
};

// Маленький размер
export const SmallSize: Story = {
  args: {
    variant: 'success',
    size: 'sm',
    children: 'Text information',
  },
  parameters: {
    docs: {
      description: {
        story: 'Уведомление маленького размера с уменьшенными отступами и текстом.',
      },
    },
  },
};

// Все размеры для сравнения
export const AllSizes: Story = {
  render: () => (
    <div className='flex flex-col gap-4 w-full max-w-md'>
      <Notification variant='info' size='sm'>
        Text information
      </Notification>
      <Notification variant='info' size='default'>
        Text information
      </Notification>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Сравнение всех доступных размеров уведомлений.',
      },
    },
  },
};

// С кнопкой закрытия
export const WithCloseButton: Story = {
  args: {
    variant: 'info',
    size: 'default',
    children: 'Text information',
    showClose: true,
    onClose: action('close-clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Уведомление с кнопкой закрытия. Кнопка закрытия опциональна и по умолчанию выключена.',
      },
    },
  },
};

// Все варианты с кнопкой закрытия
export const AllVariantsWithClose: Story = {
  render: () => (
    <div className='flex flex-col gap-4 w-full max-w-md'>
      <Notification variant='error' size='default' showClose onClose={action('error-closed')}>
        Text information
      </Notification>
      <Notification variant='success' size='default' showClose onClose={action('success-closed')}>
        Text information
      </Notification>
      <Notification variant='info' size='default' showClose onClose={action('info-closed')}>
        Text information
      </Notification>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Все варианты уведомлений с кнопкой закрытия.',
      },
    },
  },
};

// Длинный текст
export const LongContent: Story = {
  args: {
    variant: 'info',
    size: 'default',
    children:
      'Это очень длинный текст уведомления, который может занимать несколько строк и демонстрирует поведение компонента при большом объеме текста. Текст должен быть достаточно длинным, чтобы продемонстрировать, как компонент обрабатывает многострочный контент и адаптируется к различным размерам экрана.',
    showClose: true,
    onClose: action('long-content-closed'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Уведомление с длинным текстом, демонстрирующее адаптивность компонента.',
      },
    },
  },
};

// Кастомная иконка
export const CustomIcon: Story = {
  args: {
    variant: 'info',
    size: 'default',
    children: 'Text information',
    icon: <span className='text-2xl'>🔔</span>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Уведомление с кастомной иконкой вместо иконки по умолчанию.',
      },
    },
  },
};

// Без иконки
export const WithoutIcon: Story = {
  args: {
    variant: 'info',
    size: 'default',
    children: 'Text information',
    icon: null,
  },
  parameters: {
    docs: {
      description: {
        story: 'Уведомление без иконки. Можно скрыть иконку, передав null в проп icon.',
      },
    },
  },
};

// Все варианты и размеры (как в макете)
export const AllVariantsAndSizes: Story = {
  render: () => (
    <div className='flex flex-col gap-4 w-full max-w-md'>
      <Notification variant='success' size='sm'>
        Text information
      </Notification>
      <Notification variant='success' size='default'>
        Text information
      </Notification>
      <Notification variant='error' size='sm'>
        Text information
      </Notification>
      <Notification variant='error' size='default'>
        Text information
      </Notification>
      <Notification variant='info' size='sm'>
        Text information
      </Notification>
      <Notification variant='info' size='default'>
        Text information
      </Notification>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Все комбинации вариантов и размеров уведомлений, как в макете Figma.',
      },
    },
  },
};

// Выравнивание иконок: однострочный vs многострочный текст
export const IconAlignment: Story = {
  render: () => (
    <div className='flex flex-col gap-4 w-full max-w-2xl'>
      <div>
        <h3 className='text-sm font-medium mb-2'>Однострочный текст (иконка визуально по центру)</h3>
        <Notification variant='info' size='default'>
          Короткое информационное сообщение
        </Notification>
      </div>
      <div>
        <h3 className='text-sm font-medium mb-2'>Многострочный текст (иконка выравнивается по первой строке)</h3>
        <Notification variant='info' size='default'>
          При сохранении приёмки заказа будет закрыт. Все операции, ожидающие проверки результата, будут
          автоматически подтверждены. После закрытия, изменения будут недоступны.
        </Notification>
      </div>
      <div>
        <h3 className='text-sm font-medium mb-2'>Очень длинный многострочный текст</h3>
        <Notification variant='success' size='default'>
          Это очень длинный текст уведомления, который занимает несколько строк и демонстрирует, как иконка
          остается выровненной по первой строке текста. Обратите внимание, что иконка не центрируется
          вертикально относительно всего блока, а выравнивается с первой строкой, что улучшает читаемость
          и восприятие информации.
        </Notification>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Демонстрация выравнивания иконки: для однострочного текста иконка визуально центрирована, для многострочного — выравнивается по первой строке.',
      },
    },
  },
};

// Все варианты с разным контентом
export const AllVariantsShowcase: Story = {
  render: () => (
    <div className='flex flex-col gap-4 w-full max-w-2xl'>
      <div>
        <h3 className='text-sm font-medium mb-3'>Размер: default</h3>
        <div className='flex flex-col gap-3'>
          <Notification variant='error' size='default'>
            Ошибка при выполнении операции
          </Notification>
          <Notification variant='success' size='default'>
            Операция выполнена успешно
          </Notification>
          <Notification variant='info' size='default'>
            Информационное сообщение для пользователя
          </Notification>
        </div>
      </div>
      <div>
        <h3 className='text-sm font-medium mb-3'>Размер: sm</h3>
        <div className='flex flex-col gap-3'>
          <Notification variant='error' size='sm'>
            Ошибка при выполнении операции
          </Notification>
          <Notification variant='success' size='sm'>
            Операция выполнена успешно
          </Notification>
          <Notification variant='info' size='sm'>
            Информационное сообщение для пользователя
          </Notification>
        </div>
      </div>
      <div>
        <h3 className='text-sm font-medium mb-3'>С кнопкой закрытия</h3>
        <div className='flex flex-col gap-3'>
          <Notification variant='error' size='default' showClose onClose={action('error-closed')}>
            Ошибка при выполнении операции. Проверьте введенные данные.
          </Notification>
          <Notification variant='success' size='default' showClose onClose={action('success-closed')}>
            Данные успешно сохранены в системе
          </Notification>
          <Notification variant='info' size='default' showClose onClose={action('info-closed')}>
            При сохранении приёмки заказа будет закрыт. Все операции будут подтверждены.
          </Notification>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Полная демонстрация всех вариантов уведомлений с разными размерами и опциями.',
      },
    },
  },
};

// Реальный пример из приложения
export const RealWorldExample: Story = {
  render: () => (
    <div className='flex flex-col gap-4 w-full max-w-2xl'>
      <div>
        <h3 className='text-sm font-medium mb-3'>Модальное окно приемки заказа</h3>
        <Notification variant='info' size='default'>
          При сохранении приёмки заказа будет закрыт. Все операции, ожидающие проверки результата, будут
          автоматически подтверждены. После закрытия, изменения будут недоступны.
        </Notification>
      </div>
      <div>
        <h3 className='text-sm font-medium mb-3'>Уведомления об успехе</h3>
        <div className='flex flex-col gap-3'>
          <Notification variant='success' size='default'>
            Заказ успешно принят
          </Notification>
          <Notification variant='success' size='default'>
            Операция успешно выполнена
          </Notification>
        </div>
      </div>
      <div>
        <h3 className='text-sm font-medium mb-3'>Уведомления об ошибках</h3>
        <div className='flex flex-col gap-3'>
          <Notification variant='error' size='default'>
            Не удалось выполнить операцию
          </Notification>
          <Notification variant='error' size='default'>
            Превышены трудозатраты на исполнителя. Пожалуйста, проверьте данные и попробуйте снова.
          </Notification>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Примеры реальных уведомлений из приложения с типичными сценариями использования.',
      },
    },
  },
};
