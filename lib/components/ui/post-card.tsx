import * as React from 'react';
import { cn } from '@/utils';
import ArrowBack from '@/assets/arrow_back.svg?react';
import MoreVertIcon from '@/assets/more_vert.svg?react';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './resizable';

export interface DropdownAction {
  /** Текст действия */
  text: string;
  /** Обработчик клика */
  onClick: () => void;
  /** Отключено ли действие */
  disabled?: boolean;
}

interface PostCardHeaderProps {
  /** Префикс заголовка (отображается серым цветом) */
  titlePrefix?: string;
  /** Основной текст заголовка (отображается основным цветом, с обрезкой при переполнении) */
  titleText?: string;
  /** Слот для кнопок действий (может содержать одну или несколько кнопок) */
  buttonsSlot?: React.ReactNode;
  /** Массив действий для выпадающего меню */
  dropDownButtons?: DropdownAction[];
  /** Callback-функция для кнопки "Назад" */
  onBack?: () => void;
  /** Дополнительные CSS-классы для корневого элемента */
  className?: string;
}

/**
 * Компонент заголовка карточки поста с поддержкой заголовка и кнопок действий.
 * Используется для отображения заголовка карточки с действиями в правой части.
 *
 * @component
 * @param {PostCardHeaderProps} props - Пропсы компонента
 * @param {string} [props.titlePrefix] - Префикс заголовка (отображается серым цветом)
 * @param {string} [props.titleText] - Основной текст заголовка (отображается основным цветом, с обрезкой при переполнении)
 * @param {React.ReactNode} [props.buttonsSlot] - Слот для кнопок действий
 * @param {DropdownAction[]} [props.dropDownButtons] - Массив действий для выпадающего меню
 * @param {() => void} [props.onBack] - Callback-функция для кнопки "Назад"
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @returns {JSX.Element}
 *
 * @example
 * <PostCardHeader
 *   titlePrefix="223-CR"
 *   titleText="Title"
 *   onBack={() => console.log('back')}
 *   buttonsSlot={
 *     <Button variant="theme-filled">Кнопка</Button>
 *   }
 *   dropDownButtons={[
 *     { text: 'Редактировать', onClick: () => console.log('edit') },
 *     { text: 'Удалить', onClick: () => console.log('delete') },
 *   ]}
 * />
 */
const PostCardHeader = ({
  titlePrefix,
  titleText,
  buttonsSlot,
  dropDownButtons,
  onBack,
  className,
}: PostCardHeaderProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between px-6 py-4 border-b border-line-primary',
        className,
      )}
    >
      <div className='flex items-center gap-2 min-w-0 flex-1 text-2xl font-medium'>
        {onBack && (
          <div
            className='p-2 cursor-pointer hover:text-foreground-primary-disabled flex-shrink-0'
            onClick={onBack}
          >
            <ArrowBack />
          </div>
        )}
        {titlePrefix && (
          <span className='text-foreground-tertiary whitespace-nowrap'>{titlePrefix}</span>
        )}
        {titleText && (
          <span className='text-foreground-primary truncate' title={titleText}>
            {titleText}
          </span>
        )}
      </div>
      <div className='flex items-center gap-2 flex-shrink-0'>
        {buttonsSlot}
        {dropDownButtons && dropDownButtons.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='fade-contrast-transparent' size='icon'>
                <MoreVertIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {dropDownButtons.map((action, index) => (
                <DropdownMenuItem key={index} onClick={action.onClick} disabled={action.disabled}>
                  {action.text}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};
PostCardHeader.displayName = 'PostCardHeader';

export interface PostCardBodyField {
  /** Метка поля */
  label: string;
  /** Значение поля (может быть строкой или React-элементом) */
  value: string | React.ReactNode;
}

export interface PostCardBodySection {
  /** Массив полей в секции */
  fields: PostCardBodyField[];
}

interface PostCardBodyProps {
  /** Массив секций с полями */
  sections?: PostCardBodySection[];
  /** Дополнительные CSS-классы для корневого элемента */
  className?: string;
}

/**
 * Компонент тела карточки поста для отображения структурированной информации в формате ключ-значение.
 * Поддерживает группировку полей в секции с разделителями.
 *
 * @component
 * @param {PostCardBodyProps} props - Пропсы компонента
 * @param {PostCardBodySection[]} [props.sections] - Массив секций с полями
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @returns {JSX.Element}
 *
 * @example
 * <PostCardBody
 *   sections={[
 *     {
 *       fields: [
 *         { label: 'Статус', value: <Badge>Выполнен</Badge> },
 *         { label: 'Приоритет', value: 'Неотложный' },
 *         { label: 'Название', value: 'Ремонт конвейерной ленты' },
 *       ],
 *     },
 *     {
 *       fields: [
 *         { label: 'Описание', value: 'Длинное описание...' },
 *       ],
 *     },
 *   ]}
 * />
 */
const PostCardBody = ({ sections, className }: PostCardBodyProps) => {
  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <div className={cn('flex flex-col', className)}>
      {sections.map((section, sectionIndex) => (
        <div
          key={sectionIndex}
          className='py-4 border-b border-line-primary first:pt-0 last:border-b-0 last:pb-0'
        >
          <table className='w-full border-separate border-spacing-0'>
            <tbody>
              {section.fields.map((field, fieldIndex) => (
                <tr key={fieldIndex} className='align-text-top first:[&>td]:pt-0 last:[&>td]:pb-0'>
                  <td className='min-w-[160px] w-[160px] pr-1 py-1 text-foreground-primary text-sm leading-5 font-medium tracking-[0.25px]'>
                    {field.label}
                  </td>
                  <td className='py-1 px-1 text-foreground-primary text-sm leading-5 max-w-[1px] tracking-[0.25px]'>
                    {field.value || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};
PostCardBody.displayName = 'PostCardBody';

interface PostCardSidebarProps {
  /** Дочерние элементы сайдбара (вертикально расположенные компоненты) */
  children?: React.ReactNode;
  /** Дополнительные CSS-классы для корневого элемента */
  className?: string;
}

/**
 * Компонент сайдбара карточки поста для вертикального расположения элементов.
 * Используется для отображения дополнительных компонентов (карусель, виджеты и т.д.) в боковой панели.
 *
 * @component
 * @param {PostCardSidebarProps} props - Пропсы компонента
 * @param {React.ReactNode} [props.children] - Дочерние элементы сайдбара
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @returns {JSX.Element}
 *
 * @example
 * <PostCardSidebar>
 *   <Carousel>...</Carousel>
 *   <WidgetPlanFact rows={[...]} />
 * </PostCardSidebar>
 */
const PostCardSidebar = ({ children, className }: PostCardSidebarProps) => {
  return <div className={cn('flex flex-col gap-2', className)}>{children}</div>;
};
PostCardSidebar.displayName = 'PostCardSidebar';

interface PostCardLeftPanelItemProps {
  /** Слот для заголовка элемента (flex с gap 16px и space-between) */
  headerSlot?: React.ReactNode;
  /** Слот для основного контента элемента */
  contentSlot?: React.ReactNode;
  /** Слот для футера элемента (flex с gap 16px и space-between) */
  footerSlot?: React.ReactNode;
  /** Выбран ли элемент */
  selected?: boolean;
  /** Обработчик клика */
  onClick?: () => void;
  /** Дополнительные CSS-классы */
  className?: string;
}

/**
 * Элемент списка левой панели карточки поста.
 * Используется для отображения отдельного элемента в списке PostCardLeftPanel.
 *
 * @component
 * @param {PostCardLeftPanelItemProps} props - Пропсы компонента
 * @param {React.ReactNode} [props.headerSlot] - Слот для заголовка элемента
 * @param {React.ReactNode} [props.contentSlot] - Слот для основного контента элемента
 * @param {React.ReactNode} [props.footerSlot] - Слот для футера элемента
 * @param {boolean} [props.selected] - Выбран ли элемент
 * @param {() => void} [props.onClick] - Обработчик клика
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @returns {JSX.Element}
 *
 * @example
 * <PostCardLeftPanelItem
 *   selected
 *   onClick={() => console.log('clicked')}
 *   headerSlot={<div>223-CR</div>}
 *   contentSlot={<div>Ремонт конвейерной ленты</div>}
 *   footerSlot={<div>РМ01—Плановый заказ...</div>}
 * />
 */
const PostCardLeftPanelItem = ({
  headerSlot,
  contentSlot,
  footerSlot,
  selected,
  onClick,
  className,
}: PostCardLeftPanelItemProps) => {
  const hasContent = headerSlot || contentSlot || footerSlot;

  if (!hasContent) {
    return null;
  }

  return (
    <li
      className={cn(
        'px-4 py-3 flex flex-col gap-2 text-sm leading-5 border-t border-line-primary first:border-t-0 text-foreground-primary cursor-pointer',
        {
          'bg-background-primary-selected': selected,
        },
        className,
      )}
      onClick={onClick}
    >
      {headerSlot && <div className='flex items-center justify-between gap-4'>{headerSlot}</div>}
      {contentSlot && <div>{contentSlot}</div>}
      {footerSlot && <div className='flex items-center justify-between gap-4'>{footerSlot}</div>}
    </li>
  );
};
PostCardLeftPanelItem.displayName = 'PostCardLeftPanelItem';

interface PostCardLeftPanelProps {
  /** Слот для сортировки (отображается сверху) */
  sortSlot?: React.ReactNode;
  /** Дочерние элементы списка (PostCardLeftPanelItem) */
  children?: React.ReactNode;
  /** Слот для пагинации (отображается снизу) */
  paginationSlot?: React.ReactNode;
  /** Дополнительные CSS-классы для корневого элемента */
  className?: string;
}

/**
 * Левая панель карточки поста со списком элементов.
 * Используется для отображения списка элементов с поддержкой сортировки и пагинации.
 *
 * @component
 * @param {PostCardLeftPanelProps} props - Пропсы компонента
 * @param {React.ReactNode} [props.sortSlot] - Слот для сортировки (отображается сверху)
 * @param {React.ReactNode} [props.children] - Дочерние элементы списка
 * @param {React.ReactNode} [props.paginationSlot] - Слот для пагинации (отображается снизу)
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @returns {JSX.Element}
 *
 * @example
 * <PostCardLeftPanel
 *   sortSlot={<div>Сортировка</div>}
 *   paginationSlot={<Pagination />}
 * >
 *   <PostCardLeftPanelItem selected>Элемент 1</PostCardLeftPanelItem>
 *   <PostCardLeftPanelItem>Элемент 2</PostCardLeftPanelItem>
 * </PostCardLeftPanel>
 */
const PostCardLeftPanel = ({
  sortSlot,
  children,
  paginationSlot,
  className,
}: PostCardLeftPanelProps) => {
  return (
    <div
      className={cn(
        'flex flex-col bg-background-primary border-r border-line-primary h-full min-h-0',
        className,
      )}
    >
      {sortSlot && (
        <div className='px-4 py-1 border-b border-line-primary flex-shrink-0'>{sortSlot}</div>
      )}
      <ul className='flex flex-col overflow-y-auto flex-1 min-h-0'>{children}</ul>
      {paginationSlot && (
        <div className='px-4 border-t border-line-primary flex-shrink-0 [&>*:first-child]:px-0 [&>*]:border-none [&>*]:p-0 [&>*]:h-[unset] [&>*]:min-h-[unset] [&>*]:w-full [&>*]:rounded-none'>
          {paginationSlot}
        </div>
      )}
    </div>
  );
};
PostCardLeftPanel.displayName = 'PostCardLeftPanel';

export interface PostCardLeftPanelResizableConfig {
  /** Размер левой панели по умолчанию в процентах */
  defaultSize?: number;
  /** Минимальный размер левой панели в процентах */
  minSize?: number;
  /** Максимальный размер левой панели в процентах */
  maxSize?: number;
  /** ID для автоматического сохранения размера панели */
  autoSaveId?: string;
}

interface PostCardProps {
  /** Слот для левой панели (отображается слева, высота равна headerSlot + bodySlot/sidebarSlot) */
  leftPanelSlot?: React.ReactNode;
  /** Конфигурация для изменения размера левой панели. Если передана, левая панель становится изменяемой */
  leftPanelResizable?: PostCardLeftPanelResizableConfig;
  /** Слот для заголовка карточки (отображается сверху на всю ширину) */
  headerSlot?: React.ReactNode;
  /** Слот для основного контента карточки (отображается слева) */
  bodySlot?: React.ReactNode;
  /** Слот для сайдбара карточки (отображается справа, фиксированная ширина 340px) */
  sidebarSlot?: React.ReactNode;
  /** Слот для дополнительного контента карточки (отображается под bodySlot и sidebarSlot) */
  contentSlot?: React.ReactNode;
  /** Дополнительные CSS-классы для корневого элемента */
  className?: string;
  /** Отображать ли верхнюю границу */
  withTopBorder?: boolean;
}

/**
 * Обертка карточки поста с поддержкой левой панели, заголовка, основного контента и сайдбара.
 * Используется для отображения структурированной информации в виде карточки.
 *
 * @component
 * @param {PostCardProps} props - Пропсы компонента
 * @param {React.ReactNode} [props.leftPanelSlot] - Слот для левой панели (отображается слева)
 * @param {PostCardLeftPanelResizableConfig} [props.leftPanelResizable] - Конфигурация для изменения размера левой панели
 * @param {React.ReactNode} [props.headerSlot] - Слот для заголовка карточки
 * @param {React.ReactNode} [props.bodySlot] - Слот для основного контента
 * @param {React.ReactNode} [props.sidebarSlot] - Слот для сайдбара
 * @param {React.ReactNode} [props.contentSlot] - Слот для дополнительного контента (отображается под bodySlot и sidebarSlot)
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @param {boolean} [props.withTopBorder] - Отображать ли верхнюю границу
 * @returns {JSX.Element}
 *
 * @example
 * <PostCard
 *   leftPanelSlot={<PostCardLeftPanel>...</PostCardLeftPanel>}
 *   headerSlot={<PostCardHeader titlePrefix="223-CR" titleText="Title" />}
 *   bodySlot={<PostCardBody sections={[...]} />}
 *   sidebarSlot={<PostCardSidebar>...</PostCardSidebar>}
 *   contentSlot={<div>Дополнительный контент</div>}
 * />
 *
 * @example
 * <PostCard
 *   leftPanelSlot={<PostCardLeftPanel>...</PostCardLeftPanel>}
 *   leftPanelResizable={{ defaultSize: 25, minSize: 15, maxSize: 50, autoSaveId: 'machinery-panel' }}
 *   headerSlot={<PostCardHeader titlePrefix="223-CR" titleText="Title" />}
 *   bodySlot={<PostCardBody sections={[...]} />}
 * />
 */
const PostCard = ({
  leftPanelSlot,
  leftPanelResizable,
  headerSlot,
  bodySlot,
  sidebarSlot,
  contentSlot,
  className,
  withTopBorder = false,
}: PostCardProps) => {
  const hasContent = leftPanelSlot || headerSlot || bodySlot || sidebarSlot || contentSlot;

  if (!hasContent) {
    return null;
  }

  const mainContent = (
    <div className='flex flex-col flex-1 min-w-0'>
      {headerSlot}
      {(bodySlot || sidebarSlot) && (
        <div className='flex gap-6 px-6 py-6'>
          {bodySlot && <div className='flex-1 min-w-0'>{bodySlot}</div>}
          {sidebarSlot && <div className='w-[340px] flex-shrink-0'>{sidebarSlot}</div>}
        </div>
      )}
      {contentSlot && <div className='px-6 pb-6'>{contentSlot}</div>}
    </div>
  );

  // Если передана конфигурация для Resizable, используем ResizablePanelGroup
  if (leftPanelSlot && leftPanelResizable) {
    const { defaultSize = 25, minSize = 15, maxSize = 50, autoSaveId } = leftPanelResizable;

    return (
      <div
        className={cn(
          'bg-background-primary flex w-full h-full flex-1 flex flex-col',
          { 'border-t border-line-primary': withTopBorder },
          className,
        )}
      >
        <ResizablePanelGroup
          direction='horizontal'
          className='flex-1 overflow-hidden'
          autoSaveId={autoSaveId}
        >
          <ResizablePanel
            defaultSize={defaultSize}
            minSize={minSize}
            maxSize={maxSize}
            className='overflow-auto flex-1'
          >
            <div className='h-full bg-background-primary border-r border-line-primary'>
              {leftPanelSlot}
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={50} className='overflow-hidden'>
            {mainContent}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    );
  }

  // Стандартная логика без Resizable
  return (
    <div
      className={cn(
        'bg-background-primary flex w-full flex-1',
        { 'border-t border-line-primary': withTopBorder },
        className,
      )}
    >
      {leftPanelSlot && (
        <div className='w-[346px] flex-shrink-0 border-r border-line-primary'>{leftPanelSlot}</div>
      )}
      {mainContent}
    </div>
  );
};
PostCard.displayName = 'PostCard';

export {
  PostCardHeader,
  PostCardBody,
  PostCardSidebar,
  PostCard,
  PostCardLeftPanel,
  PostCardLeftPanelItem,
};
