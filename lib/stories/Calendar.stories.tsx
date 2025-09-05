// lib/components/ui/calendar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { addDays } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Components/UI/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Календарь для выбора дат с настраиваемыми стилями и элементами управления',
      },
    },
  },
  argTypes: {
    mode: {
      control: 'radio',
      options: ['default', 'single', 'multiple', 'range'],
    },
    showOutsideDays: {
      control: 'boolean',
    },
    locale: {
      control: 'object',
    },
  },
  args: {
    className: 'border rounded-lg',
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {};

export const RangeSelection: Story = {
  args: {
    mode: 'range',
    selected: {
      from: new Date(),
      to: addDays(new Date(), 7),
    },
  },
};

export const Localized: Story = {
  args: {
    locale: ru,
    weekStartsOn: 1,
    captionLayout: 'dropdown-buttons',
    fromYear: 2010,
    toYear: 2025,
  },
};

export const MultipleMonths: Story = {
  args: {
    numberOfMonths: 2,
    className: 'p-8',
  },
};

export const DisabledDays: Story = {
  args: {
    disabled: [
      new Date(2024, 3, 15),
      { from: addDays(new Date(), 5), to: addDays(new Date(), 10) },
    ],
  },
};
