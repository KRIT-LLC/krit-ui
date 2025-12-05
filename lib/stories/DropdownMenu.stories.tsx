import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Settings, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownActions,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/UI/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Интерактивное выпадающее меню с поддержкой различных элементов управления',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const Basic: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='fade-contrast-filled'>Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem disabled>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='fade-contrast-filled'>Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Settings className='mr-2 h-4 w-4' />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Trash className='mr-2 h-4 w-4' />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithControls: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(true);

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='fade-contrast-filled'>Preferences</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked={checked} onCheckedChange={setChecked}>
            Enable Notifications
          </DropdownMenuCheckboxItem>
          <DropdownMenuRadioItem value='option2'>Option 2</DropdownMenuRadioItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

export const ActionsMenu: Story = {
  render: () => (
    <DropdownActions
      actions={[
        { label: 'Edit', onClick: () => console.log('Edit') },
        { label: 'Delete', onClick: () => console.log('Delete') },
      ]}
    >
      <Settings className='h-4 w-4' />
    </DropdownActions>
  ),
};
