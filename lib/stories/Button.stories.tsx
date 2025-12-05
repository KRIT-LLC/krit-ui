// Button.stories.tsx
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonProps } from '@/components/ui/button';
import SettingsIcon from '@/assets/settings_outline.svg?react';
import StarIcon from '@/assets/star.svg?react';

// Обертки для иконок с размером 24x24
const StarIcon24 = () => <StarIcon className='w-6 h-6' />;
const SettingsIcon24 = () => <SettingsIcon className='w-6 h-6' />;

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
        'fade-contrast-filled',
        'fade-contrast-outlined',
        'fade-contrast-transparent',
        'theme-filled',
        'warning-filled',
        'nav-item',
        'nav-item-selected',
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
    variant: 'fade-contrast-filled',
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
      'fade-contrast-filled',
      'fade-contrast-outlined',
      'fade-contrast-transparent',
      'theme-filled',
      'warning-filled',
      'nav-item',
      'nav-item-selected',
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
  args: {
    variant: 'fade-contrast-filled',
  },
  render: args => (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-4 flex-wrap'>
        <Button size='xs' variant={args.variant}>
          XS
        </Button>
        <Button size='sm' variant={args.variant}>
          SM
        </Button>
        <Button size='default' variant={args.variant}>
          Default
        </Button>
        <Button size='lg' variant={args.variant}>
          LG
        </Button>
        <Button size='xl' variant={args.variant}>
          XL
        </Button>
        <Button size='xxl' variant={args.variant}>
          XXL
        </Button>
        <Button size='xxxl' variant={args.variant}>
          XXXL
        </Button>
        <Button size='icon' variant={args.variant} icon={<StarIcon24 />} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Все доступные размеры кнопок: xs, sm, default, lg, xl, xxl, xxxl и icon. Вариант можно изменить в контролах.',
      },
    },
  },
};

// Кнопка с иконкой
export const WithIcon: Story = {
  args: {
    children: 'Кнопка с иконкой',
    variant: 'fade-contrast-filled',
    icon: <StarIcon24 />,
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
    variant: 'fade-contrast-filled',
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
    variant: 'fade-contrast-filled',
    icon: <SettingsIcon24 />,
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
    variant: 'fade-contrast-filled',
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
  args: {
    variant: 'fade-contrast-filled',
  },
  render: args => (
    <Button asChild variant={args.variant}>
      <a href='#link'>Кнопка как ссылка</a>
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Использование кнопки как слота для кастомного элемента (в данном случае - ссылки). Вариант можно изменить в контролах.',
      },
    },
  },
};

// Новые варианты из Figma
export const FigmaVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-6 p-4'>
      <div>
        <h3 className='text-sm font-medium mb-2'>Fade Contrast варианты</h3>
        <div className='flex gap-3 items-center'>
          <Button variant='fade-contrast-filled'>Кнопка</Button>
          <Button variant='fade-contrast-outlined'>Кнопка</Button>
          <Button variant='fade-contrast-transparent'>Кнопка</Button>
        </div>
      </div>
      <div>
        <h3 className='text-sm font-medium mb-2'>Theme & Warning</h3>
        <div className='flex gap-3 items-center'>
          <Button variant='theme-filled'>Кнопка</Button>
          <Button variant='warning-filled'>Кнопка</Button>
        </div>
      </div>
      <div>
        <h3 className='text-sm font-medium mb-2'>С состояниями Disabled</h3>
        <div className='flex gap-3 items-center'>
          <Button variant='fade-contrast-filled' disabled>
            Кнопка
          </Button>
          <Button variant='fade-contrast-outlined' disabled>
            Кнопка
          </Button>
          <Button variant='fade-contrast-transparent' disabled>
            Кнопка
          </Button>
          <Button variant='theme-filled' disabled>
            Кнопка
          </Button>
          <Button variant='warning-filled' disabled>
            Кнопка
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Новые варианты кнопок из Figma дизайна (node-id: 13:122). Включает fade-contrast варианты (filled, outlined, transparent), theme-filled и warning-filled.',
      },
    },
  },
};

// Все варианты с иконками
export const VariantsWithIcons: Story = {
  render: () => {
    const variants = [
      'fade-contrast-filled',
      'fade-contrast-outlined',
      'fade-contrast-transparent',
      'theme-filled',
      'warning-filled',
    ] as const;

    return (
      <div className='flex flex-col gap-4'>
        {variants.map(variant => (
          <div key={variant} className='flex gap-3 items-center'>
            <Button variant={variant} icon={<StarIcon24 />}>
              {variant}
            </Button>
            <Button variant={variant} icon={<SettingsIcon24 />} asDropdown>
              {variant} + Dropdown
            </Button>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Все варианты кнопок с иконками и выпадающими меню.',
      },
    },
  },
};

// Навигационные варианты
export const NavigationVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-4 p-4 bg-background-primary rounded-lg'>
      <div>
        <h3 className='text-sm font-medium mb-2'>Навигационные кнопки</h3>
        <div className='flex flex-col gap-2'>
          <Button variant='nav-item'>Обычный пункт меню</Button>
          <Button variant='nav-item-selected'>Выбранный пункт меню</Button>
          <Button variant='nav-item' icon={<StarIcon24 />}>
            Пункт с иконкой
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Варианты кнопок для навигации: nav-item и nav-item-selected.',
      },
    },
  },
};

// Все размеры для каждого варианта
export const AllSizesPerVariant: Story = {
  render: () => {
    const variants = [
      'fade-contrast-filled',
      'fade-contrast-outlined',
      'fade-contrast-transparent',
      'theme-filled',
      'warning-filled',
    ] as const;
    const sizes = ['xs', 'sm', 'default', 'lg', 'xl', 'xxl', 'xxxl'] as const;

    return (
      <div className='flex flex-col gap-6'>
        {variants.map(variant => (
          <div key={variant}>
            <h3 className='text-sm font-medium mb-3 capitalize'>{variant.replace(/-/g, ' ')}</h3>
            <div className='flex items-center gap-3 flex-wrap'>
              {sizes.map(size => (
                <Button key={size} variant={variant} size={size}>
                  {size.toUpperCase()}
                </Button>
              ))}
              <Button variant={variant} size='icon' icon={<StarIcon24 />} />
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Все размеры для каждого варианта кнопок.',
      },
    },
  },
};

// Комбинированный пример
export const CombinedExample: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-2 items-center'>
        <Button variant='fade-contrast-filled' icon={<StarIcon24 />}>
          Основное действие
        </Button>
        <Button variant='fade-contrast-outlined'>Второстепенное</Button>
        <Button variant='fade-contrast-transparent'>Прозрачная</Button>
      </div>
      <div className='flex gap-2 items-center'>
        <Button variant='fade-contrast-filled' size='sm'>
          Маленькая
        </Button>
        <Button variant='warning-filled'>Предупреждение</Button>
        <Button variant='theme-filled' asDropdown>
          Тематическая
        </Button>
      </div>
      <div className='flex gap-2 items-center'>
        <Button variant='fade-contrast-filled' disabled>
          Неактивная
        </Button>
        <Button asChild variant='fade-contrast-outlined'>
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
