import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';
import { cn } from '@/utils';

/**
 * Группа радиокнопок для выбора одной опции из нескольких.
 * Основан на Radix UI RadioGroup с дополнительными стилями.
 *
 * @component
 * @param {object} props - Параметры компонента
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @param {string} [props.defaultValue] - Значение выбранной по умолчанию опции
 * @param {string} [props.value] - Управляемое значение выбранной опции
 * @param {function} [props.onValueChange] - Обработчик изменения выбранной опции
 * @param {boolean} [props.disabled] - Отключение всей группы
 * @param {boolean} [props.required] - Обязательность выбора
 * @param {string} [props.name] - Имя группы (для форм)
 * @param {string} [props.orientation] - Ориентация группы (horizontal/vertical)
 * @param {React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>} props - Стандартные свойства RadioGroup из Radix UI
 * @param {React.Ref<React.ElementRef<typeof RadioGroupPrimitive.Root>>} ref - Реф для доступа к DOM-элементу
 * @returns {React.ReactElement} Группа радиокнопок
 *
 * @example
 * <RadioGroup defaultValue="option1">
 *   <RadioGroupItem value="option1" id="option1" />
 *   <Label htmlFor="option1">Option 1</Label>
 *   <RadioGroupItem value="option2" id="option2" />
 *   <Label htmlFor="option2">Option 2</Label>
 * </RadioGroup>
 */
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn('grid gap-2', className)} {...props} ref={ref} />;
});
RadioGroup.displayName = 'RadioGroup';

/**
 * Отдельный элемент радиокнопки в группе.
 * Основан на Radix UI RadioGroupItem с дополнительными стилями.
 *
 * @component
 * @param {object} props - Параметры компонента
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @param {string} props.value - Значение элемента, уникальное в группе
 * @param {boolean} [props.disabled] - Отключение элемента
 * @param {boolean} [props.required] - Обязательность выбора элемента
 * @param {React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>} props - Стандартные свойства RadioGroupItem из Radix UI
 * @param {React.Ref<React.ElementRef<typeof RadioGroupPrimitive.Item>>} ref - Реф для доступа к DOM-элементу
 * @returns {React.ReactElement} Элемент радиокнопки
 *
 * @example
 * <RadioGroupItem value="option1" id="option1" />
 */
const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'aspect-square h-4 w-4 rounded-full border border-line-contrast data-[state=checked]:border-line-theme text-foreground ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className='flex items-center justify-center'>
        <Circle className='h-2.5 w-2.5 fill-background-theme text-line-theme' />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup, RadioGroupItem };
