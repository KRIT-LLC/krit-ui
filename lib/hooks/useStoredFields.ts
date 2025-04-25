import { useState } from 'react';

export const useStoredFields = (storageKey: string, defaultFields: string[] = []) => {
  const setFilterFields = (fields: string[]) => {
    localStorage.setItem(storageKey, JSON.stringify(fields));
  };

  const getFilterFields = (): string[] => {
    const value = localStorage.getItem(storageKey);
    return value ? JSON.parse(value) : defaultFields;
  };

  const [fields, setFields] = useState<string[]>(getFilterFields());

  const handleFieldsChange = (newFields: string[]) => {
    setFilterFields(newFields);
    setFields(newFields);
  };
  return {
    fields,
    handleFieldsChange,
  };
};
