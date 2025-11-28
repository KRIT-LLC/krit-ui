import { useEffect, useRef, useState } from 'react';
import { ImperativePanelHandle } from 'react-resizable-panels';
import { cookies } from '@/lib/cookies';

export const useSidebar = (collapsedLayout = [4, 96], expandedLayout = [12, 88]) => {
  const layoutName = 'react-resizable-panels:layout';
  const collapsedName = 'react-resizable-panels:collapsed';
  const layout = cookies().get(layoutName);
  const collapsed = cookies().get(collapsedName);
  const defaultLayout = layout ? JSON.parse(layout) : collapsedLayout;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed) : false;
  const [isCollapsed, setIsCollapsed] = useState<boolean>(defaultCollapsed);

  const ref = useRef<ImperativePanelHandle>(null);

  const updateSidebarWidth = () => {
    // Ищем первый ResizablePanel (sidebar) в DOM
    const panels = document.querySelectorAll('[data-panel-id]');
    if (panels.length > 0) {
      // Первый панель обычно sidebar
      const sidebarPanel = panels[0] as HTMLElement;
      const width = sidebarPanel.getBoundingClientRect().width;
      document.documentElement.style.setProperty('--sidebar-width', `${width}px`);
    } else {
      // Fallback: устанавливаем 0 если панель не найдена
      document.documentElement.style.setProperty('--sidebar-width', '0px');
    }
  };

  useEffect(() => {
    // Обновляем ширину при монтировании и изменении состояния
    updateSidebarWidth();

    // Находим ResizablePanelGroup для отслеживания изменений
    const panelGroup = document.querySelector('[data-panel-group]');
    if (!panelGroup) {
      return;
    }

    // Используем ResizeObserver для отслеживания изменений размера панелей
    const resizeObserver = new ResizeObserver(() => {
      updateSidebarWidth();
    });

    // Наблюдаем за всеми панелями в группе
    const observePanels = () => {
      const panels = panelGroup.querySelectorAll('[data-panel-id]');
      panels.forEach(panel => {
        resizeObserver.observe(panel);
      });
    };

    observePanels();

    // Отслеживаем появление новых панелей через MutationObserver
    const mutationObserver = new MutationObserver(() => {
      observePanels();
      updateSidebarWidth();
    });

    mutationObserver.observe(panelGroup, {
      childList: true,
      subtree: true,
    });

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [isCollapsed]);

  const collapse = () => {
    ref.current?.resize(collapsedLayout[0]);
    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`;
    setIsCollapsed(true);
  };

  const expand = () => {
    ref.current?.resize(expandedLayout[0]);
    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`;
    setIsCollapsed(false);
  };

  return { layoutName, collapsedName, defaultLayout, isCollapsed, ref, collapse, expand };
};
