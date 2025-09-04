import React from 'react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';
import { Nav, NavItem } from '@/components/ui/nav';
import { NavPanel, NavPanelProps } from '@/components/ui/nav-panel';

const DashboardIcon = () => <div>📊</div>;
const UsersIcon = () => <div>👥</div>;
const SettingsIcon = () => <div>⚙️</div>;
const ProfileIcon = () => <div>👤</div>;
const LogoutIcon = () => <div>🚪</div>;
const FirstPageIcon = () => <div>◀</div>;
const LastPageIcon = () => <div>▶</div>;

const MockLink = ({ to, children, ...props }: { to: string; children: React.ReactNode }) => (
  <a href={to} {...props}>
    {children}
  </a>
);

const NavPanelWithRouter = (props: NavPanelProps) => {
  const location = useLocation();
  return (
    <div className='max-w-[300px]'>
      <NavPanel {...props} location={location} />
    </div>
  );
};

const meta: Meta<typeof NavPanel> = {
  title: 'Components/UI/NavPanel',
  component: NavPanel,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Навигационная панель с поддержкой сворачивания, группировки пунктов меню и кастомизации через слоты. Интегрирована с react-router для определения активного состояния.',
      },
    },
  },
  decorators: [
    Story => (
      <MemoryRouter initialEntries={['/dashboard']}>
        <div style={{ display: 'flex', height: '100vh' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    isCollapsed: {
      control: 'boolean',
      description: 'Состояние сворачивания навигации',
    },
    navItems: {
      description: 'Список навигационных элементов, сгруппированных по блокам',
    },
    projectName: {
      control: 'text',
      description: 'Название проекта или приложения',
    },
    linkComponent: {
      description: 'Компонент для отображения ссылок (например, NavLink из react-router)',
    },
    profileNavSlot: {
      description: 'Слот для отображения профиля пользователя и управления темой',
    },
    expandableNavSlot: {
      description: 'Слот для управления состоянием панели (сворачивание/разворачивание)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavPanel>;

const baseNavItems: NavItem[][] = [
  [
    { title: 'Dashboard', icon: DashboardIcon, to: '/dashboard' },
    { title: 'Users', icon: UsersIcon, to: '/users' },
  ],
  [{ title: 'Settings', icon: SettingsIcon, to: '/settings' }],
];

const ProfileSlot = ({ isCollapsed }: { isCollapsed: boolean }) => (
  <Nav
    isCollapsed={isCollapsed}
    items={[
      { title: 'Profile', icon: ProfileIcon, to: '/profile', variant: 'ghost' },
      { title: 'Logout', icon: LogoutIcon, onClick: () => console.log('logout'), variant: 'ghost' },
    ]}
    LinkComponent={MockLink}
  />
);

// Слот для управления состоянием панели
const ExpandableSlot = ({
  isCollapsed,
  onToggle,
}: {
  isCollapsed: boolean;
  onToggle: () => void;
}) => (
  <Nav
    isCollapsed={isCollapsed}
    items={[
      {
        title: isCollapsed ? 'Expand' : 'Collapse',
        icon: isCollapsed ? LastPageIcon : FirstPageIcon,
        onClick: onToggle,
        variant: 'ghost',
      },
    ]}
    LinkComponent={MockLink}
  />
);

/**
 * Базовая навигационная панель в развернутом состоянии.
 * Показывает все элементы навигации с иконками и текстом.
 */
export const Default: Story = {
  render: args => {
    const [isCollapsed, setIsCollapsed] = React.useState(args.isCollapsed);

    return (
      <NavPanelWithRouter
        {...args}
        isCollapsed={isCollapsed}
        profileNavSlot={<ProfileSlot isCollapsed={isCollapsed} />}
        expandableNavSlot={
          <ExpandableSlot isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
        }
      />
    );
  },
  args: {
    isCollapsed: false,
    navItems: baseNavItems,
    projectName: 'My Project',
    linkComponent: MockLink,
  },
};

/**
 * Свернутая навигационная панель.
 * Отображает только иконки элементов навигации, что экономит пространство.
 */
export const Collapsed: Story = {
  render: args => {
    const [isCollapsed, setIsCollapsed] = React.useState(args.isCollapsed);

    return (
      <NavPanelWithRouter
        {...args}
        isCollapsed={isCollapsed}
        profileNavSlot={<ProfileSlot isCollapsed={isCollapsed} />}
        expandableNavSlot={
          <ExpandableSlot isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
        }
      />
    );
  },
  args: {
    isCollapsed: true,
    navItems: baseNavItems,
    projectName: 'My Project',
    linkComponent: MockLink,
  },
};

/**
 * Навигационная панель с кастомным названием проекта.
 * Демонстрирует возможность использования React-компонентов в качестве названия.
 */
export const WithCustomProjectName: Story = {
  ...Default,
  args: {
    ...Default.args,
    projectName: (
      <div className='flex items-center gap-2'>
        <span className='text-blue-500'>🚀</span>
        <span>My Awesome App</span>
      </div>
    ),
  },
};
