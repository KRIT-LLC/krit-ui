/**
 * @fileoverview Компонент NumberInput для ввода числовых значений со строгой валидацией
 *
 * Этот файл содержит реализацию компонента NumberInput, который предоставляет
 * безопасную альтернативу обычному `<input type="number">`. Компонент обеспечивает:
 * - Строгую валидацию только числовых символов
 * - Автоматическую замену запятых на точки как десятичного разделителя
 * - Контроль количества десятичных знаков
 * - Предотвращение ввода множественных разделителей
 * - Настраиваемую поддержку отрицательных чисел
 */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { cn } from '@/utils';

/**
 * Пропсы для компонента NumberInput
 *
 * @interface NumberInputProps
 * @extends {Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'value'>}
 */
export type NumberInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange' | 'value'
> & {
  /** Иконка, отображаемая справа от поля ввода */
  icon?: React.ReactNode;
  /** Текущее значение поля. Может быть числом или строкой */
  value?: number | string;
  /**
   * Колбэк, вызываемый при изменении значения
   * @param value - новое числовое значение или null, если значение невалидно
   */
  onChange?: (value: number | null) => void;
  /**
   * Алиас для onChange. Используется для совместимости с другими компонентами
   * @param value - новое числовое значение или null, если значение невалидно
   */
  onValueChange?: (value: number | null) => void;
  /**
   * Колбэк, вызываемый при нажатии клавиши Enter
   * @param e - событие нажатия клавиши
   */
  onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  /**
   * Количество знаков после десятичной точки.
   * При значении 0 десятичная точка не разрешена.
   * @default 0
   */
  decimalPlaces?: number;
  /**
   * Разрешить ввод отрицательных чисел
   * @default false
   */
  allowNegative?: boolean;
};

/**
 * Компонент для ввода только числовых значений с строгой валидацией.
 *
 * Предоставляет безопасную альтернативу обычному `<input type="number">` с более
 * предсказуемым поведением валидации и обработки десятичных разделителей.
 * Автоматически заменяет запятые на точки для удобства пользователей.
 *
 * @component
 * @example
 * ```tsx
 * // Целые числа
 * <NumberInput
 *   value={count}
 *   onChange={(value) => setCount(value)}
 *   decimalPlaces={0}
 * />
 *
 * // Денежные суммы (2 знака после запятой)
 * // Пользователь может ввести как "12.34", так и "12,34" - оба варианта будут работать
 * <NumberInput
 *   value={price}
 *   onChange={(value) => setPrice(value)}
 *   decimalPlaces={2}
 *   placeholder="0.00"
 * />
 *
 * // Только положительные числа
 * <NumberInput
 *   value={quantity}
 *   onChange={(value) => setQuantity(value)}
 *   allowNegative={false}
 *   decimalPlaces={0}
 * />
 * ```
 *
 * @param props - Пропсы компонента NumberInput
 * @param ref - Ref для доступа к HTML input элементу
 * @returns JSX элемент поля ввода для чисел
 *
 * @see {@link NumberInputProps} для описания всех доступных пропсов
 *
 * @public
 */
const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      className,
      icon,
      value,
      onChange,
      onValueChange,
      onEnter,
      decimalPlaces = 0,
      allowNegative = false,
      ...props
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState<string>('');

    /**
     * Преобразует числовое значение в строку для отображения в поле ввода
     *
     * @param num - значение для форматирования
     * @returns отформатированная строка или пустая строка для невалидных значений
     *
     * @internal
     */
    const formatNumber = (num: number | string | undefined): string => {
      if (num === undefined || num === null || num === '') return '';
      const numStr = String(num);
      if (numStr === 'NaN' || numStr === 'Infinity' || numStr === '-Infinity') return '';
      return numStr;
    };

    /**
     * Валидирует и очищает введенный текст, оставляя только допустимые символы
     *
     * Выполняет следующие операции:
     * - Заменяет все запятые на точки для унификации десятичного разделителя
     * - Удаляет недопустимые символы, ограничивает количество точек и знаков после точки
     * - Обрабатывает знак минус согласно настройкам компонента
     *
     * @param input - введенная пользователем строка
     * @returns валидная строка, содержащая только допустимые символы
     *
     * @internal
     */
    const validateInput = (input: string): string => {
      if (!input) return '';

      let sanitized = input;

      // Заменяем все запятые на точки для унификации десятичного разделителя
      sanitized = sanitized.replace(/,/g, '.');

      // Удаляем все символы кроме цифр, точки и минуса (если разрешен)
      if (allowNegative) {
        sanitized = sanitized.replace(/[^0-9.-]/g, '');
      } else {
        sanitized = sanitized.replace(/[^0-9.]/g, '');
      }

      // Обрабатываем знак минус
      if (allowNegative) {
        // Минус может быть только в начале
        const minusCount = (sanitized.match(/-/g) || []).length;
        if (minusCount > 1) {
          // Если несколько минусов, оставляем только первый
          sanitized = sanitized.replace(/-/g, '');
          if (input.startsWith('-')) {
            sanitized = '-' + sanitized;
          }
        } else if (sanitized.includes('-') && !sanitized.startsWith('-')) {
          // Если минус не в начале, удаляем его
          sanitized = sanitized.replace(/-/g, '');
        }
      }

      // Обрабатываем точки
      const dotCount = (sanitized.match(/\./g) || []).length;
      if (dotCount > 1) {
        // Если несколько точек, оставляем только первую
        const firstDotIndex = sanitized.indexOf('.');
        sanitized =
          sanitized.substring(0, firstDotIndex + 1) +
          sanitized.substring(firstDotIndex + 1).replace(/\./g, '');
      }

      // Ограничиваем количество знаков после точки
      if (decimalPlaces >= 0 && sanitized.includes('.')) {
        const parts = sanitized.split('.');
        if (parts[1] && parts[1].length > decimalPlaces) {
          parts[1] = parts[1].substring(0, decimalPlaces);
        }
        sanitized = parts[0] + (decimalPlaces > 0 ? '.' + (parts[1] || '') : '');
      } else if (decimalPlaces === 0 && sanitized.includes('.')) {
        // Если decimalPlaces = 0, удаляем точку и все после неё
        sanitized = sanitized.split('.')[0];
      }

      return sanitized;
    };

    /**
     * Преобразует валидную строку в число
     *
     * @param input - валидная строка (прошедшая через validateInput)
     * @returns число или null, если строка пустая или представляет незавершенный ввод
     *
     * @internal
     */
    const parseValue = (input: string): number | null => {
      if (!input || input === '-') return null;
      const num = parseFloat(input);
      return isNaN(num) ? null : num;
    };

    /**
     * Обрабатывает изменение значения в поле ввода
     *
     * Валидирует введенный текст, обновляет внутреннее состояние и
     * вызывает внешние колбэки с числовым значением.
     *
     * @param e - событие изменения input элемента
     *
     * @internal
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newInput = validateInput(e.target.value);
      setInputValue(newInput);

      const numValue = parseValue(newInput);
      onChange?.(numValue);
      onValueChange?.(numValue);
    };

    // Синхронизация внутреннего состояния с внешним значением
    useEffect(() => {
      if (value !== undefined) {
        const formattedValue = formatNumber(value);
        if (formattedValue !== inputValue) {
          setInputValue(formattedValue);
        }
      }
    }, [value]);

    // Инициализация компонента с начальным значением
    useEffect(() => {
      if (value !== undefined && !inputValue) {
        setInputValue(formatNumber(value));
      }
    }, []);

    const shouldWrapWithRelative = !!icon;

    const input = (
      <div className='relative'>
        <input
          type='text'
          inputMode='decimal'
          className={cn(
            'flex h-9 w-full rounded-lg border border-line transition-colors bg-background px-3 py-2 text-sm placeholder:text-foreground-primary/50 hover:border-background-hover focus-visible:outline-none focus-visible:border-background-focused disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-line-error',
            '[&~label>svg]:text-icon-secondary',
            'has-[+p.text-foreground-error]:border-line-error',
            icon && 'pr-8',
            className,
          )}
          ref={ref}
          {...props}
          value={inputValue}
          onChange={handleChange}
          onKeyDown={e => e.key === 'Enter' && onEnter?.(e)}
          onFocus={props.onFocus || (event => event.target.setAttribute('autocomplete', 'off'))}
        />
        {icon && (
          <span className='absolute right-3 top-1/2 transform -translate-y-1/2 text-icon-secondary'>
            {icon}
          </span>
        )}
      </div>
    );

    if (shouldWrapWithRelative) {
      return (
        <div
          className={cn(
            'inline-block relative transition-colors',
            shouldWrapWithRelative && className,
          )}
        >
          {input}
        </div>
      );
    }

    return input;
  },
);

NumberInput.displayName = 'NumberInput';

/**
 * Экспортируемый компонент для ввода числовых значений.
 *
 * @example
 * ```tsx
 * import { NumberInput } from '@/shared/ui';
 *
 * function App() {
 *   const [amount, setAmount] = useState<number | null>(null);
 *
 *   return (
 *     <NumberInput
 *       value={amount}
 *       onChange={setAmount}
 *       decimalPlaces={2}
 *       placeholder="Введите сумму"
 *     />
 *   );
 * }
 * ```
 *
 * @public
 */
export { NumberInput };
