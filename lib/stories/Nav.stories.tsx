// Nav.stories.tsx
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';
import { Bell, HelpCircle, Home, Settings, User } from 'lucide-react';
import { Nav, NavItem } from '@/components/ui/nav';

// Mock-компонент для ссылок
const MockLink = ({ to, children, ...props }: { to: string; children: React.ReactNode }) => (
  <a href={to} {...props}>
    {children}
  </a>
);

const meta: Meta<typeof Nav> = {
  title: 'Components/UI/Nav',
  component: Nav,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Навигационный компонент с поддержкой сворачивания, иконок и различных стилей. В свернутом состоянии показывает тултипы с описанием пунктов меню.',
      },
    },
  },
  decorators: [
    Story => (
      <MemoryRouter>
        <div style={{ width: '250px' }}>
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
    items: {
      description: 'Массив элементов навигации',
    },
    itemVariant: {
      description: 'Функция для определения варианта стиля элемента',
    },
    LinkComponent: {
      description: 'Компонент для отображения ссылок',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Nav>;

// Базовые элементы навигации
const baseItems: NavItem[] = [
  { title: 'Dashboard', icon: Home, to: '/dashboard' },
  { title: 'Profile', icon: User, to: '/profile' },
  { title: 'Settings', icon: Settings, to: '/settings' },
];

// Элементы с метками
const itemsWithLabels: NavItem[] = [
  { title: 'Dashboard', icon: Home, to: '/dashboard', label: '12' },
  { title: 'Profile', icon: User, to: '/profile', label: '3' },
  { title: 'Notifications', icon: Bell, to: '/notifications', label: '5' },
];

// Элементы с разными стилями
const itemsWithVariants: NavItem[] = [
  { title: 'Dashboard', icon: Home, to: '/dashboard', variant: 'primary' },
  { title: 'Profile', icon: User, to: '/profile', variant: 'secondary' },
  { title: 'Settings', icon: Settings, to: '/settings', variant: 'ghost' },
  { title: 'Help', icon: HelpCircle, to: '/help', variant: 'secondary-contrast' },
];

/**
 * Базовая навигация в развернутом состоянии
 * Показывает все элементы с иконками и текстом
 */
export const Default: Story = {
  args: {
    isCollapsed: false,
    items: baseItems,
    LinkComponent: MockLink,
  },
};

/**
 * Свернутая навигация
 * Отображает только иконки, текст показывается в тултипах при наведении
 */
export const Collapsed: Story = {
  args: {
    isCollapsed: true,
    items: baseItems,
    LinkComponent: MockLink,
  },
};

/**
 * Навигация с метками элементов
 * Демонстрирует отображение дополнительной информации справа от текста
 */
export const WithLabels: Story = {
  args: {
    isCollapsed: false,
    items: itemsWithLabels,
    LinkComponent: MockLink,
  },
};

/**
 * Навигация с разными стилями элементов
 * Показывает различные варианты оформления кнопок навигации
 */
export const WithVariants: Story = {
  args: {
    isCollapsed: false,
    items: itemsWithVariants,
    LinkComponent: MockLink,
  },
};

/**
 * Навигация с пользовательской функцией определения стиля
 * Демонстрирует кастомную логику определения варианта кнопки
 */
export const WithCustomVariant: Story = {
  args: {
    isCollapsed: false,
    items: baseItems,
    itemVariant: item => (item.title === 'Dashboard' ? 'primary' : 'ghost'),
    LinkComponent: MockLink,
  },
};
