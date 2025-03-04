import { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/utils';
import AddOutline from '@/assets/add_outline.svg?react';
import ChevronUp from '@/assets/chevron_up.svg?react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible';
import { NetworkErrorMessage } from './network-error-message';
import { Preloader } from './preloader';

interface CollapsibleSectionProps {
  title: string;
  icon?: ReactNode;
  defaultExpanded?: boolean;
  showExpanderButton?: boolean;
  expandOnAdd?: boolean;
  count?: number;
  placeholder?: string;
  right?: ReactNode;
  children?: ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  onRefetch?: () => Promise<unknown>;
  onAdd?: () => void;
}

export const CollapsibleSection = (props: CollapsibleSectionProps) => {
  const {
    title,
    icon,
    defaultExpanded,
    showExpanderButton,
    expandOnAdd = true,
    count,
    placeholder,
    right,
    children,
    isLoading,
    isError,
    onRefetch,
    onAdd,
  } = props;
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(defaultExpanded ?? false);

  useEffect(() => {
    if (defaultExpanded !== undefined) setExpanded(defaultExpanded);
  }, [defaultExpanded]);

  return (
    <Collapsible open={isError || expanded} onOpenChange={setExpanded}>
      <div className='flex justify-between text-base w-full'>
        {icon && <span className='text-primary'>{icon}</span>}
        <span>{title}</span>
        {count ? (
          <div className='h-6 px-2 rounded-full bg-icon-tertiary flex justify-center items-center text-background text-[15px] font-medium pb-[1px]'>
            <span>{count}</span>
          </div>
        ) : null}
        <CollapsibleTrigger className='focus:outline-none'>
          {isLoading ? (
            <Preloader className='w-[25px] h-[25px]' />
          ) : (
            <ChevronUp
              className={cn('text-icon-tertiary cursor-pointer transition-transform duration-300', {
                'rotate-180': !expanded,
              })}
            />
          )}
        </CollapsibleTrigger>
        <div className='ml-auto flex gap-2'>
          {right}
          <div className='text-primary cursor-pointer'>
            {onAdd && (
              <AddOutline
                onClick={() => {
                  onAdd?.();
                  if (expandOnAdd) setExpanded(true);
                }}
              />
            )}
          </div>
        </div>
      </div>
      {showExpanderButton && !expanded && (
        <div
          className='w-full flex bg-background-secondary/80 cursor-pointer rounded-lg items-center justify-center gap-1 text-muted-foreground font-medium py-1 mt-4 transition-colors hover:bg-background-secondary/70'
          onClick={() => setExpanded(true)}
        >
          <span>{t('expand')}</span>
          <ChevronUp className={cn('rotate-180')} />
        </div>
      )}
      <CollapsibleContent>
        <NetworkErrorMessage isError={isError} onRefetch={onRefetch} />
        {!isError && !isLoading && !count && (
          <div className='p-6 flex justify-center text-secondary-foreground tracking-[0.1px] select-none'>
            {placeholder || t('empty')}
          </div>
        )}
        {!!count && <div className='flex flex-col gap-3 mt-3'>{children}</div>}
      </CollapsibleContent>
    </Collapsible>
  );
};
