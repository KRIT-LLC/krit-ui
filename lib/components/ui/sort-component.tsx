import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/utils';
import SortIcon from '@/assets/sort.svg?react';
import { Button } from './button';
import { OptionType, Select } from './select';

/**
 * Типы для сортировки
 */
export const SortOrder = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export type SortOrderType = (typeof SortOrder)[keyof typeof SortOrder];

export interface SortComponentProps<T extends string> {
  /** Текущий порядок сортировки */
  sortOrder?: SortOrderType;
  /** Текущее поле сортировки */
  sortField?: T;
  /** Дополнительные классы для контейнера */
  className?: string;
  /** Опции для выбора поля сортировки */
  options: OptionType[];
  /** Текст плейсхолдера для селекта */
  placeholder?: string;
  /** Обработчик переключения порядка сортировки */
  onOrderToggle?: () => void;
  /** Обработчик изменения поля сортировки */
  onFieldChange?: (field: T) => void;
}

/**
 * Компонент сортировки с выбором поля и переключением направления
 * Соответствует дизайну из Figma: кнопка с иконкой фильтра слева, текстом посередине и chevron справа
 *
 * @component
 * @param {SortComponentProps} props - Параметры компонента
 * @returns {React.ReactElement} Компонент сортировки
 *
 * @example
 * <SortComponent
 *   sortOrder={SortOrder.DESC}
 *   sortField="date"
 *   options={[
 *     { label: 'Дата создания', value: 'date' },
 *     { label: 'Название', value: 'name' }
 *   ]}
 *   onOrderToggle={() => {}}
 *   onFieldChange={(field) => {}}
 * />
 */
export const SortComponent = <T extends string>({
  sortOrder = SortOrder.DESC,
  sortField,
  className,
  options,
  placeholder,
  onOrderToggle,
  onFieldChange,
}: SortComponentProps<T>) => {
  const { t } = useTranslation();
  const defaultPlaceholder = placeholder ?? t('withoutSort');

  return (
    <div className={cn('flex w-full items-center gap-2 text-xs text-foreground-secondary', className)}>
      {sortField && onOrderToggle && (
        <Button
          onClick={onOrderToggle}
          variant='fade-contrast-transparent'
          className={cn('flex flex-shrink-0 min-w-6 h-6 p-0 hover:bg-transparent', {
            'rotate-180': sortOrder === SortOrder.ASC,
          })}
          icon={<SortIcon />}
        />
      )}
      {!sortField && (
        <SortIcon className='h-[9px] w-[14px] flex-shrink-0 text-foreground-secondary' />
      )}
      <div className='flex-1 min-w-0'>
        <Select
          triggerClassName='text-foreground-secondary border-none p-0 text-xs hover:bg-[transparent] h-auto min-w-0 w-full font-normal [&>span]:pr-0 [&>span]:truncate'
          placeholder={defaultPlaceholder}
          value={sortField}
          options={options}
          onChange={(value: string) => onFieldChange?.(value as T)}
          renderValue={(option: OptionType) => (
            <span className='whitespace-nowrap text-foreground-secondary'>{option.label}</span>
          )}
        />
      </div>
    </div>
  );
};
