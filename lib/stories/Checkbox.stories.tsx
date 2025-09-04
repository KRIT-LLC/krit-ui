import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, CheckboxWithLabel } from '@/components/ui/checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onCheckedChange: { action: 'checked' },
  },
  parameters: {
    docs: {
      description: {
        component: 'Кастомный чекбокс с поддержкой всех состояний и лейбла',
      },
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Checkbox> = {
  args: {
    children: 'Checkbox Label',
  },
};

export const CheckedState: StoryObj<typeof Checkbox> = {
  args: {
    checked: true,
    children: 'Checked',
  },
};

export const DisabledState: StoryObj<typeof Checkbox> = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};

export const WithLabelComponent: StoryObj<typeof CheckboxWithLabel> = {
  render: () => (
    <CheckboxWithLabel id='terms' onCheckedChange={checked => console.log(checked)}>
      Accept terms and conditions
    </CheckboxWithLabel>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Вариант с отдельным кликабельным лейблом',
      },
    },
  },
};

export const WithoutLabel: StoryObj<typeof Checkbox> = {
  args: {},
};
