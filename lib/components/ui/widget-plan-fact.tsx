import { ReactNode } from 'react';
import { cn } from '@/utils';

export type TimeBadgeVariant = 'default' | 'warning' | 'error';

interface TimeBadgeProps {
  /** Дата и время в формате "DD.MM.YYYY HH:mm" */
  dateTime?: string;
  /** Длительность в формате "Xd : Yч : Zмин" */
  duration?: string;
  /** Вариант стиля бейджа */
  variant?: TimeBadgeVariant;
  /** Дополнительные CSS-классы */
  className?: string;
}

/**
 * Компонент для отображения даты/времени и длительности в виде бейджа.
 * Поддерживает различные варианты стилей: default, warning (желтый), error (красный).
 *
 * @component
 * @param {TimeBadgeProps} props - Пропсы компонента
 * @param {string} [props.dateTime] - Дата и время в формате "DD.MM.YYYY HH:mm"
 * @param {string} [props.duration] - Длительность в формате "Xd : Yч : Zмин"
 * @param {TimeBadgeVariant} [props.variant='default'] - Вариант стиля бейджа
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @returns {JSX.Element}
 *
 * @example
 * <TimeBadge
 *   dateTime="01.12.2025 10:00"
 *   duration="14д : 24ч : 20мин"
 *   variant="error"
 * />
 */
const TimeBadge = ({ dateTime, duration, variant = 'default', className }: TimeBadgeProps) => {
  const hasContent = dateTime || duration;

  if (!hasContent) {
    return null;
  }

  const variantStyles = {
    default: 'text-foreground-primary',
    warning: 'bg-background-warning-fade text-foreground-warning',
    error: 'bg-background-error-fade text-foreground-error',
  };

  const badgeClassName = cn(
    'inline-flex items-center px-2 rounded text-sm leading-5 tracking-[0.25px]',
    variantStyles[variant],
    className,
  );

  if (variant === 'default') {
    return (
      <span
        className={cn('text-foreground-primary text-sm leading-5 tracking-[0.25px]', className)}
      >
        {dateTime}
        {dateTime && duration && ' '}
        {duration}
      </span>
    );
  }

  return (
    <div className='flex items-center gap-2'>
      {dateTime && <span className={badgeClassName}>{dateTime}</span>}
      {duration && <span className={badgeClassName}>{duration}</span>}
    </div>
  );
};
TimeBadge.displayName = 'TimeBadge';

export interface PlanFactRow {
  /** Метка для плана (например, "План начала") */
  planLabel?: string;
  /** Значение плана (например, "01.11.2025 10:00") */
  planValue?: string;
  /** Метка для факта (например, "Факт начала") */
  factLabel?: string;
  /** Значение факта (отображается через TimeBadge) */
  factDateTime?: string;
  factDuration?: string;
  /** Вариант стиля для факта */
  factVariant?: TimeBadgeVariant;
  /** Расхождение (например, "Расхождение 30д : 2ч : 30мин") */
  delta?: string;
}

interface WidgetPlanFactProps {
  /** Массив строк с планом и фактом */
  rows: PlanFactRow[];
  /** Ориентация виджета: вертикальная (строки) или горизонтальная (колонки) */
  orientation?: 'vertical' | 'horizontal';
  /** Дополнительные CSS-классы для корневого элемента */
  className?: string;
}

// Общие стили
const labelStyle = 'text-foreground-primary text-sm leading-5 font-medium tracking-[0.25px]';
const valueStyle = 'text-foreground-primary text-sm leading-5 tracking-[0.25px]';
const deltaStyle = 'text-foreground-secondary text-sm leading-5 tracking-[0.25px]';

// Компонент для отображения метки
const Label = ({ children }: { children: ReactNode }) => (
  <div className={labelStyle}>{children}</div>
);

// Компонент для отображения значения
const Value = ({ children }: { children: ReactNode }) => (
  <div className={valueStyle}>{children}</div>
);

// Компонент для отображения delta
const Delta = ({ delta, className }: { delta: string; className?: string }) => (
  <div className={cn(deltaStyle, className)}>{delta}</div>
);

/**
 * Виджет для отображения сравнения плановых и фактических значений.
 * Отображает три секции (Начало, Окончание, Длительность) с планом и фактом.
 *
 * @component
 * @param {WidgetPlanFactProps} props - Пропсы компонента
 * @param {PlanFactRow[]} props.rows - Массив строк с планом и фактом
 * @param {'vertical' | 'horizontal'} [props.orientation='vertical'] - Ориентация виджета
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @returns {JSX.Element}
 *
 * @example
 * <WidgetPlanFact
 *   rows={[
 *     {
 *       planLabel: 'План начала',
 *       planValue: '01.11.2025 10:00',
 *       factLabel: 'Факт начала',
 *       factDateTime: '01.12.2025 10:00',
 *       delta: 'Расхождение 30д : 2ч : 30мин',
 *     },
 *   ]}
 * />
 */
const WidgetPlanFact = ({ rows, orientation = 'vertical', className }: WidgetPlanFactProps) => {
  const renderRow = (row: PlanFactRow, isHorizontal: boolean) => {
    if (isHorizontal) {
      return (
        <div className='flex flex-col gap-1'>
          {/* Метки плана и факта */}
          <div className='grid grid-cols-2 gap-x-4'>
            <Label>{row.planLabel}</Label>
            <Label>{row.factLabel}</Label>
          </div>

          {/* Значения плана и факта */}
          <div className='grid grid-cols-2 gap-x-4'>
            <Value>{row.planValue}</Value>
            <TimeBadge
              dateTime={row.factDateTime}
              duration={row.factDuration}
              variant={row.factVariant || 'error'}
            />
          </div>

          {/* Расхождение */}
          {row.delta && <Delta delta={row.delta} className='mt-2' />}
        </div>
      );
    }

    return (
      <div className='grid grid-cols-2 gap-x-4'>
        {/* План */}
        <div className='flex flex-col gap-1'>
          <Label>{row.planLabel}</Label>
          <Value>{row.planValue}</Value>
        </div>

        {/* Факт */}
        <div className='flex flex-col gap-1'>
          <Label>{row.factLabel}</Label>
          <TimeBadge
            dateTime={row.factDateTime}
            duration={row.factDuration}
            variant={row.factVariant || 'error'}
          />
        </div>

        {/* Расхождение */}
        {row.delta && (
          <div className='col-span-2 mt-2'>
            <Delta delta={row.delta} />
          </div>
        )}
      </div>
    );
  };

  const isHorizontal = orientation === 'horizontal';

  if (!rows || rows.length === 0) {
    return null;
  }

  return (
    <div className={cn('rounded-lg border border-line-primary bg-background-primary', className)}>
      {isHorizontal ? (
        <div className='grid' style={{ gridTemplateColumns: `repeat(${rows.length}, 1fr)` }}>
          {rows.map((row, index) => (
            <div
              key={index}
              className={cn('px-6 py-4', {
                'border-r border-line-primary': index < rows.length - 1,
              })}
            >
              {renderRow(row, true)}
            </div>
          ))}
        </div>
      ) : (
        rows.map((row, index) => (
          <div key={index} className='px-4 py-4 border-b border-line-primary last:border-b-0'>
            {renderRow(row, false)}
          </div>
        ))
      )}
    </div>
  );
};
WidgetPlanFact.displayName = 'WidgetPlanFact';

export { TimeBadge, WidgetPlanFact };
