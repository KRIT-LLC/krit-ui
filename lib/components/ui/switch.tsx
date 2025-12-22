import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cn } from '@/utils';

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  className?: string;
}

/**
 * Переключатель (switch) для изменения состояния между включенным и выключенным.
 * Основан на Radix UI Switch с кастомизацией стилей и поддержкой доступности.
 *
 * @component
 * @param {SwitchProps} props - Параметры компонента
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @param {boolean} [props.checked] - Состояние переключателя (включен/выключен)
 * @param {boolean} [props.disabled] - Флаг отключения переключателя
 * @param {function} [props.onCheckedChange] - Callback при изменении состояния
 * @param {React.Ref<React.ElementRef<typeof SwitchPrimitives.Root>>} ref - Реф для доступа к DOM-элементу
 * @returns {React.ReactElement} Переключатель с заданными свойствами
 *
 * @example
 * <Switch />
 * <Switch checked onChange={handleChange} />
 * <Switch disabled />
 */
const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(
  ({ className, ...props }, ref) => (
    <SwitchPrimitives.Root
      className={cn(
        'peer inline-flex h-3 w-8 shrink-0 cursor-pointer items-center rounded-full border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-background-success data-[state=unchecked]:bg-background-contrast-fade',
        className,
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          'pointer-events-none block h-[18px] w-[18px] rounded-full bg-background shadow-switch ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
        )}
      />
    </SwitchPrimitives.Root>
  ),
);
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
