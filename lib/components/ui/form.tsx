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

const Form = FormProvider;

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
  horizontal?: boolean;
}

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        ref={ref}
        className={cn(
          'flex text-sm',
          props.horizontal ? 'space-x-3 items-center' : 'space-y-2 flex-col',
          className,
        )}
        {...props}
      />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = 'FormItem';

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

const FormItemMultiSelect = (props: MultiSelectProps) => {
  return (
    <FormItem>
      <FormControl>
        <MultiSelect {...props} />
      </FormControl>
    </FormItem>
  );
};

const FormItemDatePicker = (props: DatePickerProps) => {
  return (
    <FormItem>
      <FormControl>
        <DatePicker {...props} />
      </FormControl>
    </FormItem>
  );
};

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
