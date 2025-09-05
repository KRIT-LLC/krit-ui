// Button.stories.tsx
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonProps } from '@/components/ui/button';

// Импортируем иконки для демонстрации (замените на ваши реальные иконки)
const StarIcon = () => <span>⭐</span>;
const SettingsIcon = () => <span>⚙️</span>;

const meta: Meta<typeof Button> = {
  title: 'Components/UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Универсальный компонент кнопки с поддержкой различных стилей, размеров, иконок и состояний.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'primary',
        'accent',
        'pale',
        'pale-primary',
        'destructive',
        'destructive-primary',
        'success',
        'success-primary',
        'grey',
        'grey-primary',
        'secondary',
        'secondary-outline',
        'secondary-contrast',
        'contrast',
        'contrast-fade',
        'outline',
        'ghost',
        'link',
        'purple',
        'light',
      ],
      description: 'Стиль оформления кнопки',
    },
    size: {
      control: 'select',
      options: ['default', 'xs', 'sm', 'lg', 'xl', 'xxl', 'xxxl', 'icon'],
      description: 'Размер кнопки',
    },
    asChild: {
      control: 'boolean',
      description: 'Использование кастомного элемента вместо стандартной кнопки',
    },
    asDropdown: {
      control: 'boolean',
      description: 'Отображение стрелки выпадающего списка',
    },
    icon: {
      control: 'object',
      description: 'Иконка перед текстом кнопки',
    },
    disabled: {
      control: 'boolean',
      description: 'Неактивное состояние кнопки',
    },
    onClick: {
      action: 'clicked',
      description: 'Callback при клике на кнопку',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

// Базовая кнопка
export const Primary: Story = {
  args: {
    children: 'Основная кнопка',
    variant: 'primary',
    onClick: action('clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Основной вариант кнопки для главных действий.',
      },
    },
  },
};

// Все варианты кнопок
export const Variants: Story = {
  render: () => {
    const variants = [
      'default',
      'primary',
      'accent',
      'pale',
      'pale-primary',
      'destructive',
      'destructive-primary',
      'success',
      'success-primary',
      'grey',
      'grey-primary',
      'secondary',
      'secondary-outline',
      'secondary-contrast',
      'contrast',
      'contrast-fade',
      'outline',
      'ghost',
      'link',
      'purple',
      'light',
    ];

    return (
      <div className='flex flex-wrap gap-4'>
        {variants.map(variant => (
          <Button key={variant} variant={variant as ButtonProps['variant']}>
            {variant}
          </Button>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Все доступные варианты оформления кнопок.',
      },
    },
  },
};

// Разные размеры
export const Sizes: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <Button size='sm' variant='primary'>
        Маленькая
      </Button>
      <Button size='lg' variant='primary'>
        Средняя
      </Button>
      <Button size='xxl' variant='primary'>
        Большая
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Кнопки разных размеров: маленькая, средняя и большая.',
      },
    },
  },
};

// Кнопка с иконкой
export const WithIcon: Story = {
  args: {
    children: 'Кнопка с иконкой',
    variant: 'primary',
    icon: <StarIcon />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Кнопка с иконкой перед текстом.',
      },
    },
  },
};

// Кнопка с выпадающим меню
export const Dropdown: Story = {
  args: {
    children: 'Меню',
    variant: 'primary',
    asDropdown: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Кнопка со стрелкой выпадающего меню.',
      },
    },
  },
};

// Кнопка с иконкой и выпадающим меню
export const IconDropdown: Story = {
  args: {
    children: 'Настройки',
    variant: 'primary',
    icon: <SettingsIcon />,
    asDropdown: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Кнопка с иконкой и стрелкой выпадающего меню.',
      },
    },
  },
};

// Неактивная кнопка
export const Disabled: Story = {
  args: {
    children: 'Неактивная кнопка',
    variant: 'primary',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Неактивное состояние кнопки.',
      },
    },
  },
};

// Кнопка как слот
export const AsChild: Story = {
  render: () => (
    <Button asChild variant='primary'>
      <a href='#link'>Кнопка как ссылка</a>
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Использование кнопки как слота для кастомного элемента (в данном случае - ссылки).',
      },
    },
  },
};

// Комбинированный пример
export const CombinedExample: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-2 items-center'>
        <Button variant='primary' icon={<StarIcon />}>
          Основное действие
        </Button>
        <Button variant='secondary'>Второстепенное</Button>
        <Button variant='outline'>Контурная</Button>
      </div>
      <div className='flex gap-2 items-center'>
        <Button variant='ghost' size='sm'>
          Маленькая призрачная
        </Button>
        <Button variant='destructive'>Опасное действие</Button>
        <Button variant='success' asDropdown>
          Успех
        </Button>
      </div>
      <div className='flex gap-2 items-center'>
        <Button variant='primary' disabled>
          Неактивная
        </Button>
        <Button asChild variant='outline'>
          <a href='#link'>Ссылка</a>
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Комбинированный пример различных вариантов использования кнопок.',
      },
    },
  },
};
