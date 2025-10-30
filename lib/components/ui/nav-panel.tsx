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
   *       variant: 'ghost',
   *     },
   *     { title: t('logout'), icon: AccountCircle, onClick: logout, variant: 'ghost' },
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
   *       variant: 'ghost',
   *     },
   *   ]}
   *   LinkComponent={NavLink}
   * />*/
  expandableNavSlot?: React.ReactNode;
  location?: Location;
  bottomSlot?: React.ReactNode;
  withBackground?: boolean;
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
    withBackground = false,
  } = props;

  const getItemVariant = (item: NavItem) => {
    if (withBackground) {
      return location?.pathname === String(item.to) ? 'nav-item-selected' : 'nav-item';
    }
    location?.pathname === String(item.to) ? 'secondary-contrast' : 'ghost';
  };

  const navBlocks = (navItems ?? []).map((block, index) => (
    <React.Fragment key={index}>
      {index !== 0 && <NavSeparator />}
      <Nav
        isCollapsed={isCollapsed}
        items={block}
        itemVariant={getItemVariant}
        LinkComponent={linkComponent}
      />
    </React.Fragment>
  ));

  return (
    <div className={cn(withBackground && 'bg-background-sidebar')}>
      <div
        className={cn(
          'text-[14px] px-[12px] leading-5 py-4 cursor-default whitespace-nowrap flex justify-normal',
          {
            'text-center justify-center': isCollapsed,
          },
        )}
      >
        {projectName}
      </div>
      {withBackground ? null : <NavSeparator />}
      <div className={'overflow-y-auto h-[calc(100vh_-_140px)] flex flex-col'}>
        {navBlocks}
        {withBackground ? null : <NavSeparator />}
        {profileNavSlot}
        {bottomSlot && <div className='px-3 mt-auto'>{bottomSlot}</div>}
      </div>
      {expandableNavSlot && (
        <div className='mt-auto'>
          {withBackground ? null : <NavSeparator />}
          {expandableNavSlot}
        </div>
      )}
    </div>
  );
};

NavPanel.displayName = 'NavPanel';

export { NavPanel };
