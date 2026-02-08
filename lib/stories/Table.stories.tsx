// Table.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const meta: Meta<typeof Table> = {
  title: 'Components/UI/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Набор компонентов для создания структурированных таблиц с поддержкой доступности и кастомизации.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы для элемента table',
    },
    rootClassName: {
      control: 'text',
      description: 'Дополнительные CSS-классы для контейнера таблицы',
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof Table>;

// Базовая таблица
export const Basic: Story = {
  render: args => (
    <Table {...args}>
      <TableCaption>Список сотрудников</TableCaption>
      <TableHeader>
        <TableRow isHeader>
          <TableHead>Имя</TableHead>
          <TableHead>Должность</TableHead>
          <TableHead>Отдел</TableHead>
          <TableHead className='text-right'>Стаж</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className='font-medium'>Иван Иванов</TableCell>
          <TableCell>Разработчик</TableCell>
          <TableCell>IT</TableCell>
          <TableCell className='text-right'>3 года</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className='font-medium'>Петр Петров</TableCell>
          <TableCell>Дизайнер</TableCell>
          <TableCell>UX/UI</TableCell>
          <TableCell className='text-right'>2 года</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className='font-medium'>Мария Сидорова</TableCell>
          <TableCell>Менеджер</TableCell>
          <TableCell>Маркетинг</TableCell>
          <TableCell className='text-right'>5 лет</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Базовая таблица с заголовком, телом и описанием.',
      },
    },
  },
};

// Таблица с подвалом
export const WithFooter: Story = {
  render: args => (
    <Table {...args}>
      <TableCaption>Отчет по продажам за месяц</TableCaption>
      <TableHeader>
        <TableRow isHeader>
          <TableHead>Товар</TableHead>
          <TableHead>Количество</TableHead>
          <TableHead className='text-right'>Сумма</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className='font-medium'>Ноутбук</TableCell>
          <TableCell>12</TableCell>
          <TableCell className='text-right'>$12,399.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className='font-medium'>Смартфон</TableCell>
          <TableCell>24</TableCell>
          <TableCell className='text-right'>$8,736.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className='font-medium'>Планшет</TableCell>
          <TableCell>18</TableCell>
          <TableCell className='text-right'>$5,382.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Итого</TableCell>
          <TableCell className='text-right'>$26,517.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Таблица с подвалом, содержащим итоговую информацию.',
      },
    },
  },
};

// Таблица с полосатой раскраской
export const Striped: Story = {
  render: args => (
    <Table {...args}>
      <TableHeader>
        <TableRow isHeader>
          <TableHead>Проект</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead>Срок</TableHead>
          <TableHead className='text-right'>Прогресс</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          {
            project: 'Редизайн сайта',
            status: 'В работе',
            deadline: '15.06.2023',
            progress: '60%',
          },
          {
            project: 'Мобильное приложение',
            status: 'Завершен',
            deadline: '01.05.2023',
            progress: '100%',
          },
          {
            project: 'API интеграция',
            status: 'На паузе',
            deadline: '30.07.2023',
            progress: '30%',
          },
          { project: 'Тестирование', status: 'В работе', deadline: '20.06.2023', progress: '75%' },
        ].map((item, index) => (
          <TableRow key={index} className={index % 2 === 0 ? 'bg-background-tertiary/30' : ''}>
            <TableCell className='font-medium'>{item.project}</TableCell>
            <TableCell>{item.status}</TableCell>
            <TableCell>{item.deadline}</TableCell>
            <TableCell className='text-right'>{item.progress}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Таблица с чередующейся раскраской строк для улучшения читаемости.',
      },
    },
  },
};

// Компактная таблица
export const Compact: Story = {
  render: args => (
    <Table {...args}>
      <TableHeader>
        <TableRow isHeader>
          <TableHead className='w-[100px]'>ID</TableHead>
          <TableHead>Пользователь</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className='text-right'>Активность</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className='font-medium'>001</TableCell>
          <TableCell>Алексей К.</TableCell>
          <TableCell>alex@example.com</TableCell>
          <TableCell className='text-right'>Сегодня</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className='font-medium'>002</TableCell>
          <TableCell>Елена М.</TableCell>
          <TableCell>elena@example.com</TableCell>
          <TableCell className='text-right'>2 дня назад</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className='font-medium'>003</TableCell>
          <TableCell>Дмитрий С.</TableCell>
          <TableCell>dmitry@example.com</TableCell>
          <TableCell className='text-right'>Неделю назад</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Компактная таблица с уменьшенными отступами для плотного отображения данных.',
      },
    },
  },
};

// Таблица с кастомными стилями
export const WithCustomStyles: Story = {
  render: args => (
    <Table {...args} rootClassName='border rounded-lg'>
      <TableHeader>
        <TableRow className='border-b' isHeader>
          <TableHead className='bg-background-tertiary/50'>Категория</TableHead>
          <TableHead className='bg-background-tertiary/50'>Бюджет</TableHead>
          <TableHead className='bg-background-tertiary/50 text-right'>Факт</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className='font-medium'>Маркетинг</TableCell>
          <TableCell>$5,000</TableCell>
          <TableCell className='text-right text-background-success'>$4,200</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className='font-medium'>Разработка</TableCell>
          <TableCell>$10,000</TableCell>
          <TableCell className='text-right text-background-error'>$11,500</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className='font-medium'>Операции</TableCell>
          <TableCell>$3,000</TableCell>
          <TableCell className='text-right'>$3,000</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Таблица с кастомными стилями для ячеек и контейнера.',
      },
    },
  },
};

// Таблица с выделением строк
export const WithRowSelection: Story = {
  render: args => {
    const [selectedRow, setSelectedRow] = React.useState<number | null>(null);

    return (
      <Table {...args}>
        <TableHeader>
          <TableRow isHeader>
            <TableHead>Название</TableHead>
            <TableHead>Автор</TableHead>
            <TableHead className='text-right'>Год</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[
            { title: 'Война и мир', author: 'Лев Толстой', year: 1869 },
            { title: 'Преступление и наказание', author: 'Федор Достоевский', year: 1866 },
            { title: 'Мастер и Маргарита', author: 'Михаил Булгаков', year: 1967 },
          ].map((book, index) => (
            <TableRow
              key={index}
              data-state={selectedRow === index ? 'selected' : ''}
              onClick={() => setSelectedRow(index)}
              className='cursor-pointer'
            >
              <TableCell className='font-medium'>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell className='text-right'>{book.year}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Таблица с возможностью выбора строки по клику.',
      },
    },
  },
};

// Пустая таблица
export const Empty: Story = {
  render: args => (
    <Table {...args}>
      <TableHeader>
        <TableRow isHeader>
          <TableHead>Дата</TableHead>
          <TableHead>Событие</TableHead>
          <TableHead className='text-right'>Статус</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={3} className='h-24 text-center text-foreground-secondary'>
            Нет данных для отображения
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Таблица без данных с сообщением о пустом состоянии.',
      },
    },
  },
};

// Пример с горизонтальной прокруткой
export const WithScroll: Story = {
  render: args => (
    <Table {...args} rootClassName='max-w-md border rounded-lg'>
      <TableHeader>
        <TableRow isHeader>
          <TableHead>Продукт</TableHead>
          <TableHead>Январь</TableHead>
          <TableHead>Февраль</TableHead>
          <TableHead>Март</TableHead>
          <TableHead>Апрель</TableHead>
          <TableHead>Май</TableHead>
          <TableHead>Июнь</TableHead>
          <TableHead>Июль</TableHead>
          <TableHead>Август</TableHead>
          <TableHead>Сентябрь</TableHead>
          <TableHead>Октябрь</TableHead>
          <TableHead>Ноябрь</TableHead>
          <TableHead>Декабрь</TableHead>
          <TableHead className='text-right'>Итого</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className='font-medium'>Продукт A</TableCell>
          {Array.from({ length: 12 }).map((_, i) => (
            <TableCell key={i}>{Math.floor(Math.random() * 1000)}</TableCell>
          ))}
          <TableCell className='text-right font-medium'>12,456</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className='font-medium'>Продукт B</TableCell>
          {Array.from({ length: 12 }).map((_, i) => (
            <TableCell key={i}>{Math.floor(Math.random() * 1000)}</TableCell>
          ))}
          <TableCell className='text-right font-medium'>9,873</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Таблица с горизонтальной прокруткой для большого количества колонок.',
      },
    },
  },
};
