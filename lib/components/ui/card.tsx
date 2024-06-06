import * as React from 'react';

import { cn } from '@/utils';
import ChevronRight from '@/assets/chevron_right.svg?react';
import Save from '@/assets/save.svg?react';
import Delete from '@/assets/delete.svg?react';
import { Checkbox } from './checkbox';
import { Dot } from './dot';

interface CardProps {
  className?: string;
  children?: React.ReactNode;
  showArrow?: boolean;
  checked?: boolean;
  onSelect?: (checked: boolean) => void;
  onClick?: () => void;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, showArrow, checked, onSelect, onClick, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-lg border border-line-primary transition duration-100 ease-in-out',
          onClick && 'cursor-pointer',
          checked && 'ring-[3px] ring-primary bg-background-primary-selected border-b-line-secondary',
          className,
        )}
        onClick={checked ? () => onSelect?.(false) : onClick}
        {...props}
      >
        {props.children}
        <div className="text-foreground/50 absolute top-1/2 right-5 transform -translate-y-1/2">
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

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, checked, right, onSelect, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5 px-5 pt-3 pb-1 text-sm font-normal', className)}
        {...props}
      >
        <div className="flex items-center">
          {onSelect && (
            <div className="w-6 h-6 p-[2px] mr-2">
              <Checkbox
                checked={checked}
                onClick={(e) => e.stopPropagation()}
                onCheckedChange={(checked) => onSelect(!!checked)}
              />
            </div>
          )}
          <div className="w-full flex justify-between items-center">
            <div className="flex gap-3 text-foreground/50 items-center">
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
  showArrow?: boolean;
}

const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, leftOffset, showArrow, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('px-5 pr-10 text-sm flex gap-2 font-normal leading-6', leftOffset && 'ml-8', className)}
      {...props}
    >
      <div className="w-full flex justify-between items-center">
        <div className="w-full break-words inline-block">{children}</div>
        <div className="text-foreground/50">{showArrow && <ChevronRight />}</div>
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
      className={cn('px-5 pr-10 pt-0 text-sm font-normal text-foreground/60', leftOffset && 'ml-8', className)}
      {...props}
    >
      <div className="flex justify-between items-center">
        <div className="w-full">{children}</div>
        <div className="text-foreground/50">{showArrow && <ChevronRight />}</div>
      </div>
    </div>
  ),
);
CardDescription.displayName = 'CardDescription';

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  leftOffset?: boolean;
  showArrow?: boolean;
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, leftOffset, showArrow, children, ...props }, ref) => (
    <div ref={ref} className={cn('px-5 pt-0 text-sm font-normal', leftOffset && 'ml-8', className)} {...props}>
      <div className="flex justify-between items-center">
        <div>{children}</div>
        <div className="text-foreground/50">{showArrow && <ChevronRight />}</div>
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
    <div ref={ref} className={cn('flex items-center p-5 pt-1 pb-3', leftOffset && 'ml-8', className)} {...props}>
      <div className="flex gap-3 text-sm text-foreground-secondary items-center">
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
    <div className="absolute right-1 top-1 flex gap-3">
      {onSave && (
        <Save
          className={cn('w-7 h-7 text-primary', isSaving ? 'opacity-20 pointer-events-none' : 'cursor-pointer')}
          onClick={handleSaveClick}
        />
      )}
      {onRemove && (
        <Delete
          className={cn(
            'text-destructive-foreground',
            isRemoving ? 'opacity-20 pointer-events-none' : 'cursor-pointer',
          )}
          onClick={handleRemoveClick}
        />
      )}
    </div>
  );
};

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, CardEditActions };
