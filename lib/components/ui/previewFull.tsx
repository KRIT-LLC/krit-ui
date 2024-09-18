import { ReactNode, useEffect, useRef, useState } from 'react';

import ChevronRight from '@/assets/chevron_right.svg?react';
import { cn } from '@/utils';
import { Preloader } from './preloader';
import { Dialog, DialogContent, DialogTrigger } from './dialog';

interface PreviewFullProps {
  children?: ReactNode;
  src?: string;
  type?: 'video' | 'image';
  onPrev?: () => void;
  onNext?: () => void;
}

const Toggler = ({ toLeft, onClick }: { toLeft?: boolean; onClick?: () => void }) => {
  return (
    <div
      className={cn(
        'flex flex-col justify-center items-center cursor-pointer z-10 text-secondary-foreground opacity-70  transition-opacity hover:opacity-100',
        toLeft ? '-mr-14' : '-ml-14',
      )}
      onClick={onClick}
    >
      <ChevronRight
        className={cn(
          'h-10 w-10 rounded-full p-1 focus:outline-none disabled:pointer-events-none',
          toLeft && 'rotate-180',
        )}
      />
    </div>
  );
};

export const PreviewFull = ({ children, src, type, onPrev, onNext }: PreviewFullProps) => {
  const image = useRef<HTMLImageElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!image.current?.complete) setIsLoading(true);
  }, [src]);

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className='bg-[transparent] shadow-none flex overflow-hidden'>
        {onPrev && <Toggler toLeft onClick={onPrev} />}
        {isLoading && (
          <Preloader
            style={{ width: image.current?.width, height: image.current?.height }}
            className='min-w-[-webkit-fill-available] h-auto flex justify-center items-center'
          />
        )}
        {type === 'image' && (
          <img
            ref={image}
            style={{ visibility: isLoading ? 'hidden' : undefined }}
            src={src}
            className='object-cover rounded-xl min-h-[90vh]'
            onError={() => setIsLoading(false)}
            onLoad={() => setIsLoading(false)}
          />
        )}
        {type === 'video' && (
          <video
            style={{ visibility: isLoading ? 'hidden' : undefined }}
            className='object-cover rounded-xl min-h-[90vh]'
            controls
            onError={() => setIsLoading(false)}
            onLoadedData={() => setIsLoading(false)}
          >
            <source src={src} type='video/mp4' />
          </video>
        )}
        {onNext && <Toggler onClick={onNext} />}
      </DialogContent>
    </Dialog>
  );
};
