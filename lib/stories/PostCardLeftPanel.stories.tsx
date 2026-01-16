import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';
import { PostCardLeftPanel, PostCardLeftPanelItem } from '@/components/ui/post-card';
import { SortComponent, SortOrder } from '@/components/ui/sort-component';
import { TollIcon } from '@/assets';

const meta: Meta<typeof PostCardLeftPanel> = {
  title: 'Components/UI/PostCard/PostCardLeftPanel',
  component: PostCardLeftPanel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Левая панель карточки поста со списком элементов. Используется для отображения списка элементов с поддержкой сортировки и пагинации.',
      },
    },
  },
  argTypes: {
    sortSlot: {
      control: 'object',
      description: 'Слот для сортировки (отображается сверху)',
    },
    children: {
      control: 'object',
      description: 'Дочерние элементы списка (PostCardLeftPanelItem)',
    },
    paginationSlot: {
      control: 'object',
      description: 'Слот для пагинации (отображается снизу)',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы для корневого элемента',
    },
  },
} satisfies Meta<typeof PostCardLeftPanel>;

export default meta;
type Story = StoryObj<typeof PostCardLeftPanel>;

// Базовый пример
export const Default: Story = {
  render: () => (
    <div className='w-[346px] h-[600px]'>
      <PostCardLeftPanel>
        <PostCardLeftPanelItem
          onClick={action('item-1-click')}
          headerSlot={
            <>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 rounded-full bg-background-error' />
                <span className='font-medium'>223-CR</span>
              </div>
              <Badge variant='pale'>Создан</Badge>
            </>
          }
          contentSlot={<div>Ремонт конвейерной ленты</div>}
          footerSlot={
            <>
              <div className='flex items-center gap-2 text-xs text-foreground-secondary'>
                <TollIcon className='w-4 h-4 text-icon-fade-contrast' />
                <span>РМ01—Плановый заказ...</span>
              </div>
              <span className='text-xs text-foreground-secondary'>01.11.2025</span>
            </>
          }
        />
        <PostCardLeftPanelItem
          selected
          onClick={action('item-2-click')}
          headerSlot={
            <>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 rounded-full bg-background-success' />
                <span className='font-medium'>224-CR</span>
              </div>
              <Badge variant='pale'>Создан</Badge>
            </>
          }
          contentSlot={<div>Ремонт конвейерной ленты</div>}
          footerSlot={
            <>
              <div className='flex items-center gap-2 text-xs text-foreground-secondary'>
                <TollIcon className='w-4 h-4 text-icon-fade-contrast' />
                <span>РМ02—Плановый заказ...</span>
              </div>
              <span className='text-xs text-foreground-secondary'>01.11.2025</span>
            </>
          }
        />
        <PostCardLeftPanelItem
          onClick={action('item-3-click')}
          headerSlot={
            <>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 rounded-full bg-background-error' />
                <span className='font-medium'>225-CR</span>
              </div>
              <Badge variant='pale'>Создан</Badge>
            </>
          }
          contentSlot={<div>Ремонт конвейерной ленты</div>}
          footerSlot={
            <>
              <div className='flex items-center gap-2 text-xs text-foreground-secondary'>
                <TollIcon className='w-4 h-4 text-icon-fade-contrast' />
                <span>РМ03—Плановый заказ...</span>
              </div>
              <span className='text-xs text-foreground-secondary'>01.11.2025</span>
            </>
          }
        />
        <PostCardLeftPanelItem
          onClick={action('item-4-click')}
          headerSlot={
            <>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 rounded-full bg-background-warning' />
                <span className='font-medium'>226-CR</span>
              </div>
              <Badge variant='pale'>Создан</Badge>
            </>
          }
          contentSlot={<div>Ремонт конвейерной ленты Ремонт конвейерной ленты</div>}
          footerSlot={
            <>
              <div className='flex items-center gap-2 text-xs text-foreground-secondary'>
                <TollIcon className='w-4 h-4 text-icon-fade-contrast' />
                <span>РМ04—Плановый заказ...</span>
              </div>
              <span className='text-xs text-foreground-secondary'>01.11.2025</span>
            </>
          }
        />
        <PostCardLeftPanelItem
          onClick={action('item-5-click')}
          headerSlot={
            <>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 rounded-full bg-background-error' />
                <span className='font-medium'>227-CR</span>
              </div>
              <Badge variant='pale'>Создан</Badge>
            </>
          }
          contentSlot={<div>Ремонт конвейерной ленты</div>}
          footerSlot={
            <>
              <div className='flex items-center gap-2 text-xs text-foreground-secondary'>
                <TollIcon className='w-4 h-4 text-icon-fade-contrast' />
                <span>РМ05—Плановый заказ...</span>
              </div>
              <span className='text-xs text-foreground-secondary'>01.11.2025</span>
            </>
          }
        />
      </PostCardLeftPanel>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример левой панели со списком элементов.',
      },
    },
  },
};

// С компонентом сортировки
export const WithSortComponent: Story = {
  render: () => (
    <div className='w-[346px] h-[600px]'>
      <PostCardLeftPanel
        sortSlot={
          <SortComponent
            sortOrder={SortOrder.DESC}
            sortField='date'
            options={[
              { label: 'Дата создания', value: 'date' },
              { label: 'Название', value: 'name' },
              { label: 'Статус', value: 'status' },
            ]}
            onOrderToggle={action('sort-order-toggle')}
            onFieldChange={action('sort-field-change')}
          />
        }
      >
        <PostCardLeftPanelItem
          onClick={action('item-1-click')}
          headerSlot={
            <>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 rounded-full bg-background-error' />
                <span className='font-medium'>223-CR</span>
              </div>
              <Badge variant='pale'>Создан</Badge>
            </>
          }
          contentSlot={<div>Ремонт конвейерной ленты</div>}
          footerSlot={
            <>
              <div className='flex items-center gap-2 text-xs text-foreground-secondary'>
                <TollIcon className='w-4 h-4 text-icon-fade-contrast' />
                <span>РМ01—Плановый заказ...</span>
              </div>
              <span className='text-xs text-foreground-secondary'>01.11.2025</span>
            </>
          }
        />
        <PostCardLeftPanelItem
          selected
          onClick={action('item-2-click')}
          headerSlot={
            <>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 rounded-full bg-background-success' />
                <span className='font-medium'>224-CR</span>
              </div>
              <Badge variant='pale'>Создан</Badge>
            </>
          }
          contentSlot={<div>Ремонт конвейерной ленты</div>}
          footerSlot={
            <>
              <div className='flex items-center gap-2 text-xs text-foreground-secondary'>
                <TollIcon className='w-4 h-4 text-icon-fade-contrast' />
                <span>РМ02—Плановый заказ...</span>
              </div>
              <span className='text-xs text-foreground-secondary'>01.11.2025</span>
            </>
          }
        />
        <PostCardLeftPanelItem
          onClick={action('item-3-click')}
          headerSlot={
            <>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 rounded-full bg-background-error' />
                <span className='font-medium'>225-CR</span>
              </div>
              <Badge variant='pale'>Создан</Badge>
            </>
          }
          contentSlot={<div>Ремонт конвейерной ленты</div>}
          footerSlot={
            <>
              <div className='flex items-center gap-2 text-xs text-foreground-secondary'>
                <TollIcon className='w-4 h-4 text-icon-fade-contrast' />
                <span>РМ03—Плановый заказ...</span>
              </div>
              <span className='text-xs text-foreground-secondary'>01.11.2025</span>
            </>
          }
        />
        <PostCardLeftPanelItem
          onClick={action('item-4-click')}
          headerSlot={
            <>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 rounded-full bg-background-warning' />
                <span className='font-medium'>226-CR</span>
              </div>
              <Badge variant='pale'>Создан</Badge>
            </>
          }
          contentSlot={<div>Ремонт конвейерной ленты Ремонт конвейерной ленты</div>}
          footerSlot={
            <>
              <div className='flex items-center gap-2 text-xs text-foreground-secondary'>
                <TollIcon className='w-4 h-4 text-icon-fade-contrast' />
                <span>РМ04—Плановый заказ...</span>
              </div>
              <span className='text-xs text-foreground-secondary'>01.11.2025</span>
            </>
          }
        />
        <PostCardLeftPanelItem
          onClick={action('item-5-click')}
          headerSlot={
            <>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 rounded-full bg-background-error' />
                <span className='font-medium'>227-CR</span>
              </div>
              <Badge variant='pale'>Создан</Badge>
            </>
          }
          contentSlot={<div>Ремонт конвейерной ленты</div>}
          footerSlot={
            <>
              <div className='flex items-center gap-2 text-xs text-foreground-secondary'>
                <TollIcon className='w-4 h-4 text-icon-fade-contrast' />
                <span>РМ05—Плановый заказ...</span>
              </div>
              <span className='text-xs text-foreground-secondary'>01.11.2025</span>
            </>
          }
        />
      </PostCardLeftPanel>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Левая панель с компонентом сортировки в заголовке.',
      },
    },
  },
};

// С пагинацией
export const WithPagination: Story = {
  render: () => (
    <div className='w-[346px] h-[600px]'>
      <PostCardLeftPanel
        paginationSlot={
          <Pagination
            pageSize={50}
            pageCount={10}
            pageIndex={0}
            canPreviousPage={false}
            canNextPage={true}
            totalCount={500}
            previousPage={action('previous-page')}
            nextPage={action('next-page')}
            setPageSize={action('set-page-size')}
            setPageIndex={action('set-page-index')}
            compact={true}
          />
        }
      >
        <PostCardLeftPanelItem
          onClick={action('item-1-click')}
          headerSlot={
            <>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 rounded-full bg-background-error' />
                <span className='font-medium'>223-CR</span>
              </div>
              <Badge variant='pale'>Создан</Badge>
            </>
          }
          contentSlot={<div>Ремонт конвейерной ленты</div>}
          footerSlot={
            <>
              <div className='flex items-center gap-2 text-xs text-foreground-secondary'>
                <TollIcon className='w-4 h-4 text-icon-fade-contrast' />
                <span>РМ01—Плановый заказ...</span>
              </div>
              <span className='text-xs text-foreground-secondary'>01.11.2025</span>
            </>
          }
        />
        <PostCardLeftPanelItem
          selected
          onClick={action('item-2-click')}
          headerSlot={
            <>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 rounded-full bg-background-success' />
                <span className='font-medium'>224-CR</span>
              </div>
              <Badge variant='pale'>Создан</Badge>
            </>
          }
          contentSlot={<div>Ремонт конвейерной ленты</div>}
          footerSlot={
            <>
              <div className='flex items-center gap-2 text-xs text-foreground-secondary'>
                <TollIcon className='w-4 h-4 text-icon-fade-contrast' />
                <span>РМ02—Плановый заказ...</span>
              </div>
              <span className='text-xs text-foreground-secondary'>01.11.2025</span>
            </>
          }
        />
        <PostCardLeftPanelItem
          onClick={action('item-3-click')}
          headerSlot={
            <>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 rounded-full bg-background-error' />
                <span className='font-medium'>225-CR</span>
              </div>
              <Badge variant='pale'>Создан</Badge>
            </>
          }
          contentSlot={<div>Ремонт конвейерной ленты</div>}
          footerSlot={
            <>
              <div className='flex items-center gap-2 text-xs text-foreground-secondary'>
                <TollIcon className='w-4 h-4 text-icon-fade-contrast' />
                <span>РМ03—Плановый заказ...</span>
              </div>
              <span className='text-xs text-foreground-secondary'>01.11.2025</span>
            </>
          }
        />
        <PostCardLeftPanelItem
          onClick={action('item-4-click')}
          headerSlot={
            <>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 rounded-full bg-background-warning' />
                <span className='font-medium'>226-CR</span>
              </div>
              <Badge variant='pale'>Создан</Badge>
            </>
          }
          contentSlot={<div>Ремонт конвейерной ленты Ремонт конвейерной ленты</div>}
          footerSlot={
            <>
              <div className='flex items-center gap-2 text-xs text-foreground-secondary'>
                <TollIcon className='w-4 h-4 text-icon-fade-contrast' />
                <span>РМ04—Плановый заказ...</span>
              </div>
              <span className='text-xs text-foreground-secondary'>01.11.2025</span>
            </>
          }
        />
        <PostCardLeftPanelItem
          onClick={action('item-5-click')}
          headerSlot={
            <>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 rounded-full bg-background-error' />
                <span className='font-medium'>227-CR</span>
              </div>
              <Badge variant='pale'>Создан</Badge>
            </>
          }
          contentSlot={<div>Ремонт конвейерной ленты</div>}
          footerSlot={
            <>
              <div className='flex items-center gap-2 text-xs text-foreground-secondary'>
                <TollIcon className='w-4 h-4 text-icon-fade-contrast' />
                <span>РМ05—Плановый заказ...</span>
              </div>
              <span className='text-xs text-foreground-secondary'>01.11.2025</span>
            </>
          }
        />
      </PostCardLeftPanel>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Левая панель с пагинацией внизу.',
      },
    },
  },
};

// С сортировкой и пагинацией
export const WithSortAndPagination: Story = {
  render: () => (
    <div className='w-[346px] h-[600px]'>
      <PostCardLeftPanel
        sortSlot={
          <SortComponent
            sortOrder={SortOrder.DESC}
            sortField='date'
            options={[
              { label: 'Дата создания', value: 'date' },
              { label: 'Название', value: 'name' },
              { label: 'Статус', value: 'status' },
            ]}
            onOrderToggle={action('sort-order-toggle')}
            onFieldChange={action('sort-field-change')}
          />
        }
        paginationSlot={
          <Pagination
            pageSize={50}
            pageCount={10}
            pageIndex={0}
            canPreviousPage={false}
            canNextPage={true}
            totalCount={500}
            previousPage={action('previous-page')}
            nextPage={action('next-page')}
            setPageSize={action('set-page-size')}
            setPageIndex={action('set-page-index')}
            compact={true}
          />
        }
      >
        <PostCardLeftPanelItem
          onClick={action('item-1-click')}
          headerSlot={
            <>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 rounded-full bg-background-error' />
                <span className='font-medium'>223-CR</span>
              </div>
              <Badge variant='pale'>Создан</Badge>
            </>
          }
          contentSlot={<div>Ремонт конвейерной ленты</div>}
          footerSlot={
            <>
              <div className='flex items-center gap-2 text-xs text-foreground-secondary'>
                <TollIcon className='w-4 h-4 text-icon-fade-contrast' />
                <span>РМ01—Плановый заказ...</span>
              </div>
              <span className='text-xs text-foreground-secondary'>01.11.2025</span>
            </>
          }
        />
        <PostCardLeftPanelItem
          selected
          onClick={action('item-2-click')}
          headerSlot={
            <>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 rounded-full bg-background-success' />
                <span className='font-medium'>224-CR</span>
              </div>
              <Badge variant='pale'>Создан</Badge>
            </>
          }
          contentSlot={<div>Ремонт конвейерной ленты</div>}
          footerSlot={
            <>
              <div className='flex items-center gap-2 text-xs text-foreground-secondary'>
                <TollIcon className='w-4 h-4 text-icon-fade-contrast' />
                <span>РМ02—Плановый заказ...</span>
              </div>
              <span className='text-xs text-foreground-secondary'>01.11.2025</span>
            </>
          }
        />
        <PostCardLeftPanelItem
          onClick={action('item-3-click')}
          headerSlot={
            <>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 rounded-full bg-background-error' />
                <span className='font-medium'>225-CR</span>
              </div>
              <Badge variant='pale'>Создан</Badge>
            </>
          }
          contentSlot={<div>Ремонт конвейерной ленты</div>}
          footerSlot={
            <>
              <div className='flex items-center gap-2 text-xs text-foreground-secondary'>
                <TollIcon className='w-4 h-4 text-icon-fade-contrast' />
                <span>РМ03—Плановый заказ...</span>
              </div>
              <span className='text-xs text-foreground-secondary'>01.11.2025</span>
            </>
          }
        />
        <PostCardLeftPanelItem
          onClick={action('item-4-click')}
          headerSlot={
            <>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 rounded-full bg-background-warning' />
                <span className='font-medium'>226-CR</span>
              </div>
              <Badge variant='pale'>Создан</Badge>
            </>
          }
          contentSlot={<div>Ремонт конвейерной ленты Ремонт конвейерной ленты</div>}
          footerSlot={
            <>
              <div className='flex items-center gap-2 text-xs text-foreground-secondary'>
                <TollIcon className='w-4 h-4 text-icon-fade-contrast' />
                <span>РМ04—Плановый заказ...</span>
              </div>
              <span className='text-xs text-foreground-secondary'>01.11.2025</span>
            </>
          }
        />
        <PostCardLeftPanelItem
          onClick={action('item-5-click')}
          headerSlot={
            <>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 rounded-full bg-background-error' />
                <span className='font-medium'>227-CR</span>
              </div>
              <Badge variant='pale'>Создан</Badge>
            </>
          }
          contentSlot={<div>Ремонт конвейерной ленты</div>}
          footerSlot={
            <>
              <div className='flex items-center gap-2 text-xs text-foreground-secondary'>
                <TollIcon className='w-4 h-4 text-icon-fade-contrast' />
                <span>РМ05—Плановый заказ...</span>
              </div>
              <span className='text-xs text-foreground-secondary'>01.11.2025</span>
            </>
          }
        />
        <PostCardLeftPanelItem
          onClick={action('item-6-click')}
          headerSlot={
            <>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 rounded-full bg-background-error' />
                <span className='font-medium'>228-CR</span>
              </div>
              <Badge variant='pale'>Создан</Badge>
            </>
          }
          contentSlot={<div>Ремонт конвейерной ленты</div>}
          footerSlot={
            <>
              <div className='flex items-center gap-2 text-xs text-foreground-secondary'>
                <TollIcon className='w-4 h-4 text-icon-fade-contrast' />
                <span>РМ06—Плановый заказ...</span>
              </div>
              <span className='text-xs text-foreground-secondary'>01.11.2025</span>
            </>
          }
        />
      </PostCardLeftPanel>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Левая панель с компонентом сортировки и пагинацией.',
      },
    },
  },
};
