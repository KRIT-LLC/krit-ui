import { ReactNode } from 'react';
import { Tabs, TabsList, TabsTrigger } from './tabs';

export interface SegmentedControlProps {
  defaultValue?: string;
  options?: { value: string; label: string; icon?: ReactNode }[];
  onClick?: (value: string) => void;
}

export const SegmentedControl = ({ defaultValue, options, onClick }: SegmentedControlProps) => {
  return (
    <Tabs value={defaultValue}>
      <TabsList className='w-fit'>
        {options?.map(option => (
          <TabsTrigger
            key={option.value}
            value={option.value}
            onClick={() => onClick?.(option.value)}
          >
            {option.icon}
            {option.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
