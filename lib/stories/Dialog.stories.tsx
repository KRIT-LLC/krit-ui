import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const meta: Meta<typeof Dialog> = {
  title: 'Components/UI/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Интерактивное диалоговое окно с различными секциями и режимами отображения',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Basic: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='primary'>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Notification</DialogTitle>
        </DialogHeader>
        <DialogSection className='space-y-4'>
          <p>This is a basic dialog example with scrollable content area.</p>
          <div className='h-96 bg-background-secondary rounded-lg p-4'>Scrollable content area</div>
        </DialogSection>
        <DialogFooter>
          <Button variant='primary'>Confirm</Button>
          <Button variant='secondary'>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const AsidePanel: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='primary'>Open Side Panel</Button>
      </DialogTrigger>
      <DialogContent aside>
        <DialogHeader hideCloseButton>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <DialogSection scrollableSection className='space-y-6'>
          <h3 className='text-lg font-medium'>Account Settings</h3>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className='p-2 border-b border-line-secondary'>
              Setting Item #{i + 1}
            </div>
          ))}
        </DialogSection>
        <DialogFooter className='!justify-start'>
          <Button variant='secondary'>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithScrollableSection: Story = {
  render: args => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='primary'>Open Scrollable</Button>
      </DialogTrigger>
      <DialogContent {...args} scrollableSection>
        <DialogHeader>
          <DialogTitle>Scrollable Content</DialogTitle>
        </DialogHeader>
        <DialogSection scrollableSection className='h-96'>
          {Array.from({ length: 50 }).map((_, i) => (
            <p key={i}>Scrollable content line #{i + 1}</p>
          ))}
        </DialogSection>
      </DialogContent>
    </Dialog>
  ),
};
