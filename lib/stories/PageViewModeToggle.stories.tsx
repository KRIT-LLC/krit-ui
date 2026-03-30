import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import {
  PAGE_VIEW_TAB,
  PageViewModeToggle,
} from '@/components/ui/page-view-mode-toggle';
import { Tabs, TabsContent } from '@/components/ui/tabs';

const meta: Meta<typeof PageViewModeToggle> = {
  title: 'Components/UI/PageViewModeToggle',
  component: PageViewModeToggle,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Две икон-кнопки переключения вида «список с боковой панелью» и «таблица». Значения вкладок задаются константой `PAGE_VIEW_TAB`. Размещается внутри родительского `Tabs`; подписи доступности берутся из ThemeProvider (`listView`, `tableView`) либо задаются пропсами.',
      },
    },
    layout: 'padded',
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Дополнительные классы для TabsList',
    },
    listAriaLabel: {
      control: 'text',
      description: 'aria-label для кнопки вида списка',
    },
    tableAriaLabel: {
      control: 'text',
      description: 'aria-label для кнопки вида таблицы',
    },
  },
} satisfies Meta<typeof PageViewModeToggle>;

export default meta;
type Story = StoryObj<typeof PageViewModeToggle>;

const ControlledToggleDemo = () => {
  const [value, setValue] = useState<string>(PAGE_VIEW_TAB.LIST);

  return (
    <Tabs value={value} onValueChange={setValue} className='w-full max-w-md'>
      <PageViewModeToggle />
      <TabsContent value={PAGE_VIEW_TAB.LIST} className='mt-4 rounded-md border border-line-primary p-4'>
        Контент режима списка (`PAGE_VIEW_TAB.LIST`)
      </TabsContent>
      <TabsContent value={PAGE_VIEW_TAB.TABLE} className='mt-4 rounded-md border border-line-primary p-4'>
        Контент режима таблицы (`PAGE_VIEW_TAB.TABLE`)
      </TabsContent>
    </Tabs>
  );
};

export const Default: Story = {
  render: () => <ControlledToggleDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Переключатель внутри контролируемого `Tabs` с двумя панелями контента.',
      },
    },
  },
};

export const WithCustomAriaLabels: Story = {
  render: () => {
    const [value, setValue] = useState<string>(PAGE_VIEW_TAB.LIST);

    return (
      <Tabs value={value} onValueChange={setValue} className='w-full max-w-md'>
        <PageViewModeToggle
          listAriaLabel='Показать список и карточку'
          tableAriaLabel='Показать таблицу'
        />
        <TabsContent value={PAGE_VIEW_TAB.LIST} className='mt-4 rounded-md border border-line-primary p-4'>
          Список
        </TabsContent>
        <TabsContent value={PAGE_VIEW_TAB.TABLE} className='mt-4 rounded-md border border-line-primary p-4'>
          Таблица
        </TabsContent>
      </Tabs>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Явные `aria-label` вместо строк из ThemeProvider.',
      },
    },
  },
};
