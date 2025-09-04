import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { Banner, ErrorBanner, NoDataBanner, RouteErrorBanner } from '@/components/ui/banner';

const meta: Meta<typeof Banner> = {
  title: 'Components/UI/Banner',
  component: Banner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Универсальный компонент для отображения информационных баннеров',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'secondary'],
    },
    icon: {
      control: 'radio',
      options: ['bill-empty', 'search-empty', 'network-error'],
    },
    onActionClick: { action: 'actionClicked' },
  },
  args: {
    title: 'Нет данных для отображения',
    subtitle: 'Создайте новый документ или загрузите файлы',
    actionText: 'Создать документ',
  },
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Default: Story = {};

export const SecondaryVariant: Story = {
  args: {
    variant: 'secondary',
    icon: 'search-empty',
  },
};

export const WithCustomAction: Story = {
  args: {
    onActionClick: () => console.log('Custom action triggered'),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
  },
};

// Специализированные баннеры
export const NetworkError: StoryObj<typeof ErrorBanner> = {
  render: () => <ErrorBanner onRefetchClick={() => console.log('Refetching data...')} />,
};

export const HardReload: StoryObj<typeof RouteErrorBanner> = {
  render: () => <RouteErrorBanner />,
};

export const EmptyState: StoryObj<typeof NoDataBanner> = {
  render: () => <NoDataBanner>Нет доступных данных</NoDataBanner>,
};
