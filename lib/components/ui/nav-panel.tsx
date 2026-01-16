import React from 'react';
import { Location } from 'react-router-dom';
import { cn } from '@/utils';
import { Nav, NavItem, NavSeparator } from './nav';

export interface NavPanelProps {
  /** @description Состояние сворачивания навигации */
  isCollapsed: boolean;
  /** @description Список навигации */
  navItems: NavItem[][];
  /** @description Название проекта */
  projectName: React.ReactNode;
  /** @description Компонент для отображения ссылок */
  linkComponent: React.ElementType;
  /** @description Слот для отображения профиля пользователя и смены темы
   * @example
   * <Nav
   *   isCollapsed={sidebar.isCollapsed}
   *   items={[
   *     {
   *       title: t('theme'),
   *       icon: theme === 'light' ? Sun : Moon,
   *       onClick: toggleTheme,
   *       variant: 'fade-contrast-transparent',
   *     },
   *     { title: t('logout'), icon: AccountCircle, onClick: logout, variant: 'fade-contrast-transparent' },
   *   ]}
   *   LinkComponent={NavLink}
   * />
   */
  profileNavSlot?: React.ReactNode;
  /** @description Слот для расширения навигации
   * @example
   * <Nav
   *   isCollapsed={sidebar.isCollapsed}
   *   items={[
   *     {
   *       title: sidebar.isCollapsed ? t('expand') : t('collapse'),
   *       icon: sidebar.isCollapsed ? LastPage : FirstPage,
   *       onClick: sidebar.isCollapsed ? sidebar.expand : sidebar.collapse,
   *       variant: 'fade-contrast-transparent',
   *     },
   *   ]}
   *   LinkComponent={NavLink}
   * />*/
  expandableNavSlot?: React.ReactNode;
  location?: Location;
  bottomSlot?: React.ReactNode;
}

const NavPanel = (props: NavPanelProps) => {
  const {
    isCollapsed,
    navItems,
    projectName,
    linkComponent,
    profileNavSlot,
    expandableNavSlot,
    location,
    bottomSlot,
  } = props;

  const getItemVariant = (item: NavItem) => {
    if (!location?.pathname) {
      return 'nav-item';
    }

    const currentPath = location.pathname;
    const itemPath = String(item.to || '');

    // Проверяем точное совпадение
    const isActive = currentPath === itemPath;

    // Проверяем, начинается ли текущий путь с пути пункта меню (для вложенных маршрутов)
    const isPathActive = itemPath && currentPath.startsWith(itemPath + '/');

    // Проверяем активность дочерних элементов
    const isChildActive = item.children?.some(child => {
      const childPath = String(child.to || '');
      return childPath && (currentPath === childPath || currentPath.startsWith(childPath + '/'));
    });

    const isItemActive = isActive || isPathActive || isChildActive;

    return isItemActive ? 'nav-item-selected' : 'nav-item';
  };

  const navBlocks = (navItems ?? []).map((block, index) => (
    <React.Fragment key={index}>
      {index !== 0 && <NavSeparator />}
      <Nav
        isCollapsed={isCollapsed}
        items={block}
        itemVariant={getItemVariant}
        LinkComponent={linkComponent}
        location={location}
      />
    </React.Fragment>
  ));

  return (
    <div className={cn('bg-background-sidebar', 'flex flex-col h-screen')}>
      <div
        className={cn(
          'text-sm px-2 leading-5 py-4 cursor-default whitespace-nowrap flex justify-normal',
          {
            'text-center justify-center': isCollapsed,
          },
        )}
      >
        {projectName}
      </div>
      <div
        className={
          'overflow-y-auto flex-col flex-grow [scrollbar-width:none] [-webkit-scrollbar-width:none] [-webkit-scrollbar:0px] [-webkit-appearance:none]'
        }
        style={{ msHighContrastAdjust: 'none' }}
      >
        {navBlocks}
        {profileNavSlot}
      </div>
      {expandableNavSlot && (
        <div className='mt-auto'>
          <div className='px-2'>{bottomSlot}</div>
          {expandableNavSlot}
        </div>
      )}
    </div>
  );
};

NavPanel.displayName = 'NavPanel';

export { NavPanel };
