import type { Meta, StoryObj } from '@storybook/react';
import { PostCardSidebar } from '@/components/ui/post-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { WidgetPlanFact } from '@/components/ui/widget-plan-fact';

const meta: Meta<typeof PostCardSidebar> = {
  title: 'Components/UI/PostCard/PostCardSidebar',
  component: PostCardSidebar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Компонент сайдбара карточки поста для вертикального расположения элементов. Используется для отображения дополнительных компонентов (карусель, виджеты и т.д.) в боковой панели.',
      },
    },
  },
  argTypes: {
    children: {
      control: 'object',
      description: 'Дочерние элементы сайдбара (вертикально расположенные компоненты)',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы для корневого элемента',
    },
  },
} satisfies Meta<typeof PostCardSidebar>;

export default meta;
type Story = StoryObj<typeof PostCardSidebar>;

// Пример с Carousel
export const WithCarousel: Story = {
  render: () => {
    const images = [
      'https://picsum.photos/400/300?1',
      'https://picsum.photos/400/300?2',
    ];

    return (
      <PostCardSidebar>
        <Carousel>
          <CarouselContent>
            {images.map((img, i) => (
              <CarouselItem key={i}>
                <img src={img} className='w-full h-[200px] object-cover rounded-md' alt={`Image ${i + 1}`} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious variant='fade-contrast-outlined' />
          <CarouselNext variant='fade-contrast-outlined' />
        </Carousel>
      </PostCardSidebar>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Пример сайдбара с каруселью изображений.',
      },
    },
  },
};

// Пример с WidgetPlanFact
export const WithWidgetPlanFact: Story = {
  render: () => (
    <PostCardSidebar>
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
  ),
  parameters: {
    docs: {
      description: {
        story: 'Пример сайдбара с виджетом плана и факта.',
      },
    },
  },
};

// Пример с Carousel и WidgetPlanFact
export const WithCarouselAndWidget: Story = {
  render: () => {
    const images = [
      'https://picsum.photos/400/300?1',
      'https://picsum.photos/400/300?2',
    ];

    return (
      <PostCardSidebar>
        <Carousel>
          <CarouselContent>
            {images.map((img, i) => (
              <CarouselItem key={i}>
                <img src={img} className='w-full h-[200px] object-cover rounded-md' alt={`Image ${i + 1}`} />
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
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Пример сайдбара с каруселью изображений и виджетом плана и факта.',
      },
    },
  },
};

// Пустой сайдбар
export const Empty: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Пустой сайдбар без содержимого.',
      },
    },
  },
};
