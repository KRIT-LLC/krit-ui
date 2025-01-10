import { ReactNode } from 'react';
import ArrowBack from '@/assets/arrow_back.svg?react';
import ChevronLeft from '@/assets/chevron_left.svg?react';
import ChevronRight from '@/assets/chevron_right.svg?react';

import { cn } from '@/utils';

interface PageHeaderProps {
  className?: string;
  title?: ReactNode;
  titleActions?: ReactNode;
  leftMeta?: string | number;
  meta?: string | number;
  actions?: ReactNode;
  onBack?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export const PageHeader = ({
  className,
  title,
  titleActions,
  leftMeta,
  meta,
  actions,
  onBack,
  onNext,
  onPrevious,
}: PageHeaderProps) => {
  const hasNextOrPrevious = onNext || onPrevious;
  return (
    <div className={cn('w-full flex justify-between items-center', className)}>
      <div className='flex gap-2 items-center'>
        {onBack && (
          <div
            className='p-2 cursor-pointer hover:text-foreground-primary-disabled'
            onClick={onBack}
          >
            <ArrowBack />
          </div>
        )}
        {hasNextOrPrevious && (
          <div
            className={cn(
              'p-2 cursor-pointer hover:text-foreground-primary-disabled',
              !onPrevious && 'opacity-50 pointer-events-none',
            )}
            onClick={onPrevious}
          >
            <ChevronLeft />
          </div>
        )}
        {hasNextOrPrevious && (
          <div
            className={cn(
              'p-2 cursor-pointer hover:text-foreground-primary-disabled',
              !onNext && 'opacity-50 pointer-events-none',
            )}
            onClick={onNext}
          >
            <ChevronRight />
          </div>
        )}
        {leftMeta && (
          <div className='text-[28px] font-medium tracking-[0.18px] text-foreground-primary opacity-50'>
            {leftMeta}
          </div>
        )}
        <div className='text-[28px] font-medium tracking-[0.18px] text-foreground-primary flex items-center gap-1'>
          {title}
        </div>
        <div className='text-[28px] font-medium tracking-[0.18px] text-foreground-theme'>
          {meta}
        </div>
        <div className='flex gap-3 items-center ml-2'>{titleActions}</div>
      </div>
      <div className='flex gap-4'>{actions}</div>
    </div>
  );
};
