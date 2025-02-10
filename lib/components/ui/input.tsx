import * as React from 'react';
import { cn } from '@/utils';
import HideOutline from '@/assets/hide_outline.svg?react';
import Search from '@/assets/search.svg?react';
import ViewOutline from '@/assets/view_outline.svg?react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | boolean;
  asSearch?: boolean;
  rightIcon?: React.ReactNode;
  withCount?: boolean;
  onEnter?: (value: string) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, error, asSearch, rightIcon, withCount, onEnter, value = '', ...props },
    ref,
  ) => {
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const [valueLength, setValueLength] = React.useState(value.toString().length);
    const shouldWrapWithRelative = asSearch || type === 'password' || rightIcon || withCount;
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValueLength(e.target.value.length);
      props.onChange?.(e);
    };

    const input = (
      <>
        <input
          type={passwordVisible ? 'text' : type}
          className={cn(
            'flex h-9 w-full rounded-lg border border-line-primary bg-[transparent] blur-none px-3 pr-[0.95rem] py-2 text-sm tracking-[0.1px] leading-5 transition-colors duration-300 ease-in-out ring-offset-background file:border-0 file:bg-[transparent] file:text-sm font-normal placeholder:text-foreground-tertiary focus-visible:outline-none focus-visible:border-line-focused disabled:cursor-not-allowed disabled:opacity-50 truncate line-clamp-1',
            error ? 'border-line-error focus-visible:border-line-error' : '',
            !shouldWrapWithRelative && className,
            (rightIcon || withCount) && 'pr-14',
            props.readOnly && 'cursor-not-allowed pointer-events-none opacity-95',
          )}
          ref={ref}
          placeholder={asSearch ? props.placeholder || 'Search' : props.placeholder}
          onKeyDown={e => {
            if (e.key === 'Enter') onEnter?.((e.target as HTMLInputElement).value);
          }}
          value={value}
          {...props}
          onChange={onChange}
        />
        {rightIcon && (
          <span className='absolute right-1.5 top-1/2 -translate-y-1/2'>{rightIcon}</span>
        )}
        {withCount && (
          <span
            className='absolute right-1.5 top-1/2 -translate-y-1/2
            text-foreground-tertiary text-xs'
          >
            {valueLength}
          </span>
        )}
        {asSearch && <Search className='absolute top-[10px] right-3 text-icon-fade-contrast' />}
        {type === 'password' && (
          <span
            className='absolute bottom-2 right-2 cursor-pointer'
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <HideOutline /> : <ViewOutline />}
          </span>
        )}
      </>
    );

    if (shouldWrapWithRelative)
      return (
        <span className={cn('relative transition-colors', shouldWrapWithRelative && className)}>
          {input}
        </span>
      );
    else return input;
  },
);
Input.displayName = 'Input';

export { Input };
