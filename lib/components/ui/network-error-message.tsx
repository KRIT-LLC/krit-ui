import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/utils';
import { Preloader } from './preloader';

/**
 * Пропсы компонента NetworkErrorMessage
 * @interface NetworkErrorMessageProps
 * @property {string} [className] - Дополнительные CSS-классы для контейнера
 * @property {'base'|'sm'} [textSize='base'] - Размер текста
 * @property {boolean} [isLoading] - Флаг состояния загрузки
 * @property {boolean} [isError] - Флаг состояния ошибки
 * @property {boolean} [center] - Выравнивание по центру
 * @property {boolean} [inline] - Inline-режим отображения
 * @property {function} [onRefetch] - Функция для повторной попытки загрузки
 */
export interface NetworkErrorMessageProps {
  className?: string;
  textSize?: 'base' | 'sm';
  isLoading?: boolean;
  isError?: boolean;
  center?: boolean;
  inline?: boolean;
  onRefetch?: () => void;
}

/**
 * Компонент для отображения состояния загрузки или ошибки сети
 * @component
 * @param {NetworkErrorMessageProps} props - Пропсы компонента
 * @returns {JSX.Element|null} Компонент сообщения об ошибке или состоянии загрузки, либо null если не активен
 *
 * @example
 * // Базовое использование
 * <NetworkErrorMessage
 *   isLoading={isLoading}
 *   isError={isError}
 *   onRefetch={refetchData}
 * />
 *
 * @example
 * // Inline-режим
 * <div>
 *   Загрузка данных
 *   <NetworkErrorMessage
 *     isLoading={isLoading}
 *     isError={isError}
 *     inline
 *   />
 * </div>
 */

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
