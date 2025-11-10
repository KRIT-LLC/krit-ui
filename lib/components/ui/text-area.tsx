import * as React from 'react';
import { cn } from '@/utils';

export interface TextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  error?: string | boolean;
  rows: number;
  onEnter?: (value: string) => void;
}

/**
 * Компонент текстовой области с расширенной функциональностью, включая подсчет символов,
 * обработку нажатия Enter и отображение ошибок.
 *
 * @component
 * @param {object} props - Параметры компонента
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @param {string|boolean} [props.error] - Флаг или сообщение об ошибке
 * @param {number} props.rows - Количество видимых строк текста
 * @param {function} [props.onEnter] - Callback-функция при нажатии Enter
 * @param {React.InputHTMLAttributes<HTMLTextAreaElement>} props - Стандартные свойства textarea
 * @param {React.Ref<HTMLTextAreaElement>} ref - Реф для доступа к DOM-элементу
 * @returns {React.ReactElement} Текстовая область с дополнительной функциональностью
 *
 * @example
 * <TextArea
 *   placeholder="Введите текст"
 *   rows={4}
 *   maxLength={500}
 *   onEnter={(value) => console.log(value)}
 * />
 *
 * @example
 * <TextArea
 *   placeholder="Введите текст"
 *   rows={4}
 *   error="Обязательное поле"
 * />
 */
const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, error, rows, onEnter, ...props }, ref) => {
    const [valueLength, setValueLength] = React.useState(props.value?.toString().length ?? 0);
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValueLength(e.target.value.length);
      props.onChange?.(e);
    };

    const textArea = (
      <>
        <textarea
          className={cn(
            'w-full rounded-lg border border-line-primary bg-[transparent] blur-none px-3 py-2 text-sm tracking-[0.1px] leading-5 transition-colors duration-300 ease-in-out ring-offset-background file:border-0 file:bg-[transparent] file:text-sm font-normal placeholder:text-foreground-tertiary focus-visible:outline-none focus-visible:border-line-focused disabled:cursor-not-allowed disabled:opacity-50 resize-none',
            error ? 'border-line-error focus-visible:border-line-error' : '',
            props.maxLength ? 'pb-2.5' : 'pb-0.5',
          )}
          ref={ref}
          placeholder={props.placeholder}
          rows={rows ?? 4}
          onKeyDown={e => {
            if (e.key === 'Enter') onEnter?.((e.target as HTMLTextAreaElement).value);
          }}
          {...props}
          onChange={onChange}
        />
        {props.maxLength && (
          <span
            className='absolute right-2 bottom-2.5 
            text-foreground-tertiary text-xs'
          >
            {valueLength}/{props.maxLength}
          </span>
        )}
      </>
    );
    return <span className={cn('relative transition-colors', className)}>{textArea}</span>;
  },
);
TextArea.displayName = 'TextArea';

export { TextArea };
