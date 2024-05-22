import { Loader2 } from 'lucide-react';
import { cn } from '@/utils';

interface PreloaderProps {
  style?: React.CSSProperties;
  className?: string;
}

const Preloader = ({ style, className }: PreloaderProps) => {
  return (
    <div style={style} className={cn('h-full w-full flex items-center justify-center', className)}>
      <Loader2 className="h-8 w-8 animate-spin text-foreground-theme" />
    </div>
  );
};

export { Preloader };
