import { CSSProperties } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils';

export interface PreloaderProps {
  style?: CSSProperties;
  className?: string;
}
/**
 * Компонент индикатора загрузки с анимацией вращения.
 * Использует иконку Loader2 из библиотеки lucide-react с применением анимации spin.
 *
 * @component
 * @param {PreloaderProps} props - Параметры компонента
 * @param {CSSProperties} [props.style] - Объект со стилями для контейнера
 * @param {string} [props.className] - Дополнительные CSS-классы для контейнера
 * @returns {React.ReactElement} Компонент индикатора загрузки
 *
 * @example
 * <Preloader />
 *
 * @example
 * <Preloader className="my-custom-class" style={{ background: 'white' }} />
 */
const Preloader = ({ style, className }: PreloaderProps) => {
  return (
    <div style={style} className={cn('h-full w-full flex items-center justify-center', className)}>
      <Loader2 className='h-8 w-8 animate-spin text-foreground-theme' />
    </div>
  );
};

export { Preloader };
