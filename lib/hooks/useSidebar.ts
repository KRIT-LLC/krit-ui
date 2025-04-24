import { useRef, useState } from 'react';
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
