import React, { FunctionComponent, useState } from 'react';
import { Location } from 'react-router-dom';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { ChevronRight, LucideIcon } from 'lucide-react';
import { cn } from '@/utils';
import { Button, ButtonVariant } from './button';
import { buttonVariants } from './buttonVariants';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Separator } from './separator';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

/**
 * Интерфейс для элемента навигации
 * @interface NavItem
 * @property {string} title - Заголовок элемента навигации
 * @property {string} [label] - Дополнительная метка элемента
 * @property {LucideIcon|FunctionComponent} [icon] - Иконка элемента (Lucide или React компонент)
 * @property {string} [to] - Ссылка для перехода
 * @property {ButtonVariant} [variant] - Вариант стиля кнопки
 * @property {string} [className] - Дополнительные CSS-классы
 * @property {function} [onClick] - Обработчик клика
 * @property {NavItem[]} [children] - Вложенные элементы навигации
 */
export interface NavItem {
  title: string;
  label?: string;
  icon?:
    | LucideIcon
    | FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string | undefined }>;
  to?: string;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  children?: NavItem[];
}

/**
 * Пропсы компонента навигации
 * @interface NavProps
 * @property {boolean} isCollapsed - Состояние сворачивания навигации
 * @property {NavItem[]} items - Массив элементов навигации
 * @property {function} [itemVariant] - Функция для определения варианта стиля элемента
 * @property {React.ElementType} LinkComponent - Компонент для отображения ссылок
 * @property {Location} [location] - Объект location из react-router для определения активных элементов
 */
interface NavProps {
  isCollapsed: boolean;
  items: NavItem[];
  itemVariant?: (item: NavItem) => ButtonVariant;
  LinkComponent: React.ElementType;
  location?: Location;
}

/**
 * Компонент навигации с поддержкой сворачивания и тултипов
 * @component
 * @param {NavProps} props - Пропсы компонента
 * @returns {JSX.Element} Элемент навигации
 */
const POPOVER_CONTENT_CLASS =
  'p-2 w-48 border-0 shadow-lg rounded-xl bg-[hsl(var(--background-popover-menu))] text-white';
const POPOVER_CHILD_CLASS = 'justify-start gap-2 px-2 min-w-0 text-white hover:text-white';
const POPOVER_TEXT_CLASS = 'text-sm truncate min-w-0 flex-1 text-white';
const POPOVER_ICON_CLASS = 'h-4 w-4 flex-shrink-0 text-white';

const PopoverChildren = ({
  children,
  itemVariant,
  LinkComponent,
  onChildClick,
}: {
  children: NavItem[];
  itemVariant: (item: NavItem) => ButtonVariant;
  LinkComponent: React.ElementType;
  onChildClick: () => void;
}) => (
  <nav className='flex flex-col gap-1.5'>
    {children.map((child, childIndex) => (
      <LinkComponent
        key={childIndex}
        to={child.to ?? '#'}
        className={cn(
          buttonVariants({
            variant: child.variant || itemVariant(child),
            size: 'sm',
          }),
          POPOVER_CHILD_CLASS,
          child.className,
        )}
        onClick={(e: React.MouseEvent) => {
          if (!child.to) e.preventDefault();
          child.onClick?.();
          onChildClick();
        }}
      >
        {child.icon && <child.icon className={POPOVER_ICON_CLASS} />}
        <span className={POPOVER_TEXT_CLASS}>{child.title}</span>
        {child.label && <span className='ml-auto flex-shrink-0 text-white'>{child.label}</span>}
      </LinkComponent>
    ))}
  </nav>
);

const NavItemComponent = ({
  item,
  index,
  isCollapsed,
  itemVariant,
  LinkComponent,
}: {
  item: NavItem;
  index: number;
  isCollapsed: boolean;
  itemVariant: (item: NavItem) => ButtonVariant;
  LinkComponent: React.ElementType;
}) => {
  const hasChildren = item.children && item.children.length > 0;
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (e: React.MouseEvent, onClick?: () => void) => {
    if (!item.to) e.preventDefault();
    onClick?.();
  };

  const buttonClasses = cn(
    buttonVariants({
      variant: item.variant || itemVariant(item),
      size: isCollapsed ? 'icon' : 'sm',
    }),
    !isCollapsed && 'justify-start gap-2 px-2 min-w-0 w-full',
    item.variant === 'primary' && 'justify-center',
    item.className,
  );

  const TooltipWrapper = ({ children }: { children: React.ReactNode }) => (
    <TooltipProvider key={index}>
      <Tooltip delayDuration={0}>
        {children}
        <TooltipContent side='right' className='flex items-center gap-4'>
          {item.title}
          {item.label && <span className='ml-auto text-muted-foreground'>{item.label}</span>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  if (isCollapsed) {
    if (hasChildren) {
      return (
        <TooltipWrapper>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <button className={buttonClasses} onClick={handleToggle}>
                  {item.icon && <item.icon className='h-6 w-6' />}
                  <span className='sr-only'>{item.title}</span>
                </button>
              </PopoverTrigger>
            </TooltipTrigger>
            <PopoverContent side='right' align='start' className={POPOVER_CONTENT_CLASS}>
              <PopoverChildren
                children={item.children!}
                itemVariant={itemVariant}
                LinkComponent={LinkComponent}
                onChildClick={() => setIsOpen(false)}
              />
            </PopoverContent>
          </Popover>
        </TooltipWrapper>
      );
    }

    return (
      <TooltipWrapper>
        <TooltipTrigger asChild>
          <LinkComponent
            to={item.to ?? '#'}
            className={buttonClasses}
            onClick={(e: React.MouseEvent) => handleLinkClick(e, item.onClick)}
          >
            {item.icon && <item.icon className='h-6 w-6' />}
            <span className='sr-only'>{item.title}</span>
          </LinkComponent>
        </TooltipTrigger>
      </TooltipWrapper>
    );
  }

  if (hasChildren) {
    return (
      <Popover key={index} open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant='link' className={buttonClasses} onClick={handleToggle}>
            {item.icon && <item.icon className='h-6 w-6 flex-shrink-0' />}
            <span className='text-sm tracking-[0.25px] animate-in fade-in truncate min-w-0 flex-1 text-left'>
              {item.title}
            </span>
            {item.label && (
              <span
                className={cn(
                  'ml-auto flex-shrink-0',
                  item.variant === 'secondary-contrast' && 'text-background dark:text-white',
                )}
              >
                {item.label}
              </span>
            )}
            <ChevronRight className='h-4 w-4 flex-shrink-0 transition-transform' />
          </Button>
        </PopoverTrigger>
        <PopoverContent side='right' align='start' className={POPOVER_CONTENT_CLASS}>
          <PopoverChildren
            children={item.children!}
            itemVariant={itemVariant}
            LinkComponent={LinkComponent}
            onChildClick={() => setIsOpen(false)}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <LinkComponent
      key={index}
      to={item.to ?? '#'}
      className={buttonClasses}
      onClick={(e: React.MouseEvent) => handleLinkClick(e, item.onClick)}
    >
      {item.icon && <item.icon className='h-6 w-6 flex-shrink-0' />}
      <span className='text-sm tracking-[0.25px] animate-in fade-in truncate min-w-0 flex-1'>
        {item.title}
      </span>
      {item.label && (
        <span
          className={cn(
            'ml-auto flex-shrink-0',
            item.variant === 'secondary-contrast' && 'text-background dark:text-white',
          )}
        >
          {item.label}
        </span>
      )}
    </LinkComponent>
  );
};

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
      <nav className='grid gap-1.5 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
        {items.map((item, index) => (
          <NavItemComponent
            key={index}
            item={item}
            index={index}
            isCollapsed={isCollapsed}
            itemVariant={itemVariant}
            LinkComponent={LinkComponent}
          />
        ))}
      </nav>
    </div>
  );
}

/**
 * Разделитель для навигации
 * @component
 * @returns {JSX.Element} Элемент разделителя
 */
export function NavSeparator() {
  return <Separator className='w-[calc(100%_-_24px)] ml-3 bg-line-secondary' />;
}
