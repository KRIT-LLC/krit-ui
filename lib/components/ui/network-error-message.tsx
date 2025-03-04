import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/utils';
import { Preloader } from './preloader';

export interface NetworkErrorMessageProps {
  className?: string;
  textSize?: 'base' | 'sm';
  isLoading?: boolean;
  isError?: boolean;
  center?: boolean;
  inline?: boolean;
  onRefetch?: () => void;
}

export const NetworkErrorMessage = ({
  className,
  textSize = 'base',
  isLoading,
  isError,
  center,
  inline,
  onRefetch,
}: NetworkErrorMessageProps) => {
  const { t } = useTranslation();

  if (!isLoading && !isError) return null;

  return (
    <div
      className={cn(
        'flex gap-2 text-base select-none',
        `text-${textSize}`,
        center && 'items-center',
        inline ? 'ml-2 inline-flex' : 'mt-3 flex-col',
        className,
      )}
    >
      {isLoading && <Preloader className={textSize === 'base' ? 'w-7' : 'w-5'} />}
      {isError && (
        <>
          <span className='text-icon'>{t('networkError')}</span>
          {onRefetch && (
            <span className='text-primary cursor-pointer' onClick={onRefetch}>
              {t('refetch')}
            </span>
          )}
        </>
      )}
    </div>
  );
};
