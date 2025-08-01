import * as React from 'react';
import { useMask } from '@react-input/mask';
import { useCombinedRefs } from '@/hooks/useCombinedRefs';
import { cn } from '@/utils';
import WatchLaterOutlineIcon from '@/assets/watch_later_outline.svg?react';
import { Input, InputProps } from './input';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export interface TimePickerProps extends Omit<InputProps, 'onChange' | 'value' | 'type'> {
  value: string;
  onChange: (value: string) => void;
}

const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  ({ value, onChange, placeholder, className, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);

    const maskedRef = useMask({
      mask: 'Hh:Mm',
      replacement: {
        H: /[0-2]/,
        h: /[0-9]/,
        M: /[0-5]/,
        m: /[0-9]/,
      },
      showMask: false,
    });

    const combinedRef = useCombinedRefs(ref, maskedRef);

    const formatTime = (val: string) => {
      if (!val) return '';

      const digits = val.replace(/\D/g, '').slice(0, 4);
      if (!digits) return '';

      const hours = digits.slice(0, 2).padStart(2, '0');
      const minutes = digits.slice(2, 4).padStart(2, '0');

      return `${hours}:${minutes}`;
    };

    const [inputValue, setInputValue] = React.useState(formatTime(value));

    React.useEffect(() => {
      setInputValue(formatTime(value));
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setInputValue(val);

      const cleanValue = val.replace(/\D/g, '');
      if (cleanValue.length === 4) {
        const hours = Math.min(23, parseInt(cleanValue.slice(0, 2), 10) || 0);
        const minutes = Math.min(59, parseInt(cleanValue.slice(2, 4), 10) || 0);
        const formatted = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        onChange?.(formatted);
      }
    };

    const handleTimeSelect = (hours: string, minutes: string) => {
      const formatted = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
      setInputValue(formatted);
      onChange?.(formatted);
    };

    const [hours = '', minutes = ''] = inputValue.split(':');

    return (
      <div className={cn('relative', className)}>
        <Popover open={open} onOpenChange={setOpen}>
          <Input
            {...props}
            ref={combinedRef}
            value={inputValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            className='pr-10'
            type='text'
          />
          <PopoverTrigger asChild>
            <div className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer z-10'>
              <WatchLaterOutlineIcon className='text-icon-fade-contrast min-w-6 h-6' />
            </div>
          </PopoverTrigger>

          <PopoverContent
            align='end'
            sideOffset={5}
            collisionPadding={8}
            className='bg-background-primary w-full p-2 min-w-[120px] translate-x-3'
            onOpenAutoFocus={e => e.preventDefault()}
          >
            <div className='flex gap-2 w-full items-center justify-center'>
              <TimeColumn
                items={Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))}
                value={hours}
                onSelect={h => handleTimeSelect(h, minutes)}
              />
              <TimeColumn
                items={Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'))}
                value={minutes}
                onSelect={m => handleTimeSelect(hours, m)}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
);

TimePicker.displayName = 'TimePicker';

interface TimeColumnProps {
  items: string[];
  value: string;
  onSelect: (value: string) => void;
}

const TimeColumn: React.FC<TimeColumnProps> = ({ items, value, onSelect }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      container.scrollTop += e.deltaY;
    };

    container.addEventListener('wheel', handleWheel);
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  React.useEffect(() => {
    if (containerRef.current && value) {
      const selectedIndex = items.findIndex(item => item === value);
      if (selectedIndex > -1) {
        const itemHeight = 32;
        containerRef.current.scrollTop = selectedIndex * itemHeight;
      }
    }
  }, [items, value]);

  return (
    <div className='flex flex-col items-center flex-1'>
      <div
        ref={containerRef}
        className='h-48 overflow-y-auto w-full scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
      >
        {items.map(item => (
          <div
            key={item}
            className={cn(
              'py-1 text-center cursor-pointer transition-colors hover:bg-background-secondary rounded-lg',
              item === value &&
                'bg-background-theme text-foreground-on-contrast hover:bg-background-theme/80',
            )}
            onClick={() => onSelect(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export { TimePicker };
