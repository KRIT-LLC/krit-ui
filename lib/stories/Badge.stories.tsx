// Badge.stories.tsx
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge, BadgeProps } from '@/components/ui/badge';

// Импортируем иконки для демонстрации
const StarIcon = () => <span>⭐</span>;
const CheckIcon = () => <span>✅</span>;
const CloseIcon = () => <span>❌</span>;

const meta: Meta<typeof Badge> = {
  title: 'Components/UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Стилизованный компонент бейджа с поддержкой различных вариантов оформления, размеров и иконок.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'gradient',
        'secondary',
        'secondary-contrast',
        'accent',
        'theme',
        'theme-fade',
        'pale',
        'pale-primary',
        'destructive',
        'destructive-fade',
        'destructive-primary',
        'success',
        'success-fade',
        'success-primary',
        'grey',
        'grey-primary',
        'outline',
        'outline-success',
        'warning',
        'warning-fade',
        'contrast',
      ],
      description: 'Стиль оформления бейджа',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Размер бейджа',
    },
    iconVariant: {
      control: 'select',
      options: ['default', 'secondary', 'black'],
      description: 'Стиль иконки (только для variant="secondary")',
    },
    layout: {
      control: 'select',
      options: ['default', 'truncate'],
      description: 'Распределение внутренних элементов',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы',
    },
    icon: {
      control: 'object',
      description: 'Иконка слева от содержимого',
    },
    iconRight: {
      control: 'object',
      description: 'Иконка справа от содержимого',
    },
    title: {
      control: 'text',
      description: 'Текст тултипа (используется если children не строка)',
    },
    onClick: {
      action: 'clicked',
      description: 'Callback при клике на бейдж',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof Badge>;

// Базовая история
export const Default: Story = {
  args: {
    children: 'Бейдж',
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый бейдж с текстовым содержимым.',
      },
    },
  },
};

// Бейдж с иконкой слева
export const WithLeftIcon: Story = {
  args: {
    children: 'С иконкой',
    variant: 'default',
    icon: <StarIcon />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Бейдж с иконкой слева от текста.',
      },
    },
  },
};

// Бейдж с иконкой справа
export const WithRightIcon: Story = {
  args: {
    children: 'С иконкой',
    variant: 'default',
    iconRight: <CheckIcon />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Бейдж с иконкой справа от текста.',
      },
    },
  },
};

// Бейдж с обеими иконками
export const WithBothIcons: Story = {
  args: {
    children: 'С иконками',
    variant: 'default',
    icon: <StarIcon />,
    iconRight: <CheckIcon />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Бейдж с иконками с обеих сторон текста.',
      },
    },
  },
};

// Все варианты бейджей
export const AllVariants: Story = {
  render: () => {
    const variants = [
      'default',
      'gradient',
      'secondary',
      'secondary-contrast',
      'accent',
      'theme',
      'theme-fade',
      'pale',
      'pale-primary',
      'destructive',
      'destructive-fade',
      'destructive-primary',
      'success',
      'success-fade',
      'success-primary',
      'grey',
      'grey-primary',
      'outline',
      'outline-success',
      'warning',
      'warning-fade',
      'contrast',
    ];

    return (
      <div className='flex flex-col gap-4'>
        {variants.map(variant => (
          <div key={variant} className='flex gap-2 items-center'>
            <span className='w-32 text-sm text-muted-foreground'>{variant}:</span>
            <Badge variant={variant as BadgeProps['variant']}>{variant}</Badge>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Все доступные варианты оформления бейджей.',
      },
    },
  },
};

// Разные размеры
export const Sizes: Story = {
  render: () => (
    <div className='flex gap-2 items-center'>
      <Badge size='sm' variant='default'>
        Маленький
      </Badge>
      <Badge size='default' variant='default'>
        Средний
      </Badge>
      <Badge size='lg' variant='default'>
        Большой
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Бейджи разных размеров: маленький, средний и большой.',
      },
    },
  },
};

// Кликабельный бейдж
export const Clickable: Story = {
  args: {
    children: 'Кликабельный бейдж',
    variant: 'default',
    onClick: action('badgeClicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Бейдж с обработчиком клика. При клике меняет курсор и вызывает callback.',
      },
    },
  },
};

// Бейдж только с иконкой
export const IconOnly: Story = {
  args: {
    icon: <StarIcon />,
    variant: 'default',
    title: 'Только иконка',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Бейдж, содержащий только иконку. Для отображения подсказки используется свойство title.',
      },
    },
  },
};

// Варианты layout
export const Layouts: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-2 items-center'>
        <Badge layout='default' variant='default' icon={<StarIcon />}>
          Default layout
        </Badge>
        <Badge layout='truncate' variant='default' icon={<StarIcon />}>
          Truncate layout with long text that will be truncated
        </Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Бейджи с разными вариантами расположения элементов.',
      },
    },
  },
};

// Варианты иконок для secondary бейджа
export const SecondaryIconVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-2 items-center'>
        <Badge variant='secondary' iconVariant='default' icon={<StarIcon />}>
          Default icon
        </Badge>
        <Badge variant='secondary' iconVariant='secondary' icon={<StarIcon />}>
          Secondary icon
        </Badge>
        <Badge variant='secondary' iconVariant='black' icon={<StarIcon />}>
          Black icon
        </Badge>
      </div>
      <div className='flex gap-2 items-center'>
        <Badge variant='secondary' iconVariant='default' iconRight={<CheckIcon />}>
          Default icon (right)
        </Badge>
        <Badge variant='secondary' iconVariant='secondary' iconRight={<CheckIcon />}>
          Secondary icon (right)
        </Badge>
        <Badge variant='secondary' iconVariant='black' iconRight={<CheckIcon />}>
          Black icon (right)
        </Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Бейджи со secondary вариантом и разными стилями иконок.',
      },
    },
  },
};

// Комбинированный пример
export const CombinedExample: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-2 items-center'>
        <Badge variant='success' icon={<CheckIcon />}>
          Успех
        </Badge>
        <Badge variant='destructive' icon={<CloseIcon />}>
          Ошибка
        </Badge>
        <Badge variant='warning'>Предупреждение</Badge>
      </div>
      <div className='flex gap-2 items-center'>
        <Badge variant='theme' icon={<StarIcon />} iconRight={<CheckIcon />}>
          С двумя иконками
        </Badge>
        <Badge variant='outline' size='lg'>
          Большой контурный
        </Badge>
      </div>
      <div className='flex gap-2 items-center'>
        <Badge variant='pale' layout='truncate' icon={<StarIcon />}>
          Длинный текст, который будет обрезан при truncate layout
        </Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Комбинированный пример различных вариантов использования бейджей.',
      },
    },
  },
};
