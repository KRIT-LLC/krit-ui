import * as React from 'react';
import { cn } from '@/utils';
import ViewOutline from '@/assets/view_outline.svg?react';
import HideOutline from '@/assets/hide_outline.svg?react';
import Search from '@/assets/search.svg?react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | boolean;
  asSearch?: boolean;
  rightIcon?: React.ReactNode;
  onEnter?: (value: string) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, asSearch, rightIcon, onEnter, ...props }, ref) => {
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const shouldWrapWithRelative = asSearch || type === 'password' || rightIcon;

    const input = (
      <>
        <input
          type={passwordVisible ? 'text' : type}
          className={cn(
            'flex h-9 w-full rounded-lg border border-line-primary bg-[transparent] blur-none px-4 py-2 text-sm tracking-[0.1px] leading-5 transition-colors duration-300 ease-in-out ring-offset-background file:border-0 file:bg-[transparent] file:text-sm font-normal placeholder:text-foreground-tertiary focus-visible:outline-none focus-visible:border-line-focused disabled:cursor-not-allowed disabled:opacity-50 truncate line-clamp-1 pr-8',
            error ? 'border-line-error focus-visible:border-line-error' : '',
            !shouldWrapWithRelative && className,
            rightIcon && 'pr-14',
          )}
          ref={ref}
          placeholder={asSearch ? props.placeholder || 'Search' : props.placeholder}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onEnter?.((e.target as HTMLInputElement).value);
          }}
          {...props}
        />
        {rightIcon && <span className="absolute right-1.5 top-1/2 -translate-y-1/2">{rightIcon}</span>}
        {asSearch && <Search className="absolute top-[10px] right-3 text-icon-fade-contrast" />}
        {type === 'password' && (
          <span
            className="absolute bottom-2 right-2 cursor-pointer"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <HideOutline /> : <ViewOutline />}
          </span>
        )}
      </>
    );

    if (shouldWrapWithRelative)
      return <span className={cn('relative transition-colors', shouldWrapWithRelative && className)}>{input}</span>;
    else return input;
  },
);
Input.displayName = 'Input';

export { Input };
