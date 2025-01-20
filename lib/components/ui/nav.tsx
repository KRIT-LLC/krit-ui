import React, { FunctionComponent } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/utils';
import { ButtonVariant } from './button';
import { buttonVariants } from './buttonVariants';
import { Separator } from './separator';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

export interface NavItem {
  title: string;
  label?: string;
  icon:
    | LucideIcon
    | FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string | undefined }>;
  to?: string;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
}

interface NavProps {
  isCollapsed: boolean;
  items: NavItem[];
  itemVariant?: (item: NavItem) => ButtonVariant;
  LinkComponent: React.ElementType;
}

export function Nav(props: NavProps) {
  const {
    items,
    isCollapsed,
    itemVariant = item => item.variant || 'secondary-contrast',
    LinkComponent,
  } = props;

  return (
    <div
      data-collapsed={isCollapsed}
      className='group flex flex-col gap-4 py-4 data-[collapsed=true]:py-4'
    >
      <nav className='grid gap-3 px-3 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-3'>
        {items.map((item, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <LinkComponent
                  to={item.to ?? '#'}
                  className={cn(
                    buttonVariants({ variant: item.variant || itemVariant(item), size: 'icon' }),
                    'h-9 w-14',
                    item.className,
                  )}
                  onClick={(e: React.MouseEvent) => {
                    if (!item.to) e.preventDefault();
                    item.onClick?.();
                  }}
                >
                  <item.icon className='h-6 w-6' />
                  <span className='sr-only'>{item.title}</span>
                </LinkComponent>
              </TooltipTrigger>
              <TooltipContent side='right' className='flex items-center gap-4'>
                {item.title}
                {item.label && <span className='ml-auto text-muted-foreground'>{item.label}</span>}
              </TooltipContent>
            </Tooltip>
          ) : (
            <LinkComponent
              key={index}
              to={item.to ?? '#'}
              className={cn(
                buttonVariants({ variant: item.variant || itemVariant(item), size: 'sm' }),
                'justify-start gap-2 px-2',
                item.variant === 'primary' && 'justify-center',
                item.className,
              )}
              onClick={(e: React.MouseEvent) => {
                if (!item.to) e.preventDefault();
                item.onClick?.();
              }}
            >
              <item.icon className='h-6 w-6' />
              <span className='text-sm tracking-[0.25px] animate-in fade-in'>{item.title}</span>
              {item.label && (
                <span
                  className={cn(
                    'ml-auto',
                    item.variant === 'secondary-contrast' && 'text-background dark:text-white',
                  )}
                >
                  {item.label}
                </span>
              )}
            </LinkComponent>
          ),
        )}
      </nav>
    </div>
  );
}

export function NavSeparator() {
  return <Separator className='w-[calc(100%_-_24px)] ml-3 bg-line-primary' />;
}
