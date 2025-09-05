// form.stories.tsx
import { useForm } from 'react-hook-form';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormItemDatePicker,
  FormItemInput,
  FormItemMultiSelect,
  FormItemSelect,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const meta: Meta<typeof Form> = {
  title: 'Components/UI/Form',
  component: Form,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Комплексная система компонентов для работы с формами на основе react-hook-form. Включает поля ввода, выбора, мультиселекта и выбора даты.',
      },
    },
  },
  argTypes: {
    // Общие пропсы для всех компонентов формы
  },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof Form>;

// Базовая форма с разными типами полей
const FormTemplate = () => {
  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
      country: '',
      interests: [],
      birthdate: undefined,
    },
  });

  const onSubmit = (data: unknown) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 max-w-md'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Имя пользователя</FormLabel>
              <FormControl>
                <FormItemInput placeholder='Введите имя' {...field} />
              </FormControl>
              <FormDescription>Это имя будет отображаться в вашем профиле.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Email</FormLabel>
              <FormControl>
                <FormItemInput type='email' placeholder='Введите email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='country'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Страна</FormLabel>
              <FormControl>
                <FormItemSelect
                  options={[
                    { value: 'ru', label: 'Россия' },
                    { value: 'us', label: 'США' },
                    { value: 'de', label: 'Германия' },
                  ]}
                  placeholder='Выберите страну'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='interests'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Интересы</FormLabel>
              <FormControl>
                <FormItemMultiSelect
                  options={[
                    { value: 'sports', label: 'Спорт' },
                    { value: 'music', label: 'Музыка' },
                    { value: 'books', label: 'Книги' },
                    { value: 'travel', label: 'Путешествия' },
                  ]}
                  placeholder='Выберите интересы'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='birthdate'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Дата рождения</FormLabel>
              <FormControl>
                <FormItemDatePicker mode='single' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>Отправить</Button>
      </form>
    </Form>
  );
};

export const Default: Story = {
  render: () => <FormTemplate />,
  parameters: {
    docs: {
      description: {
        story:
          'Базовая форма с различными типами полей: текстовое поле, email, выпадающий список, мультиселект и выбор даты.',
      },
    },
  },
};

export const HorizontalLayout: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        name: '',
        role: '',
      },
    });

    return (
      <Form {...form}>
        <form className='space-y-4 max-w-md'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem horizontal>
                <FormLabel className='w-24'>Имя</FormLabel>
                <div className='flex-1'>
                  <FormControl>
                    <FormItemInput placeholder='Введите имя' {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='role'
            render={({ field }) => (
              <FormItem horizontal>
                <FormLabel className='w-24'>Роль</FormLabel>
                <div className='flex-1'>
                  <FormControl>
                    <FormItemSelect
                      options={[
                        { value: 'admin', label: 'Администратор' },
                        { value: 'user', label: 'Пользователь' },
                        { value: 'guest', label: 'Гость' },
                      ]}
                      placeholder='Выберите роль'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Форма с горизонтальным расположением меток и полей ввода.',
      },
    },
  },
};

export const WithValidation: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        email: '',
        password: '',
      },
    });

    return (
      <Form {...form}>
        <form className='space-y-4 max-w-md'>
          <FormField
            control={form.control}
            name='email'
            rules={{
              required: 'Email обязателен',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Неверный формат email',
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Email</FormLabel>
                <FormControl>
                  <FormItemInput placeholder='Введите email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            rules={{
              required: 'Пароль обязателен',
              minLength: {
                value: 6,
                message: 'Пароль должен содержать не менее 6 символов',
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Пароль</FormLabel>
                <FormControl>
                  <FormItemInput type='password' placeholder='Введите пароль' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Форма с валидацией полей. Попробуйте ввести неверные данные, чтобы увидеть сообщения об ошибках.',
      },
    },
  },
};
