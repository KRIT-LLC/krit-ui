import * as React from 'react';
import { cn } from '@/utils';
import { Dot } from './dot';

/**
 * Пропсы компонента Profile
 */
export interface ProfileProps extends React.ComponentPropsWithoutRef<'div'> {
  /** URL изображения аватара */
  avatarUrl?: string;
  /** Альтернативный текст для аватара */
  avatarAlt?: string;
  /** Имя пользователя */
  name: string;
  /** Email адрес пользователя */
  email?: string;
  /** Роль пользователя */
  role?: string;
}

/**
 * Компонент для отображения профиля пользователя с аватаром, именем, email и ролью.
 * Соответствует дизайну из Figma.
 *
 * @component
 * @param {ProfileProps} props - Параметры компонента
 * @returns {React.ReactElement} Компонент профиля
 *
 * @example
 * <Profile
 *   avatarUrl="/path/to/avatar.jpg"
 *   name="Семенова А.И."
 *   email="a.semenova@mail.ru"
 *   role="Автор"
 * />
 *
 * @example
 * <Profile
 *   name="Иванов И.И."
 *   email="ivanov@example.com"
 *   role="Разработчик"
 * />
 */
const Profile = React.forwardRef<HTMLDivElement, ProfileProps>(
  ({ className, avatarUrl, avatarAlt, name, email, role, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-3 rounded-lg bg-background-secondary p-2', className)}
        {...props}
      >
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt={avatarAlt || name}
            className='h-10 w-10 min-w-10 rounded-full border border-line-primary object-cover flex-shrink-0'
          />
        )}
        <div className='flex min-w-0 flex-1 flex-col gap-[2px]'>
          <span className='text-sm font-normal leading-5 text-foreground'>{name}</span>
          {(email || role) && (
            <div className='flex items-center gap-1.5 text-xs font-normal leading-4'>
              {email && (
                <a href={`mailto:${email}`} className='text-foreground-theme hover:underline'>
                  {email}
                </a>
              )}
              {email && role && <Dot className='text-foreground-secondary' />}
              {role && <span className='text-foreground-secondary'>{role}</span>}
            </div>
          )}
        </div>
      </div>
    );
  },
);
Profile.displayName = 'Profile';

export { Profile };
