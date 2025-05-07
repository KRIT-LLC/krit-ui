import { ReactNode, useEffect, useRef, useState } from 'react';
import { ContentType } from '@/lib/attachments';
import { cn } from '@/utils';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DeleteIcon,
  FileIcon,
  RotateLeftIcon,
  RotateRightIcon,
} from '@/assets';
import { Dialog, DialogContent, DialogTrigger } from './dialog';
import { Preloader } from './preloader';

interface PreviewFullProps {
  children?: ReactNode;
  src?: string;
  name?: string;
  type?: ContentType;
  onPrev?: () => void;
  onNext?: () => void;
  onRemove?: () => Promise<void>;
}

const Action = ({
  onRotate,
  onPrev,
  onNext,
  onRemove,
  isImage,
}: {
  onRotate: (direction: 'left' | 'right') => void;
  onPrev?: () => void;
  onNext?: () => void;
  onRemove?: () => Promise<void>;
  isImage?: boolean;
}) => {
  return (
    <div className='flex justify-center items-center z-50'>
      <div className='flex bg-foreground-primary-disabled py-2 px-3 rounded-[8px] gap-4'>
        <ChevronLeftIcon
          className={cn('cursor-pointer text-icon-on-contrast', { 'opacity-50': !onPrev })}
          onClick={() => onPrev?.()}
        />
        <ChevronRightIcon
          className={cn('cursor-pointer text-icon-on-contrast', { 'opacity-50': !onNext })}
          onClick={() => onNext?.()}
        />
        <RotateLeftIcon
          className={cn('cursor-pointer text-icon-on-contrast', { 'opacity-50': !isImage })}
          onClick={() => onRotate('left')}
        />
        <RotateRightIcon
          className={cn('cursor-pointer text-icon-on-contrast', { 'opacity-50': !isImage })}
          onClick={() => onRotate('right')}
        />
        {onRemove && (
          <DeleteIcon className='cursor-pointer text-icon-on-contrast' onClick={onRemove} />
        )}
      </div>
    </div>
  );
};

export const PreviewFull = ({
  children,
  src,
  name,
  type,
  onPrev,
  onNext,
  onRemove,
}: PreviewFullProps) => {
  const image = useRef<HTMLImageElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [angle, setAngle] = useState(0);
  const rotateStep = 90;

  const rotate = (direction: 'left' | 'right') => {
    setAngle(direction === 'left' ? (angle - rotateStep + 360) % 360 : (angle + rotateStep) % 360);
  };

  useEffect(() => {
    if (!image.current?.complete && type !== 'pdf') setIsLoading(true);
    setAngle(0);
  }, [src]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='bg-[transparent] shadow-none flex flex-col gap-12 overflow-hidden'>
        <div className='flex items-center justify-center max-h-[90vh]'>
          {type === 'image' && (
            <img
              ref={image}
              style={{ visibility: isLoading ? 'hidden' : undefined, rotate: `${angle}deg` }}
              src={src}
              className='object-cover w-full h-full max-w-full max-h-[calc(90vh-150px)]'
              onError={() => setIsLoading(false)}
              onLoad={() => setIsLoading(false)}
            />
          )}
          {type === 'video' && (
            <video
              style={{ visibility: isLoading ? 'hidden' : undefined }}
              className='object-cover'
              controls
              onError={() => setIsLoading(false)}
              onLoadedData={() => setIsLoading(false)}
            >
              <source src={src} type='video/mp4' />
            </video>
          )}
          {type === 'audio' && (
            <audio
              style={{ visibility: isLoading ? 'hidden' : undefined }}
              className='object-cover self-center'
              controls
              onError={() => setIsLoading(false)}
              onLoadedData={() => setIsLoading(false)}
            >
              <source src={src} type='audio/mp3' />
            </audio>
          )}
          {type === 'pdf' && (
            <a
              href={src}
              target='_blank'
              rel='noopener noreferrer'
              className={cn(
                'flex flex-col items-center justify-center bg-background-secondary h-[130px] w-[130px] text-icon-theme rounded-lg border-2 border-line-secondary',
              )}
            >
              <FileIcon />
              <div className='text-sm mt-1 text-foreground-secondary'>{name}</div>
            </a>
          )}
          {isLoading && (
            <Preloader
              style={{ width: image.current?.width, height: image.current?.height }}
              className='min-w-[-webkit-fill-available] h-auto flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
            />
          )}
        </div>
        <Action
          onRotate={rotate}
          onPrev={onPrev}
          onNext={onNext}
          onRemove={onRemove}
          isImage={type === 'image'}
        />
      </DialogContent>
    </Dialog>
  );
};
