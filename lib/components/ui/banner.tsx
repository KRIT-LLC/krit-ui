import { ReactNode } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/utils';
import BillEmpty from '@/assets/bill_empty.svg?react';
import NetworkError from '@/assets/network_error.svg?react';
import SearchEmpty from '@/assets/search_empty.svg?react';
import { Button } from './button';

/**
 * Пропсы компонента Banner
 */
interface BannerProps {
  /** Дополнительные классы стилей */
  className?: string;
  /** Заголовок баннера */
  title?: string;
  /** Подзаголовок/описание */
  subtitle?: string;
  /** Стиль оформления */
  variant?: 'default' | 'secondary';
  /** Тип отображаемой иконки */
  icon?: 'bill-empty' | 'search-empty' | 'network-error';
  /** Текст кнопки действия */
  actionText?: string;
  /** Обработчик клика по кнопке */
  onActionClick?: () => void;
}

/**
 * Универсальный компонент для отображения информационных баннеров
 */
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

/**
 * Пропсы компонента ErrorBanner
 */
interface ErrorBannerProps {
  /** Дополнительные классы стилей */
  className?: string;
  /** Обработчик повторной загрузки */
  onRefetchClick?: () => Promise<unknown> | unknown;
}

/**
 * Специализированный баннер для отображения ошибок сети
 *
 * @component
 * @param {ErrorBannerProps} props - Параметры компонента
 * @returns {React.ReactElement} Баннер ошибки сети
 */

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

/**
 * Баннер для ошибок маршрутизации с автоматической перезагрузкой
 *
 * @component
 * @returns {React.ReactElement} Баннер ошибки маршрутизации
 */

export const RouteErrorBanner = () => (
  <ErrorBanner onRefetchClick={() => window.location.reload()} />
);

/**
 * Компонент для отображения состояния отсутствия данных
 *
 * @component
 * @param {Object} props - Параметры компонента
 * @param {ReactNode} props.children - Контент для отображения
 * @returns {React.ReactElement} Баннер пустого состояния
 */
export const NoDataBanner = ({ children }: { children?: ReactNode }) => (
  <div className='w-full bg-background-secondary rounded-lg flex items-center justify-center h-12 text-foreground-secondary text-xs select-none'>
    {children}
  </div>
);
