// Popover.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

/**
 * Popover компонент предоставляет контекстное всплывающее окно,
 * которое можно использовать для отображения дополнительного контента
 * или действий, связанных с элементом интерфейса.
 *
 * Компонент построен на основе Radix UI Primitive и поддерживает:
 * - Контролируемое и неконтролируемое состояние
 * - Различные варианты позиционирования
 * - Анимации появления/исчезновения
 * - Кастомизацию через CSS-классы
 *
 * @see https://www.radix-ui.com/docs/primitives/components/popover
 */

const meta: Meta<typeof Popover> = {
  title: 'Components/UI/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Контекстное всплывающее окно для отображения дополнительного контента или действий.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Содержимое Popover',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

/**
 * Базовый пример использования Popover
 * Демонстрирует стандартное поведение компонента
 */
export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='fade-contrast-outlined'>Открыть Popover</Button>
      </PopoverTrigger>
      <PopoverContent className='bg-background-primary'>
        <div className='space-y-2'>
          <h4 className='font-medium leading-none'>Заголовок Popover</h4>
          <p className='text-sm text-muted-foreground'>
            Это содержимое всплывающего окна с полезной информацией.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

/**
 * Popover с различными вариантами позиционирования
 * Демонстрирует различные стороны отображения контента
 */
export const WithPositioning: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-2'>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant='fade-contrast-outlined'>Сверху</Button>
          </PopoverTrigger>
          <PopoverContent className='bg-background-primary' side='top'>
            <p>Popover отображается сверху от триггера</p>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant='fade-contrast-outlined'>Справа</Button>
          </PopoverTrigger>
          <PopoverContent className='bg-background-primary' side='right'>
            <p>Popover отображается справа от триггера</p>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant='fade-contrast-outlined'>Снизу</Button>
          </PopoverTrigger>
          <PopoverContent className='bg-background-primary' side='bottom'>
            <p>Popover отображается снизу от триггера</p>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant='fade-contrast-outlined'>Слева</Button>
          </PopoverTrigger>
          <PopoverContent className='bg-background-primary' side='left'>
            <p>Popover отображается слева от триггера</p>
          </PopoverContent>
        </Popover>
      </div>

      <div className='flex gap-2'>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant='fade-contrast-outlined'>Начало</Button>
          </PopoverTrigger>
          <PopoverContent className='bg-background-primary' align='start'>
            <p>Контент выровнен по началу триггера</p>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant='fade-contrast-outlined'>Центр</Button>
          </PopoverTrigger>
          <PopoverContent className='bg-background-primary' align='center'>
            <p>Контент выровнен по центру триггера</p>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant='fade-contrast-outlined'>Конец</Button>
          </PopoverTrigger>
          <PopoverContent className='bg-background-primary' align='end'>
            <p>Контент выровнен по концу триггера</p>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  ),
};

/**
 * Popover с кастомизированным внешним видом
 * Демонстрирует возможность изменения стилей через CSS-классы
 */
export const WithCustomStyles: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='fade-contrast-outlined'>Кастомный стиль</Button>
      </PopoverTrigger>
      <PopoverContent className='bg-background-primary border-blue-300 text-blue-900'>
        <div className='space-y-2'>
          <h4 className='font-medium leading-none'>Кастомный Popover</h4>
          <p className='text-sm'>Этот Popover имеет пользовательские стили через CSS-классы.</p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

/**
 * Popover с формой
 * Демонстрирует использование интерактивных элементов внутри Popover
 */
export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='fade-contrast-outlined'>Настройки</Button>
      </PopoverTrigger>
      <PopoverContent className='bg-background-primary'>
        <div className='space-y-4'>
          <h4 className='font-medium'>Настройки уведомлений</h4>
          <div className='space-y-2'>
            <label className='flex items-center gap-2'>
              <input type='checkbox' />
              <span>Email уведомления</span>
            </label>
            <label className='flex items-center gap-2'>
              <input type='checkbox' />
              <span>Push уведомления</span>
            </label>
            <label className='flex items-center gap-2'>
              <input type='checkbox' />
              <span>SMS уведомления</span>
            </label>
          </div>
          <Button size='sm' className='w-full'>
            Сохранить
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

/**
 * Контролируемый Popover
 * Демонстрирует управление состоянием Popover извне
 */
export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant='fade-contrast-outlined'>
            {open ? 'Закрыть Popover' : 'Открыть Popover'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='bg-background-primary'>
          <div className='space-y-2'>
            <h4 className='font-medium leading-none'>Контролируемый Popover</h4>
            <p className='text-sm text-muted-foreground'>
              Состояние этого Popover управляется извне.
            </p>
            <Button size='sm' onClick={() => setOpen(false)}>
              Закрыть
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};
