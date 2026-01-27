import { OptionType } from '@/components/ui/select';

type DataItem = {
  [key: string]: string | number | boolean | object;
};

const fillTemplate = (template?: string, item?: Record<string, unknown>) => {
  const result = template?.replace(/{(\w+)}/g, (_, key) => String(item?.[key] || '')) || '';
  // Удаляем пустые скобки и лишние пробелы
  return result.replace(/\s*\(\s*\)\s*/g, '').trim();
};

export function toOptions<T extends DataItem>({
  data = [],
  idField,
  nameField,
  additionalNameField,
  labelTemplate,
  lockedValues = [],
  lowerCaseValues = false,
}: {
  data: T[] | undefined;
  idField: keyof T;
  nameField?: keyof T;
  additionalNameField?: keyof T;
  labelTemplate?: string;
  lockedValues?: string[] | undefined;
  lowerCaseValues?: boolean;
}): OptionType[] {
  if (!Array.isArray(data) || !data.length || !idField) {
    return [];
  }
  return data.map(item => {
    return {
      value: lowerCaseValues
        ? String(item[idField] ?? '').toLowerCase()
        : String(item[idField] ?? ''),
      label: labelTemplate
        ? fillTemplate(labelTemplate, item)
        : (nameField ? String(item[nameField]) : '') +
          (additionalNameField && item[additionalNameField]
            ? ` - ${item[additionalNameField]}`
            : ''),
      disabled: lockedValues?.includes(String(item[idField])),
    };
  });
}
