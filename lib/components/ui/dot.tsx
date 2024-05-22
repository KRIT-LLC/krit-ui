import { cn } from '@/utils';

export const Dot = ({ className }: { className?: string }) => {
  return <span className={cn('text-neutral-400 text-opacity-75 text-[19px] mb-[1px]', className)}>•</span>;
};
