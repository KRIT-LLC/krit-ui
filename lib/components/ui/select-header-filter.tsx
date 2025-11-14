import { ReactNode, useEffect, useMemo } from 'react';
import { Column, Table } from '@tanstack/react-table';
import { useTranslation } from '@/hooks/useTranslation';
import { Checkbox } from './checkbox';
import { Input } from './input';
import { ScrollArea } from './scroll-area';
import { Separator } from './separator';

export type Options<T> =
  | T[]
  | {
      value: T;
      label?: ReactNode;
      labelText?: string; // Используется для фильтрации при поиске в случае, если label - это компонент
    }[];
export type Option<T = string | number> = Options<T>[number];

const getOptionValue = <T,>(option: Option<T>) => {
  if (option && typeof option === 'object' && 'value' in option) return option.value as T;
  if (typeof option === 'string') return option;
  else return option as T;
};

const getOptionLabel = <T,>(option: Option<T>) => {
  if (option && typeof option === 'object' && 'label' in option) {
    if (option.label && typeof option.label === 'object' && 'props' in option.label) {
      return { text: option.labelText ?? option.label.props.children, raw: option.label };
    }
    return { text: option.labelText || option.label, raw: option.label };
  }
  if (typeof option === 'string') return { text: option, raw: option };
  else return { raw: option as ReactNode };
};

type ColumnFilterProps<T = string | number> = {
  table?: Table<any>;
  column?: Column<any, unknown>;
  excludeAllLabel?: string;
  options?: Options<T>;
  checked?: Options<T>;
  disabled?: string[] | number[];
  hidden?: string[] | number[];
  search?: string;
  radio?: boolean;
  onSearchChange?: (search: string) => void;
  onCheckedChange?: (checked: Options<T> | undefined) => void;
};

export const SelectHeaderFilter = <T,>({
  table,
  column,
  excludeAllLabel,
  options = [],
  checked,
  disabled = [],
  hidden = [],
  search = '',
  radio,
  onSearchChange,
  onCheckedChange,
}: ColumnFilterProps<T>) => {
  const { t } = useTranslation();
  const filterString = JSON.stringify(column?.getFilterValue() || '');

  useEffect(() => {
    onCheckedChange?.(column?.getFilterValue() as Options<T> | undefined);
  }, [filterString]);

  const filterOption = (option: Options<T>[number]) => {
    if (typeof option === 'object' && option && 'label' in option) {
      return getOptionLabel(option)?.text?.toLowerCase().includes(search.toLowerCase());
    } else if (typeof option === 'string') {
      return option.toLowerCase().includes(search.toLowerCase());
    } else {
      return true;
    }
  };

  const filteredOptions = useMemo(() => {
    if (!column || !table || !options) return [];
    return options.filter(filterOption) as Options<T>;
  }, [table, column, search, options]);

  // Если только 2 опции в фильтре и значение первой опции типа boolean, то ограничиваем выбор только одной опцией
  const isRadioButtons =
    radio ??
    (options &&
      options.length === 2 &&
      (typeof options[0] === 'object' && options[0] !== null && 'value' in options[0]
        ? typeof options[0].value === 'boolean'
        : typeof options[0] === 'boolean'));

  const onChange = (value: T, active?: boolean) => {
    if (value === 'all' || value === null) {
      const allValues = options.map(option => getOptionValue(option));
      const checkedValues = checked?.map(option => getOptionValue(option)) || [];

      // Оставляем скрытые и отключённые чекбоксы в исходном состоянии
      const disabledValues = (disabled || []) as T[];
      const hiddenValues = (hidden || []) as T[];
      const inactive = [...disabledValues, ...hiddenValues];
      const inactiveChecked = inactive.filter(value => checkedValues.includes(value));
      const inactiveUnchecked = inactive.filter(value => !checkedValues.includes(value));

      const allExceptInactive = allValues.filter(value => !inactiveUnchecked.includes(value));
      const noneExceptInactive = inactiveChecked.length ? inactiveChecked : undefined;

      const all = active ? allExceptInactive : noneExceptInactive;
      const none = active ? [value, ...inactive] : inactive.filter(item => item !== value);

      return onCheckedChange?.(value === 'all' ? all : none);
    }
    if (checked === undefined) {
      onCheckedChange?.([value]);
    } else {
      const checkedValues = checked.map(option => getOptionValue(option));
      const option = options.find(option => getOptionValue(option) === value);
      if (active && option) {
        const optionValue = getOptionValue(option);
        checkedValues.push(optionValue);
      } else {
        checkedValues.splice(checkedValues.indexOf(value), 1);
      }
      const newChecked = checkedValues.length ? (checkedValues as Options<T>) : undefined;
      const newRadio = active ? [value] : [];
      onCheckedChange?.(isRadioButtons ? newRadio : newChecked);
    }
  };

  const getIsAllChecked = () => {
    const checkedArray = checked || [];
    const hiddenArray = hidden || [];

    const checkedSize = new Set([...checkedArray, ...hiddenArray]).size;
    const values = options.map(option => getOptionValue(option)) as unknown[];
    const totalSize = new Set([...values, ...hiddenArray]).size;
    return checkedSize === totalSize;
  };

  const allUnchecked = checked && checked.at(0) === null;
  const allChecked = getIsAllChecked();

  const optionChecked = (option: T) =>
    allChecked || checked?.some(item => getOptionValue(item) === option);

  const optionDisabled = (option: T) => disabled.some(item => getOptionValue(item) === option);

  const optionHidden = (option: T) => hidden.some(item => getOptionValue(item) === option);

  return (
    <div className='flex flex-col items-start gap-4 justify-center w-[228px]'>
      <p className='font-semibold text-sm'>{t('showAll')}:</p>
      {(search || onSearchChange) && options.length > 9 && (
        <Input value={search} onChange={e => onSearchChange?.(e.target.value)} />
      )}
      {excludeAllLabel && (
        <Checkbox
          checked={allUnchecked}
          onCheckedChange={() => onChange?.(null as T, !allUnchecked)}
        >
          {excludeAllLabel}
        </Checkbox>
      )}
      {!isRadioButtons && (
        <Checkbox checked={allChecked} onCheckedChange={() => onChange?.('all' as T, !allChecked)}>
          {t('chooseAll')}
        </Checkbox>
      )}
      <Separator />
      <ScrollArea>
        <div
          className='flex flex-col items-start gap-4 py-0.5 w-[228px] h-calc(100vh-475px)'
          style={{ maxHeight: 'calc(var(--radix-popover-content-available-height) - 300px)' }}
        >
          {filteredOptions.map(option => {
            const value = getOptionValue(option);
            const checked = Boolean(!allUnchecked && (allChecked || optionChecked(value)));
            const disabled = optionDisabled(value);
            if (optionHidden(value)) return null;
            return (
              <Checkbox
                key={String(value)}
                checked={checked}
                disabled={disabled}
                onCheckedChange={() => onChange?.(value, !checked)}
              >
                {getOptionLabel(option).raw}
              </Checkbox>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};
