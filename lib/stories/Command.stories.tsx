import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { File, Plus, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';

const meta: Meta<typeof Command> = {
  title: 'Components/UI/Command',
  component: Command,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Командное меню с поиском и навигацией',
      },
    },
  },
  decorators: [
    Story => (
      <div className='max-w-2xl p-6 bg-background rounded-lg'>
        <Story />
      </div>
    ),
  ],
};

export default meta;

const Template: StoryObj<typeof Command> = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Command</Button>

        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder='Search commands...' />
          <CommandList>
            <CommandEmpty>No results found</CommandEmpty>

            <CommandGroup heading='Suggestions'>
              <CommandItem>
                <File className='mr-2 h-4 w-4' />
                <span>Search Files</span>
              </CommandItem>
              <CommandItem>
                <Settings className='mr-2 h-4 w-4' />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading='Actions'>
              <CommandItem>
                <Plus className='mr-2 h-4 w-4' />
                <span>Create New</span>
                <CommandShortcut>⌘N</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </>
    );
  },
};

export const Default: StoryObj<typeof Command> = {
  ...Template,
  args: {},
};

export const WithSearch: StoryObj<typeof Command> = {
  render: () => (
    <Command>
      <CommandInput placeholder='Type to search...' />
      <CommandList>
        <CommandItem>Search Result 1</CommandItem>
        <CommandItem>Search Result 2</CommandItem>
      </CommandList>
    </Command>
  ),
};

export const EmptyState: StoryObj<typeof Command> = {
  render: () => (
    <Command>
      <CommandInput placeholder='Search...' />
      <CommandList>
        <CommandEmpty>No results</CommandEmpty>
      </CommandList>
    </Command>
  ),
};
