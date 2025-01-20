import { BrowserRouter, NavLink } from 'react-router-dom';
import type { Meta, StoryFn } from '@storybook/react';
import { Moon, Sun } from 'lucide-react';
import { Nav } from '@/components/ui/nav';
import { NavPanel } from '@/components/ui/nav-panel';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useSidebar } from '@/hooks/useSidebar';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/utils';
import { AccountCircle, Assignment, FirstPage, Hardware, LastPage, Person } from '@/assets';
import styles from './NavPanel.module.css';

export default {
  title: 'NavPanel',
  component: NavPanel,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof NavPanel>;

export const Demo: StoryFn = () => {
  const sidebar = useSidebar();
  const { theme, toggleTheme } = useTheme();

  const profileNav = (
    <Nav
      isCollapsed={sidebar.isCollapsed}
      items={[
        {
          title: 'Тема',
          icon: theme === 'light' ? Sun : Moon,
          onClick: toggleTheme,
          variant: 'ghost',
        },
        {
          title: 'Выход',
          icon: AccountCircle,
          onClick: () => {},
          variant: 'ghost',
        },
      ]}
      LinkComponent={NavLink}
    />
  );

  const ExpandableNav = (
    <Nav
      isCollapsed={sidebar.isCollapsed}
      items={[
        {
          title: sidebar.isCollapsed ? 'Развернуть' : 'Свернуть',
          icon: sidebar.isCollapsed ? LastPage : FirstPage,
          onClick: sidebar.isCollapsed ? sidebar.expand : sidebar.collapse,
          variant: 'ghost',
        },
      ]}
      LinkComponent={NavLink}
    />
  );

  const nav = [
    [
      {
        title: 'Тест',
        to: '/1',
        icon: Hardware,
      },
      {
        title: 'Тест 2',
        to: '/',
        icon: Assignment,
      },
    ],
  ];

  const profile = (
    <div className={styles.profile} title={'Тестов Тест Тестович'}>
      <Person />
      {sidebar.isCollapsed ? null : <span>Тестов Тест Тестович</span>}
    </div>
  );

  return (
    <BrowserRouter>
      <ResizablePanelGroup
        className='h-full items-stretch'
        direction='horizontal'
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
        }}
      >
        <ResizablePanel
          ref={sidebar.ref}
          className={cn(
            'flex flex-col bg-background-secondary',
            sidebar.isCollapsed && 'min-w-[80px] transition-all duration-300 ease-in-out',
          )}
          defaultSize={sidebar.defaultLayout[0]}
          collapsedSize={4}
          collapsible={true}
          minSize={10}
          maxSize={15}
          onExpand={sidebar.expand}
          onCollapse={sidebar.collapse}
        >
          <TooltipProvider delayDuration={0}>
            <NavPanel
              isCollapsed={sidebar.isCollapsed}
              navItems={nav}
              projectName={profile}
              linkComponent={NavLink}
              profileNavSlot={profileNav}
              expandableNavSlot={ExpandableNav}
            />
          </TooltipProvider>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={sidebar.defaultLayout[1]} minSize={30}>
          Panel 2
        </ResizablePanel>
      </ResizablePanelGroup>
    </BrowserRouter>
  );
};
