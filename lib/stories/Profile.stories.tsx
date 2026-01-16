// Profile.stories.tsx
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { Profile } from '@/components/ui/profile';

const meta: Meta<typeof Profile> = {
  title: 'Components/UI/Profile',
  component: Profile,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Компонент для отображения профиля пользователя с аватаром, именем, email и ролью. Соответствует дизайну из Figma.',
      },
    },
    layout: 'padded',
  },
  argTypes: {
    avatarUrl: {
      control: 'text',
      description: 'URL изображения аватара',
    },
    avatarAlt: {
      control: 'text',
      description: 'Альтернативный текст для аватара',
    },
    name: {
      control: 'text',
      description: 'Имя пользователя',
    },
    email: {
      control: 'text',
      description: 'Email адрес пользователя',
    },
    role: {
      control: 'text',
      description: 'Роль пользователя',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы',
    },
  },
} satisfies Meta<typeof Profile>;

export default meta;
type Story = StoryObj<typeof Profile>;

// Базовый профиль (как в макете)
export const Default: Story = {
  args: {
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
    name: 'Семенова А.И.',
    email: 'a.semenova@mail.ru',
    role: 'Автор',
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый профиль пользователя с аватаром, именем, email и ролью, как в макете Figma.',
      },
    },
  },
};

// Профиль только с именем
export const NameOnly: Story = {
  args: {
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    name: 'Иванов И.И.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Профиль только с именем и аватаром, без email и роли.',
      },
    },
  },
};

// Профиль с именем и email
export const WithEmail: Story = {
  args: {
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
    name: 'Петров П.П.',
    email: 'petrov@example.com',
  },
  parameters: {
    docs: {
      description: {
        story: 'Профиль с именем, аватаром и email, без роли.',
      },
    },
  },
};

// Профиль с именем и ролью
export const WithRole: Story = {
  args: {
    avatarUrl: 'https://i.pravatar.cc/150?img=8',
    name: 'Сидоров С.С.',
    role: 'Редактор',
  },
  parameters: {
    docs: {
      description: {
        story: 'Профиль с именем, аватаром и ролью, без email.',
      },
    },
  },
};

// Профиль без аватара
export const WithoutAvatar: Story = {
  args: {
    name: 'Козлов К.К.',
    email: 'kozlov@example.com',
    role: 'Администратор',
  },
  parameters: {
    docs: {
      description: {
        story: 'Профиль без аватара, только с текстовой информацией.',
      },
    },
  },
};


// Длинное имя
export const LongName: Story = {
  args: {
    avatarUrl: 'https://i.pravatar.cc/150?img=20',
    name: 'Очень Длинное Имя Пользователя С Множеством Слов',
    email: 'longname@example.com',
    role: 'Разработчик',
  },
  parameters: {
    docs: {
      description: {
        story: 'Профиль с очень длинным именем, демонстрирующий адаптивность компонента.',
      },
    },
  },
};

// Длинный email
export const LongEmail: Story = {
  args: {
    avatarUrl: 'https://i.pravatar.cc/150?img=25',
    name: 'Смирнов С.С.',
    email: 'very.long.email.address@very-long-domain-name.example.com',
    role: 'Тестировщик',
  },
  parameters: {
    docs: {
      description: {
        story: 'Профиль с очень длинным email адресом.',
      },
    },
  },
};

// Длинная роль
export const LongRole: Story = {
  args: {
    avatarUrl: 'https://i.pravatar.cc/150?img=30',
    name: 'Волков В.В.',
    email: 'volkov@example.com',
    role: 'Старший разработчик программного обеспечения',
  },
  parameters: {
    docs: {
      description: {
        story: 'Профиль с очень длинной ролью.',
      },
    },
  },
};

// Несколько профилей для сравнения
export const MultipleProfiles: Story = {
  render: () => (
    <div className='flex flex-col gap-4 w-full max-w-md'>
      <Profile
        avatarUrl='https://i.pravatar.cc/150?img=12'
        name='Семенова А.И.'
        email='a.semenova@mail.ru'
        role='Автор'
      />
      <Profile
        avatarUrl='https://i.pravatar.cc/150?img=1'
        name='Иванов И.И.'
        email='ivanov@example.com'
        role='Редактор'
      />
      <Profile
        avatarUrl='https://i.pravatar.cc/150?img=5'
        name='Петров П.П.'
        email='petrov@example.com'
        role='Администратор'
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Несколько профилей для сравнения различных вариантов.',
      },
    },
  },
};

// Профиль с кастомными стилями
export const CustomStyles: Story = {
  args: {
    avatarUrl: 'https://i.pravatar.cc/150?img=8',
    name: 'Сидоров С.С.',
    email: 'sidorov@example.com',
    role: 'Дизайнер',
    className: 'border-2 border-primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Профиль с кастомными CSS-классами для дополнительной стилизации.',
      },
    },
  },
};

// Все варианты использования
export const AllVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-4 w-full max-w-md'>
      <Profile
        avatarUrl='https://i.pravatar.cc/150?img=12'
        name='Семенова А.И.'
        email='a.semenova@mail.ru'
        role='Автор'
      />
      <Profile avatarUrl='https://i.pravatar.cc/150?img=1' name='Иванов И.И.' email='ivanov@example.com' />
      <Profile avatarUrl='https://i.pravatar.cc/150?img=5' name='Петров П.П.' role='Редактор' />
      <Profile name='Козлов К.К.' email='kozlov@example.com' role='Администратор' />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Все варианты использования компонента Profile: полный профиль, только с email, только с ролью, без аватара.',
      },
    },
  },
};
