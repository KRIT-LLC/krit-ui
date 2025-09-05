import * as React from 'react';
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';
import { cn } from '@/utils';
import ChevronLeft from '@/assets/chevron_left.svg?react';
import ChevronRight from '@/assets/chevron_right.svg?react';
import HideImage from '@/assets/hide_image.svg?react';
import { Button } from './button';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: 'horizontal' | 'vertical';
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  currentIndex: number;
  onThumbClick: (index: number) => void;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

const useCarousel = () => {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
};

/**
 * Кастомная карусель на базе Embla Carousel с поддержкой миниатюр и навигации
 * @component
 * @subcomponent CarouselContent - Контейнер для слайдов
 * @subcomponent CarouselItem - Отдельный слайд карусели
 * @subcomponent CarouselPrevious - Кнопка "Назад"
 * @subcomponent CarouselNext - Кнопка "Вперед"
 * @subcomponent CarouselThumbs - Контейнер для миниатюр
 * @subcomponent CarouselThumbItem - Миниатюра слайда
 * @subcomponent GalleryImages - Галерея изображений
 */

const Carousel = ({
  orientation = 'horizontal',
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & CarouselProps) => {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    },
    plugins,
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const [currentIndex, setCurrentIndex] = React.useState(0);

  const onThumbClick = React.useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
    setCurrentIndex(api.selectedScrollSnap());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on('reInit', onSelect);
    api.on('select', onSelect);

    return () => {
      api?.off('select', onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        currentIndex,
        onThumbClick,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn('relative', className)}
        role='region'
        aria-roledescription='carousel'
        data-slot='carousel'
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
};

const CarouselContent = ({ className, ...props }: React.ComponentProps<'div'>) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className='overflow-hidden' data-slot='carousel-content'>
      <div
        className={cn('flex', orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col', className)}
        {...props}
      />
    </div>
  );
};

const CarouselItem = ({ className, ...props }: React.ComponentProps<'div'>) => {
  const { orientation } = useCarousel();

  return (
    <div
      role='group'
      aria-roledescription='slide'
      data-slot='carousel-item'
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className,
      )}
      {...props}
    />
  );
};

const CarouselPrevious = ({
  className,
  variant = 'outline',
  size = 'icon',
  ...props
}: React.ComponentProps<typeof Button>) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      data-slot='carousel-previous'
      variant={variant}
      size={size}
      className={cn(
        'absolute size-8',
        orientation === 'horizontal'
          ? 'top-1/2 -left-4 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        !canScrollPrev && 'hidden',
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ChevronLeft />
      <span className='sr-only'>Previous slide</span>
    </Button>
  );
};

const CarouselNext = ({
  className,
  variant = 'outline',
  size = 'icon',
  ...props
}: React.ComponentProps<typeof Button>) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      data-slot='carousel-next'
      variant={variant}
      size={size}
      className={cn(
        'absolute size-8 ',
        orientation === 'horizontal'
          ? 'top-1/2 -right-4 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        !canScrollNext && 'hidden',
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ChevronRight />
      <span className='sr-only'>Next slide</span>
    </Button>
  );
};

const CarouselThumbs = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'flex justify-center mt-4 space-x-2 overflow-x-auto w-full max-w-full',
        className,
      )}
      {...props}
    />
  );
};

type CarouselThumbItemProps = {
  index: number;
} & React.ComponentProps<'button'>;

const CarouselThumbItem = ({ index, className, children, ...props }: CarouselThumbItemProps) => {
  const { currentIndex, onThumbClick } = useCarousel();
  const isActive = currentIndex === index;

  return (
    <button
      type='button'
      onClick={() => onThumbClick(index)}
      className={cn(
        'aspect-square w-16 h-16 transition-opacity duration-200',
        isActive ? 'opacity-100 ring-2 ring-primary' : 'opacity-60',
        className,
      )}
      aria-current={isActive}
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * Галерея изображений с превью и навигацией
 * @template T - Тип элементов галереи
 * @param {Object} props - Параметры компонента
 * @param {T[]} [props.items] - Массив элементов галереи
 * @param {(item: T) => string} props.getUrl - Функция получения URL изображения
 * @param {(item: T) => string | number} props.getId - Функция получения уникального идентификатора
 * @param {string} [props.classNameMainImage] - Дополнительные классы для основного изображения
 * @param {string} [props.classNameOtherImages] - Дополнительные классы для миниатюр
 */
export const GalleryImages = <T,>({
  items = [],
  getUrl,
  getId,
  classNameMainImage,
  classNameOtherImages,
}: {
  items?: T[];
  getUrl: (item: T) => string;
  getId: (item: T) => number | string;
  classNameMainImage?: string;
  classNameOtherImages?: string;
}) => {
  if (!items.length) return <HideImage className='mx-auto text-icon-fade-contrast' />;

  return (
    <Carousel>
      <CarouselContent>
        {items.map(img => (
          <CarouselItem key={getId(img)}>
            <img
              src={getUrl(img)}
              className={cn('w-full h-[159px] object-cover rounded-md', classNameMainImage)}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious variant='secondary-outline' className='bg-background-primary top-1/3' />
      <CarouselNext variant='secondary-outline' className='bg-background-primary top-1/3' />

      <CarouselThumbs className='justify-start mt-2'>
        {items.map((img, index) => (
          <CarouselThumbItem key={getId(img)} index={index}>
            <img
              src={getUrl(img)}
              className={cn('object-cover rounded-md w-[65px] h-[48px]', classNameOtherImages)}
            />
          </CarouselThumbItem>
        ))}
      </CarouselThumbs>
    </Carousel>
  );
};

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselThumbs,
  CarouselThumbItem,
};
