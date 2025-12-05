import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';
import {
  InfoTooltip,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/UI/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Система всплывающих подсказок. Показывает контекстную информацию при наведении на элемент. Основана на Radix UI Tooltip.',
      },
    },
    layout: 'centered',
  },
  argTypes: {
    delayDuration: {
      control: 'number',
      description: 'Задержка перед показом подсказки в миллисекундах',
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof Tooltip>;

// Базовая подсказка
export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant='fade-contrast-outlined'>Наведи на меня</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Это базовая всплывающая подсказка</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Базовая всплывающая подсказка с текстовым содержимым.',
      },
    },
  },
};

// Подсказка с задержкой
export const WithDelay: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip delayDuration={800}>
        <TooltipTrigger asChild>
          <Button variant='fade-contrast-outlined'>Наведи с задержкой</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Эта подсказка появляется с задержкой 800ms</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Подсказка с задержкой перед появлением.',
      },
    },
  },
};

// Подсказка с кастомным стилем
export const WithCustomStyle: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant='fade-contrast-outlined'>Кастомная подсказка</Button>
        </TooltipTrigger>
        <TooltipContent className='bg-blue-100 text-blue-900 border-blue-300'>
          <p>Подсказка с пользовательскими стилями</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Подсказка с дополнительными пользовательскими стилями.',
      },
    },
  },
};

// Информационная подсказка
export const InfoTooltipDemo: Story = {
  render: () => (
    <InfoTooltip text='Это **важная** информация с поддержкой **жирного** текста'>
      <Button variant='fade-contrast-outlined'>Информационная подсказка</Button>
    </InfoTooltip>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Упрощенный компонент подсказки с предустановленными стилями и поддержкой форматирования текста.',
      },
    },
  },
};

// Длинная подсказка
export const LongContent: Story = {
  render: () => (
    <InfoTooltip text='Это очень длинный текст подсказки, который занимает несколько строк и демонстрирует, как компонент обрабатывает многострочный контент. Подсказки полезны для предоставления дополнительной информации без загромождения интерфейса.'>
      <Button variant='fade-contrast-outlined'>Длинная подсказка</Button>
    </InfoTooltip>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Подсказка с длинным текстом, демонстрирующая адаптивность компонента.',
      },
    },
  },
};

// Различные позиции подсказки
export const DifferentPositions: Story = {
  render: () => (
    <div className='flex flex-col gap-4 items-center'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant='fade-contrast-outlined'>Подсказка сверху</Button>
          </TooltipTrigger>
          <TooltipContent side='top'>
            <p>Подсказка появляется сверху</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant='fade-contrast-outlined'>Подсказка справа</Button>
          </TooltipTrigger>
          <TooltipContent side='right'>
            <p>Подсказка появляется справа</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant='fade-contrast-outlined'>Подсказка снизу</Button>
          </TooltipTrigger>
          <TooltipContent side='bottom'>
            <p>Подсказка появляется снизу</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant='fade-contrast-outlined'>Подсказка слева</Button>
          </TooltipTrigger>
          <TooltipContent side='left'>
            <p>Подсказка появляется слева</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Подсказки с различным позиционированием относительно целевого элемента.',
      },
    },
  },
};
