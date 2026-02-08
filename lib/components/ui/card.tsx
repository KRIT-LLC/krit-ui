import * as React from 'react';
import { cn } from '@/utils';
import ChevronRight from '@/assets/chevron_right.svg?react';
import Delete from '@/assets/delete.svg?react';
import Save from '@/assets/save.svg?react';
import { Checkbox } from './checkbox';
import { Dot } from './dot';

export interface CardProps {
  /** CSS-классы для кастомизации внешнего вида */
  className?: string;
  /**
   * Дочерние элементы карточки
   * @default null
   */
  children?: React.ReactNode;
  /** Отображать стрелку в правой части */
  showArrow?: boolean;
  /** Состояние выбора (для контролируемого режима) */
  checked?: boolean;
  /**
   * Хэндлер изменения состояния выбора
   * @param checked - новое состояние выбора
   */
  onSelect?: (checked: boolean) => void;
  /** Хэндлер клика по карточке */
  onClick?: () => void;
}
/**
 * Стилизованная карточка с поддержкой выбора, действий и кастомизации
 *
 * @component
 * @example
 * <Card showArrow checked={isChecked} onSelect={setIsChecked}>
 *   <CardHeader>Заголовок</CardHeader>
 *   <CardContent>Контент</CardContent>
 * </Card>
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, showArrow, checked, onSelect, onClick, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-1 px-5 py-3 relative rounded-lg border border-line-primary transition duration-100 ease-in-out',
          onClick && 'cursor-pointer',
          checked &&
            'ring-[3px] ring-primary bg-background-primary-selected border-b-line-secondary',
          className,
        )}
        onClick={checked ? () => onSelect?.(false) : onClick}
        {...props}
      >
        {props.children}
        <div className='text-foreground/50 absolute top-1/2 right-5 transform -translate-y-1/2'>
          {showArrow && <ChevronRight />}
        </div>
      </div>
    );
  },
);
Card.displayName = 'Card';

interface CardHeaderProps {
  className?: string;
  children?: React.ReactNode;
  checked?: boolean;
  right?: React.ReactNode;
  onSelect?: (checked: boolean) => void;
  onClick?: () => void;
}
/**
 * Заголовок карточки с возможностью выбора
 */
interface CardHeaderProps {
  // Элементы справа от заголовка
  right?: React.ReactNode;
}
/**
 * @extends CardProps
 */
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, checked, right, onSelect, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5 pb-1 text-sm font-normal', className)}
        {...props}
      >
        <div className='flex items-center gap-2'>
          {onSelect && (
            <Checkbox
              checked={checked}
              onClick={e => e.stopPropagation()}
              onCheckedChange={checked => onSelect(!!checked)}
            />
          )}
          <div className='w-full flex justify-between items-center'>
            <div className='flex gap-3 text-foreground/50 items-center'>
              {React.Children.toArray(children)
                .filter(Boolean)
                .map((child, i) => (
                  <React.Fragment key={i}>{child}</React.Fragment>
                ))}
            </div>
            <div>{right}</div>
          </div>
        </div>
      </div>
    );
  },
);
CardHeader.displayName = 'CardHeader';

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  leftOffset?: boolean;
}
/**
 * Основной заголовок карточки
 */
interface CardTitleProps {
  // Сдвиг вправо для выравнивания
  leftOffset?: boolean;
}
const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, leftOffset = false, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'pr-10 text-sm flex gap-2 font-normal leading-6',
        leftOffset && 'ml-8',
        className,
      )}
      {...props}
    >
      <div className='w-full flex justify-between items-center'>
        <div className='w-full break-words inline-block'>{children}</div>
      </div>
    </h3>
  ),
);
CardTitle.displayName = 'CardTitle';

interface CardDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  leftOffset?: boolean;
  showArrow?: boolean;
}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, leftOffset, showArrow, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'pr-10 pt-0 text-sm font-normal text-foreground/60',
        leftOffset && 'ml-8',
        className,
      )}
      {...props}
    >
      <div className='flex justify-between items-center'>
        <div className='w-full'>{children}</div>
        <div className='text-foreground/50'>{showArrow && <ChevronRight />}</div>
      </div>
    </div>
  ),
);
CardDescription.displayName = 'CardDescription';

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  leftOffset?: boolean;
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, leftOffset, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('pt-0 text-sm font-normal', leftOffset && 'ml-8', className)}
      {...props}
    >
      <div className='flex justify-between items-center'>
        <div>{children}</div>
      </div>
    </div>
  ),
);
CardContent.displayName = 'CardContent';

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  leftOffset?: boolean;
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, leftOffset, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center pt-1 pb-3', leftOffset && 'ml-8', className)}
      {...props}
    >
      <div className='flex gap-3 text-sm text-foreground-secondary items-center'>
        {React.Children.toArray(children)
          .filter(Boolean)
          .map((child, i, array) => (
            <React.Fragment key={i}>
              {child}
              {array.length - 1 !== i && <Dot />}
            </React.Fragment>
          ))}
      </div>
    </div>
  ),
);
CardFooter.displayName = 'CardFooter';

type ActionClickEvent = React.MouseEvent<SVGSVGElement, MouseEvent>;

interface CardEditActionsProps {
  onSave?: (e: ActionClickEvent) => Promise<void> | void;
  onRemove?: (e: ActionClickEvent) => Promise<void> | void;
}
/**
 * Действия редактирования карточки (сохранение/удаление)
 */
interface CardEditActionsProps {
  // Колбэк сохранения
  onSave?: (e: ActionClickEvent) => Promise<void> | void;
  // Колбэк удаления
  onRemove?: (e: ActionClickEvent) => Promise<void> | void;
}
const CardEditActions = ({ onSave, onRemove }: CardEditActionsProps) => {
  const [isSaving, setIsSaving] = React.useState(false);
  const [isRemoving, setIsRemoving] = React.useState(false);

  const handleSaveClick = async (e: ActionClickEvent) => {
    setIsSaving(true);
    try {
      await onSave?.(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveClick = async (e: ActionClickEvent) => {
    setIsRemoving(true);
    try {
      await onRemove?.(e);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className='absolute right-1 top-1 flex gap-3'>
      {onSave && (
        <Save
          className={cn(
            'w-6 h-6 text-primary',
            isSaving ? 'opacity-20 pointer-events-none' : 'cursor-pointer',
          )}
          onClick={handleSaveClick}
        />
      )}
      {onRemove && (
        <Delete
          className={cn(
            'w-6 h-6 text-destructive',
            isRemoving ? 'opacity-20 pointer-events-none' : 'cursor-pointer',
          )}
          onClick={handleRemoveClick}
        />
      )}
    </div>
  );
};

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, CardEditActions };
