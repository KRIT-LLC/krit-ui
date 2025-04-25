import { useState } from 'react';

export const useStoredTabs = (defaultTab: string, storageKey: string) => {
  const setView = (view: string) => localStorage.setItem(storageKey, view);
  const getView = (): string => localStorage.getItem(storageKey) || defaultTab;
  const [tab, setTab] = useState(getView());
  const handleTabChange = (newTab: string) => {
    setView(newTab);
    setTab(newTab);
  };
  return {
    tab,
    handleTabChange,
  };
};
