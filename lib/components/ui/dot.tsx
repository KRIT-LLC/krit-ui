import { cn } from '@/utils';

/**
 * Компонент точки для разделения элементов с кастомизируемым стилем
 * @component
 * @param {string} [className] - Дополнительные CSS-классы для кастомизации
 * @example
 * <Dot className="text-red-500 text-xl" />
 */
export const Dot = ({ className }: { className?: string }) => {
  return (
    <span className={cn('text-neutral-400 text-opacity-75 text-[19px] mb-[1px]', className)}>
      •
    </span>
  );
};
