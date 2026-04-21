import type { Meta, StoryObj } from '@storybook/react';
import { AddIcon } from '@/assets';
import { Button } from '@/components/ui/button';
import { SecondaryPanelSection } from '@/components/ui/secondary-panel-section';

const meta: Meta<typeof SecondaryPanelSection> = {
  title: 'Components/UI/SecondaryPanelSection',
  component: SecondaryPanelSection,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Секция на вторичном фоне: слот действий, затем пустое состояние с текстом или основной контент.',
      },
    },
    layout: 'padded',
  },
  argTypes: {
    emptyStateText: {
      control: 'text',
      description: 'Текст при отсутствии данных',
    },
    actionsSlot: {
      control: false,
      description: 'Слот для кнопки или панели действий',
    },
    children: {
      control: false,
      description: 'Контент при наличии данных',
    },
    isEmpty: {
      control: 'boolean',
      description: 'Показать пустое состояние вместо children',
    },
  },
} satisfies Meta<typeof SecondaryPanelSection>;

export default meta;
type Story = StoryObj<typeof SecondaryPanelSection>;

export const Empty: Story = {
  args: {
    isEmpty: true,
    emptyStateText: 'Нет записей для отображения',
    actionsSlot: (
      <Button type='button' icon={<AddIcon />}>
        Добавить
      </Button>
    ),
  },
};

export const WithList: Story = {
  args: {
    isEmpty: false,
    emptyStateText: 'Нет записей для отображения',
    actionsSlot: (
      <Button type='button' icon={<AddIcon />}>
        Добавить
      </Button>
    ),
    children: (
      <ul className='flex w-full flex-col gap-3'>
        <li className='rounded-md border border-line-primary bg-background-primary px-4 py-3 text-sm text-foreground-primary'>
          Элемент списка 1
        </li>
        <li className='rounded-md border border-line-primary bg-background-primary px-4 py-3 text-sm text-foreground-primary'>
          Элемент списка 2
        </li>
        <li className='rounded-md border border-line-primary bg-background-primary px-4 py-3 text-sm text-foreground-primary'>
          Элемент списка 3
        </li>
      </ul>
    ),
  },
};

export const EmptyWithoutActions: Story = {
  args: {
    isEmpty: true,
    emptyStateText: 'Данные отсутствуют',
    actionsSlot: undefined,
  },
};
