import type { Meta, StoryObj } from '@storybook/react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  GalleryImages,
} from '@/components/ui/carousel';

const meta: Meta<typeof Carousel> = {
  title: 'Components/UI/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Интерактивная карусель с поддержкой жестов, миниатюр и клавиатурной навигации',
      },
    },
  },
  decorators: [
    Story => (
      <div className='max-w-3xl p-8 bg-background-primary rounded-xl'>
        <Story />
      </div>
    ),
  ],
};

export default meta;

const images = [
  'https://picsum.photos/600/400?1',
  'https://picsum.photos/600/400?2',
  'https://picsum.photos/600/400?3',
];

export const HorizontalCarousel: StoryObj<typeof Carousel> = {
  render: () => (
    <Carousel>
      <CarouselContent>
        {images.map((img, i) => (
          <CarouselItem key={i}>
            <img src={img} className='w-full h-64 object-cover rounded-md' />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious variant='secondary-outline' />
      <CarouselNext variant='secondary-outline' />
    </Carousel>
  ),
};

export const VerticalCarousel: StoryObj<typeof Carousel> = {
  args: {
    orientation: 'vertical',
    className: 'max-h-[500px]',
  },
  render: args => (
    <Carousel {...args}>
      <CarouselContent className='max-h-[500px]'>
        {images.map((img, i) => (
          <CarouselItem key={i}>
            <img src={img} className='w-64 h-64 object-cover rounded-md mx-auto' />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious variant='secondary-outline' />
      <CarouselNext variant='secondary-outline' />
    </Carousel>
  ),
};

export const ImageGallery: StoryObj<typeof GalleryImages> = {
  render: () => (
    <GalleryImages
      items={images}
      getUrl={img => img}
      getId={img => img.split('?')[1]}
      classNameMainImage='h-96'
      classNameOtherImages='h-24'
    />
  ),
};

export const CustomContent: StoryObj<typeof Carousel> = {
  render: () => (
    <Carousel>
      <CarouselContent>
        {[1, 2, 3].map(num => (
          <CarouselItem key={num}>
            <div className='h-64 bg-primary/10 flex items-center justify-center rounded-md'>
              <h3 className='text-2xl font-semibold'>Slide {num}</h3>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};
