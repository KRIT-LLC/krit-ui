import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  PostCard,
  PostCardBody,
  PostCardHeader,
  PostCardSidebar,
  PostCardLeftPanel,
  PostCardLeftPanelItem,
} from '@/components/ui/post-card';
import { WidgetPlanFact } from '@/components/ui/widget-plan-fact';
import { SortComponent, SortOrder } from '@/components/ui/sort-component';
import { Pagination } from '@/components/ui/pagination';
import { TollIcon } from '@/assets';
import EditIcon from '@/assets/edit_outline.svg?react';

const meta: Meta<typeof PostCard> = {
  title: 'Components/UI/PostCard',
  component: PostCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Обертка карточки поста с поддержкой левой панели, заголовка, основного контента и сайдбара. Используется для отображения структурированной информации в виде карточки.',
      },
    },
  },
  argTypes: {
    leftPanelSlot: {
      control: 'object',
      description: 'Слот для левой панели (отображается слева, высота равна headerSlot + bodySlot/sidebarSlot)',
    },
    headerSlot: {
      control: 'object',
      description: 'Слот для заголовка карточки (отображается сверху на всю ширину)',
    },
    bodySlot: {
      control: 'object',
      description: 'Слот для основного контента карточки (отображается слева)',
    },
    sidebarSlot: {
      control: 'object',
      description: 'Слот для сайдбара карточки (отображается справа, фиксированная ширина 340px)',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы для корневого элемента',
    },
  },
} satisfies Meta<typeof PostCard>;

export default meta;
type Story = StoryObj<typeof PostCard>;

// Полный пример
export const FullExample: Story = {
  render: () => {
    const images = ['https://picsum.photos/400/300?1', 'https://picsum.photos/400/300?2'];

    return (
      <PostCard
        leftPanelSlot={
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
              onClick={action('left-item-1-click')}
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
              onClick={action('left-item-2-click')}
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
              onClick={action('left-item-3-click')}
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
              onClick={action('left-item-4-click')}
              headerSlot={
                <>
                  <div className='flex items-center gap-2'>
                    <div className='w-2 h-2 rounded-full bg-background-warning' />
                    <span className='font-medium'>226-CR</span>
                  </div>
                  <Badge variant='pale'>Создан</Badge>
                </>
              }
              contentSlot={<div>Ремонт конвейерной ленты</div>}
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
              onClick={action('left-item-5-click')}
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
        }
        headerSlot={
          <PostCardHeader
            titlePrefix='223-CR'
            titleText='Title'
            onBack={action('back')}
            buttonsSlot={
              <>
                <Button variant='theme-filled'>Кнопка</Button>
                <Button variant='fade-contrast-filled' size='icon' onClick={action('edit-click')}>
                  <EditIcon className='w-6 h-6' />
                </Button>
              </>
            }
            dropDownButtons={[
              { text: 'Редактировать', onClick: action('edit') },
              { text: 'Удалить', onClick: action('delete') },
            ]}
          />
        }
        bodySlot={
          <PostCardBody
            sections={[
              {
                fields: [
                  { label: 'Статус', value: 'Выполнен' },
                  { label: 'Приоритет', value: 'Неотложный' },
                  { label: 'Название', value: 'Ремонт конвейерной ленты' },
                  { label: 'Вид заказа', value: 'Заказ' },
                  { label: 'Вид работ', value: 'Работы' },
                  { label: 'Дата создания', value: '01.11.2025' },
                ],
              },
              {
                fields: [
                  { label: 'Завод', value: 'Завод 1' },
                  { label: 'Участок', value: 'Участок 1' },
                  { label: 'Группа плановиков', value: 'Группа 1' },
                  { label: 'Техническое место', value: 'Место 1' },
                  { label: 'Оборудование', value: 'Оборудование 1' },
                ],
              },
              {
                fields: [
                  {
                    label: 'Описание',
                    value:
                      'Длинное описание работ, которое может занимать несколько строк и содержать подробную информацию о выполняемых операциях.',
                  },
                ],
              },
            ]}
          />
        }
        sidebarSlot={
          <PostCardSidebar>
            <Carousel>
              <CarouselContent>
                {images.map((img, i) => (
                  <CarouselItem key={i}>
                    <img
                      src={img}
                      className='w-full h-[200px] object-cover rounded-md'
                      alt={`Image ${i + 1}`}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious variant='fade-contrast-outlined' />
              <CarouselNext variant='fade-contrast-outlined' />
            </Carousel>
            <WidgetPlanFact
              orientation='vertical'
              rows={[
                {
                  planLabel: 'План начала',
                  planValue: '01.11.2025 10:00',
                  factLabel: 'Факт начала',
                  factDateTime: '01.12.2025 10:00',
                  delta: 'Расхождение 30д : 2ч : 30мин',
                },
                {
                  planLabel: 'План окончания',
                  planValue: '14.11.2025 10:00',
                  factLabel: 'Факт окончания',
                  factDateTime: '14.12.2025 10:00',
                  delta: 'Расхождение 30д : 0ч : 0мин',
                },
                {
                  planLabel: 'План продол-ти',
                  planValue: '14д : 24ч : 20мин',
                  factLabel: 'Факт продол-ти',
                  factDuration: '23д : 24ч : 20мин',
                  delta: 'Расхождение 9д : 0ч : 0мин',
                },
              ]}
            />
          </PostCardSidebar>
        }
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Полный пример карточки с левой панелью, заголовком, основным контентом и сайдбаром.',
      },
    },
  },
};

// Только заголовок
export const HeaderOnly: Story = {
  render: () => (
    <PostCard
      headerSlot={
        <PostCardHeader
          titlePrefix='223-CR'
          titleText='Title'
          buttonsSlot={<Button variant='theme-filled'>Кнопка</Button>}
        />
      }
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Карточка только с заголовком.',
      },
    },
  },
};

// Заголовок с кнопкой "Назад"
export const HeaderWithBack: Story = {
  render: () => (
    <PostCard
      headerSlot={
        <PostCardHeader
          titlePrefix='223-CR'
          titleText='Title'
          onBack={action('back')}
          buttonsSlot={<Button variant='theme-filled'>Кнопка</Button>}
          dropDownButtons={[
            { text: 'Редактировать', onClick: action('edit') },
            { text: 'Удалить', onClick: action('delete') },
          ]}
        />
      }
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Карточка с заголовком и кнопкой "Назад".',
      },
    },
  },
};

// Только основной контент
export const BodyOnly: Story = {
  render: () => (
    <PostCard
      bodySlot={
        <PostCardBody
          sections={[
            {
              fields: [
                { label: 'Статус', value: 'Выполнен' },
                { label: 'Приоритет', value: 'Неотложный' },
                { label: 'Название', value: 'Ремонт конвейерной ленты' },
              ],
            },
          ]}
        />
      }
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Карточка только с основным контентом.',
      },
    },
  },
};

// Только сайдбар
export const SidebarOnly: Story = {
  render: () => {
    const images = ['https://picsum.photos/400/300?1'];

    return (
      <PostCard
        sidebarSlot={
          <PostCardSidebar>
            <Carousel>
              <CarouselContent>
                {images.map((img, i) => (
                  <CarouselItem key={i}>
                    <img
                      src={img}
                      className='w-full h-[200px] object-cover rounded-md'
                      alt={`Image ${i + 1}`}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious variant='fade-contrast-outlined' />
              <CarouselNext variant='fade-contrast-outlined' />
            </Carousel>
          </PostCardSidebar>
        }
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Карточка только с сайдбаром.',
      },
    },
  },
};

// Заголовок и основной контент
export const HeaderAndBody: Story = {
  render: () => (
    <PostCard
      headerSlot={
        <PostCardHeader
          titlePrefix='223-CR'
          titleText='Title'
          onBack={action('back')}
          buttonsSlot={<Button variant='theme-filled'>Кнопка</Button>}
        />
      }
      bodySlot={
        <PostCardBody
          sections={[
            {
              fields: [
                { label: 'Статус', value: 'Выполнен' },
                { label: 'Приоритет', value: 'Неотложный' },
                { label: 'Название', value: 'Ремонт конвейерной ленты' },
              ],
            },
          ]}
        />
      }
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Карточка с заголовком и основным контентом.',
      },
    },
  },
};

// Заголовок и сайдбар
export const HeaderAndSidebar: Story = {
  render: () => {
    const images = ['https://picsum.photos/400/300?1'];

    return (
      <PostCard
        headerSlot={
          <PostCardHeader titlePrefix='223-CR' titleText='Title' onBack={action('back')} />
        }
        sidebarSlot={
          <PostCardSidebar>
            <Carousel>
              <CarouselContent>
                {images.map((img, i) => (
                  <CarouselItem key={i}>
                    <img
                      src={img}
                      className='w-full h-[200px] object-cover rounded-md'
                      alt={`Image ${i + 1}`}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious variant='fade-contrast-outlined' />
              <CarouselNext variant='fade-contrast-outlined' />
            </Carousel>
          </PostCardSidebar>
        }
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Карточка с заголовком и сайдбаром.',
      },
    },
  },
};

// Основной контент и сайдбар
export const BodyAndSidebar: Story = {
  render: () => {
    const images = ['https://picsum.photos/400/300?1'];

    return (
      <PostCard
        bodySlot={
          <PostCardBody
            sections={[
              {
                fields: [
                  { label: 'Статус', value: 'Выполнен' },
                  { label: 'Приоритет', value: 'Неотложный' },
                ],
              },
            ]}
          />
        }
        sidebarSlot={
          <PostCardSidebar>
            <Carousel>
              <CarouselContent>
                {images.map((img, i) => (
                  <CarouselItem key={i}>
                    <img
                      src={img}
                      className='w-full h-[200px] object-cover rounded-md'
                      alt={`Image ${i + 1}`}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious variant='fade-contrast-outlined' />
              <CarouselNext variant='fade-contrast-outlined' />
            </Carousel>
          </PostCardSidebar>
        }
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Карточка с основным контентом и сайдбаром.',
      },
    },
  },
};
