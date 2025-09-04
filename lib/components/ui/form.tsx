import * as React from 'react';
import { Controller, ControllerProps, FieldPath, FieldValues, FormProvider } from 'react-hook-form';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/utils';
import { DatePicker, DatePickerProps } from './date-picker';
import { FormFieldContext, FormItemContext, useFormField } from './form.lib';
import { Input, InputProps } from './input';
import { Label } from './label';
import { MultiSelect, MultiSelectProps } from './multi-select';
import { Select, SelectProps } from './select';

/**
 * Провайдер формы, оборачивающий react-hook-form FormProvider
 * @component
 * @see https://react-hook-form.com/api/useform/formprovider
 */
const Form = FormProvider;

/**
 * Компонент поля формы, оборачивающий Controller из react-hook-form
 * @component
 * @template TFieldValues - Тип значений формы
 * @template TName - Имя поля в форме
 * @param {ControllerProps<TFieldValues, TName>} props - Свойства Controller
 * @returns {JSX.Element}
 */
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Расположение элементов по горизонтали */
  horizontal?: boolean;
}

/**
 * Контейнер для элементов формы
 * @component
 * @param {FormItemProps} props - Свойства компонента
 * @returns {JSX.Element}
 */
const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, horizontal, ...props }, ref) => {
    const id = React.useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div
          ref={ref}
          className={cn(
            'flex text-sm',
            horizontal ? 'space-x-3 items-center' : 'space-y-2 flex-col',
            className,
          )}
          {...props}
        />
      </FormItemContext.Provider>
    );
  },
);
FormItem.displayName = 'FormItem';

/**
 * Метка для поля формы
 * @component
 * @param {React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & { required?: boolean }} props - Свойства компонента
 * @returns {JSX.Element}
 */
const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & { required?: boolean }
>(({ className, required, ...props }, ref) => {
  const { formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn('text-sm text-foreground-secondary font-normal blur-none', className)}
      htmlFor={formItemId}
      required={required}
      {...props}
    />
  );
});
FormLabel.displayName = 'FormLabel';

/**
 * Контроллер для управления состоянием поля формы
 * @component
 * @param {React.ComponentPropsWithoutRef<typeof Slot>} props - Свойства компонента
 * @returns {JSX.Element}
 */
const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = 'FormControl';

/**
 * Компонент для отображения описания поля формы
 * @component
 * @param {React.HTMLAttributes<HTMLParagraphElement>} props - Свойства компонента
 * @returns {JSX.Element}
 */
const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn('text-[13px] text-muted-foreground tracking-[0.2px] mt-6 blur-none', className)}
      {...props}
    />
  );
});
FormDescription.displayName = 'FormDescription';

/**
 * Компонент для отображения сообщений об ошибках формы
 * @component
 * @param {React.HTMLAttributes<HTMLParagraphElement>} props - Свойства компонента
 * @returns {JSX.Element | null}
 */
const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = children || (error ? String(error?.message) : null);

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn('text-xs text-foreground-error blur-none', className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = 'FormMessage';

const FormItemInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <FormItem>
      <FormControl>
        <Input ref={ref} {...props} />
      </FormControl>
    </FormItem>
  );
});

/**
 * Композитный компонент: поле ввода в контейнере формы
 * @component
 * @param {InputProps} props - Свойства компонента Input
 * @returns {JSX.Element}
 */
const FormItemSelect = React.forwardRef<React.ElementRef<typeof Select>, SelectProps>(
  (props, ref) => {
    return (
      <FormItem>
        <FormControl>
          <Select ref={ref} {...props} />
        </FormControl>
      </FormItem>
    );
  },
);
FormItemSelect.displayName = 'FormItemSelect';

/**
 * Композитный компонент: выпадающий список в контейнере формы
 * @component
 * @param {SelectProps} props - Свойства компонента Select
 * @returns {JSX.Element}
 */
const FormItemMultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>((props, ref) => {
  return (
    <FormItem ref={ref}>
      <FormControl>
        <MultiSelect {...props} />
      </FormControl>
    </FormItem>
  );
});
FormItemMultiSelect.displayName = 'FormItemMultiSelect';

/**
 * Композитный компонент: выбор даты в контейнере формы
 * @component
 * @param {DatePickerProps} props - Свойства компонента DatePicker
 * @returns {JSX.Element}
 */
const FormItemDatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>((props, ref) => {
  return (
    <FormItem ref={ref}>
      <FormControl>
        <DatePicker {...props} />
      </FormControl>
    </FormItem>
  );
});
FormItemDatePicker.displayName = 'FormItemDatePicker';

export {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  FormItemInput,
  FormItemSelect,
  FormItemMultiSelect,
  FormItemDatePicker,
};
