import { ReactNode } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/utils';
import BillEmpty from '@/assets/bill_empty.svg?react';
import NetworkError from '@/assets/network_error.svg?react';
import SearchEmpty from '@/assets/search_empty.svg?react';
import { Button } from './button';

interface BannerProps {
  className?: string;
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'secondary';
  icon?: 'bill-empty' | 'search-empty' | 'network-error';
  actionText?: string;
  onActionClick?: () => void;
}

export const Banner = ({
  className,
  title,
  subtitle,
  variant,
  icon = 'bill-empty',
  actionText,
  onActionClick,
}: BannerProps) => {
  const renderIcon = (name: string) => {
    switch (name) {
      case 'network-error':
        return <NetworkError />;
      case 'search-empty':
        return <SearchEmpty />;
      case 'bill-empty':
      default:
        return <BillEmpty />;
    }
  };

  return (
    <div
      className={cn(
        'w-full h-full flex-1 flex flex-col items-center justify-center select-none',
        className,
      )}
    >
      <span className={cn('text-line-theme', variant === 'secondary' && 'text-line-secondary')}>
        {renderIcon(icon)}
      </span>
      <div
        className={cn(
          'mt-6 text-base font-medium',
          variant === 'secondary' && 'text-foreground-tertiary',
        )}
      >
        {title}
      </div>
      <div className='mt-2 text-sm text-foreground-secondary'>{subtitle}</div>
      {actionText && (
        <Button variant='contrast' className='mt-4' onClick={onActionClick}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

interface ErrorBannerProps {
  className?: string;
  onRefetchClick?: () => Promise<unknown> | unknown;
}

export const ErrorBanner = ({ className, onRefetchClick }: ErrorBannerProps) => {
  const { t } = useTranslation();

  return (
    <Banner
      className={className}
      icon='network-error'
      title={t('networkError')}
      subtitle={t('networkErrorDescription')}
      actionText={t('refetch')}
      onActionClick={onRefetchClick}
    />
  );
};

export const RouteErrorBanner = () => (
  <ErrorBanner onRefetchClick={() => window.location.reload()} />
);

export const NoDataBanner = ({ children }: { children?: ReactNode }) => (
  <div className='w-full bg-background-secondary rounded-lg flex items-center justify-center h-12 text-foreground-secondary text-xs select-none'>
    {children}
  </div>
);
