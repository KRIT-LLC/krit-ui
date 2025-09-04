import { ReactNode } from 'react';
import { Tabs, TabsList, TabsTrigger } from './tabs';

export interface SegmentedControlProps {
  defaultValue?: string;
  options?: { value: string; label: string; icon?: ReactNode }[];
  onClick?: (value: string) => void;
}

/**
 * Сегментированный контрол для переключения между опциями.
 * Построен на основе компонента Tabs с упрощенным API.
 *
 * @component
 * @param {object} props - Параметры компонента
 * @param {string} [props.defaultValue] - Значение выбранной по умолчанию опции
 * @param {Array} [props.options] - Массив опций для отображения
 * @param {string} props.options[].value - Уникальное значение опции
 * @param {string} props.options[].label - Текстовая метка опции
 * @param {ReactNode} [props.options[].icon] - Иконка опции (опционально)
 * @param {function} [props.onClick] - Обработчик клика по опции
 * @returns {React.ReactElement} Сегментированный контрол
 *
 * @example
 * <SegmentedControl
 *   defaultValue="option1"
 *   options={[
 *     { value: "option1", label: "Опция 1" },
 *     { value: "option2", label: "Опция 2", icon: <Icon /> },
 *   ]}
 *   onClick={(value) => console.log(value)}
 * />
 */
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
