import { ReactNode, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { renderTextWithBoldMarkdown } from '@/lib/text';
import { zRequired } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PromptOptions } from '@/hooks/useConfirm';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/utils';
import { Button } from './button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogTrigger,
} from './dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from './form';
import { TextArea } from './text-area';

interface ConfirmModalProps extends PromptOptions {
  children?: ReactNode;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  onConfirm?: (input?: string) => void;
  onCancel?: () => void;
}
/**
 * Модальное окно подтверждения действия с поддержкой кастомного ввода
 * @component
 * @param {Object} props - Параметры компонента
 * @param {string} [props.title] - Заголовок модального окна
 * @param {string} [props.description] - Описание действия
 * @param {'contrast' | 'destructive'} [props.confirmType='contrast'] - Стиль кнопки подтверждения
 * @param {string} [props.confirmText='OK'] - Текст кнопки подтверждения
 * @param {boolean} [props.confirmHidden] - Скрыть кнопку подтверждения
 * @param {string} [props.cancelText] - Текст кнопки отмены
 * @param {boolean} [props.cancelHidden] - Скрыть кнопку отмены
 * @param {React.ElementType} [props.input] - Кастомный компонент ввода
 * @param {string} [props.inputPlaceholder] - Плейсхолдер для поля ввода
 * @param {string} [props.inputRequiredLabel] - Сообщение при обязательном поле
 * @param {number} [props.inputMaxLength] - Максимальная длина ввода
 * @param {boolean} [props.inputRequired] - Обязательность заполнения поля
 * @param {ReactNode} [props.children] - Триггер для открытия модального окна
 * @param {boolean} [props.visible] - Состояние видимости модального окна
 * @param {function} [props.onVisibleChange] - Колбэк изменения видимости
 * @param {function} [props.onConfirm] - Колбэк подтверждения
 * @param {function} [props.onCancel] - Колбэк отмены
 */
export const ConfirmModal = (props: ConfirmModalProps) => {
  const {
    title,
    description,
    confirmType = 'contrast',
    confirmText = 'OK',
    confirmHidden,
    cancelText,
    cancelHidden,
    input: Input,
    inputPlaceholder,
    inputRequiredLabel,
    inputMaxLength,
    inputRequired,
    children,
    visible,
    onVisibleChange,
    onConfirm,
    onCancel,
  } = props;
  const { t } = useTranslation();
  const hasInput = !!(Input || inputPlaceholder);

  const dynamicFormSchema = z.object({
    inputValue: inputRequired ? z.string().refine(...zRequired('fillField')) : z.string(),
  });

  type FormValues = z.infer<typeof dynamicFormSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(dynamicFormSchema),
    defaultValues: { inputValue: '' },
  });

  useEffect(() => {
    if (!visible) form.reset({ inputValue: '' });
  }, [visible]);

  const handleVisibility = (visible: boolean) => {
    onVisibleChange?.(visible);
    if (!visible) form.reset({ inputValue: '' });
  };

  const handleConfirm = (values?: FormValues) => {
    onConfirm?.(values?.inputValue);
  };

  const renderDescription = () => {
    return (
      <>
        {renderTextWithBoldMarkdown(description || t('confirmAction'))}
        {inputRequired && <span className='text-foreground-error'>*</span>}
      </>
    );
  };

  return (
    <Dialog open={visible} onOpenChange={handleVisibility}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className='w-[460px]'>
        <Form {...form}>
          <DialogHeader>
            <DialogTitle>{title || t('warning')}</DialogTitle>
          </DialogHeader>
          <DialogSection
            className={cn(
              inputPlaceholder && 'space-y-2',
              Input && 'flex flex-row items-center space-y-0 space-x-4',
            )}
          >
            <DialogDescription
              className={Input || inputPlaceholder ? 'text-foreground-secondary' : ''}
            >
              {renderDescription()}
            </DialogDescription>
            {hasInput && (
              <FormField
                control={form.control}
                name='inputValue'
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      {Input ? (
                        <Input {...field} />
                      ) : (
                        <TextArea
                          rows={4}
                          placeholder={inputPlaceholder}
                          maxLength={inputMaxLength}
                          autoFocus
                          {...field}
                        />
                      )}
                    </FormControl>
                    {fieldState.error && <FormMessage>{inputRequiredLabel}</FormMessage>}
                  </FormItem>
                )}
              />
            )}
          </DialogSection>
          <DialogFooter>
            {!confirmHidden && (
              <Button
                variant={confirmType}
                size='sm'
                className='min-w-[120px]'
                onClick={hasInput ? form.handleSubmit(handleConfirm) : () => handleConfirm()}
              >
                {confirmText}
              </Button>
            )}
            {!cancelHidden && (
              <DialogClose aria-label='Close' asChild>
                <Button type='button' variant='outline' size='sm' onClick={onCancel}>
                  {cancelText || t('cancellation')}
                </Button>
              </DialogClose>
            )}
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
