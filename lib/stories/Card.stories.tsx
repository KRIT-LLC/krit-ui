import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardEditActions,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const meta: Meta<typeof Card> = {
  title: 'Components/UI/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Интерактивная карточка с поддержкой различных состояний и действий',
      },
    },
    controls: {
      include: ['showArrow', 'checked', 'onClick'],
    },
  },
  argTypes: {
    showArrow: { control: 'boolean' },
    checked: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};

export default meta;

export const Default: StoryObj<typeof Card> = {
  render: args => (
    <Card {...args} className='w-[400px]'>
      <CardHeader>
        <CardTitle>Default Card</CardTitle>
      </CardHeader>
      <CardContent>Basic card content</CardContent>
    </Card>
  ),
};

export const WithArrow: StoryObj<typeof Card> = {
  args: { showArrow: true },
  render: args => (
    <Card {...args} className='w-[400px]'>
      <CardTitle>Card with Arrow</CardTitle>
      <CardContent>Hover to see arrow interaction</CardContent>
    </Card>
  ),
};

export const SelectableCard: StoryObj<typeof Card> = {
  args: { showArrow: true },
  render: args => {
    const [checked, setChecked] = React.useState(false);
    return (
      <Card {...args} checked={checked} onSelect={setChecked} className='w-[400px]'>
        <CardHeader checked={checked} onSelect={setChecked}>
          <CardTitle>Selectable Card</CardTitle>
        </CardHeader>
        <CardContent>Current state: {checked ? 'selected' : 'unselected'}</CardContent>
      </Card>
    );
  },
};

export const WithEditActions: StoryObj<typeof Card> = {
  render: () => (
    <Card className='w-[400px] relative'>
      <CardEditActions
        onSave={async () => console.log('Save clicked')}
        onRemove={async () => console.log('Remove clicked')}
      />
      <CardHeader>
        <CardTitle>Editable Card</CardTitle>
      </CardHeader>
      <CardContent>Card with edit actions in top-right corner</CardContent>
    </Card>
  ),
};

export const FullFeaturedCard: StoryObj<typeof Card> = {
  render: () => {
    const [checked, setChecked] = React.useState(false);

    return (
      <Card className='w-[500px]'>
        <CardHeader right={<span>🆕 New item</span>} checked={checked} onSelect={setChecked}>
          <CardTitle leftOffset>Featured Card</CardTitle>
          <CardDescription>Detailed description</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-2'>
            <p>Main content section</p>
            <ul className='list-disc pl-4'>
              <li>Feature 1</li>
              <li>Feature 2</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <span>Created: 2024-03-15</span>
          <span>Author: John Doe</span>
        </CardFooter>
      </Card>
    );
  },
};
