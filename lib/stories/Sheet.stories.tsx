import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const meta: Meta<typeof Sheet> = {
  title: 'Components/UI/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Боковая панель (Sheet) для отображения дополнительного контента. Может выдвигаться с любой из четырех сторон экрана.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Sheet>;

export const RightSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='primary'>Open Sheet (Right)</Button>
      </SheetTrigger>
      <SheetContent side='right'>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Make changes to your settings here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className='py-4 space-y-4'>
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Name</label>
            <input className='w-full px-3 py-2 border rounded-md' placeholder='Enter your name' />
          </div>
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Email</label>
            <input
              className='w-full px-3 py-2 border rounded-md'
              placeholder='Enter your email'
              type='email'
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant='secondary'>Cancel</Button>
          </SheetClose>
          <Button variant='primary'>Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const LeftSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='primary'>Open Sheet (Left)</Button>
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader>
          <SheetTitle>Navigation Menu</SheetTitle>
          <SheetDescription>Quick access to main sections</SheetDescription>
        </SheetHeader>
        <div className='py-4 space-y-2'>
          <button className='w-full text-left px-3 py-2 hover:bg-background-secondary rounded-md'>
            Dashboard
          </button>
          <button className='w-full text-left px-3 py-2 hover:bg-background-secondary rounded-md'>
            Projects
          </button>
          <button className='w-full text-left px-3 py-2 hover:bg-background-secondary rounded-md'>
            Team
          </button>
          <button className='w-full text-left px-3 py-2 hover:bg-background-secondary rounded-md'>
            Settings
          </button>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const TopSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='primary'>Open Sheet (Top)</Button>
      </SheetTrigger>
      <SheetContent side='top'>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>You have 3 new notifications</SheetDescription>
        </SheetHeader>
        <div className='py-4 space-y-4'>
          <div className='p-3 border rounded-md'>
            <p className='font-medium'>New message from John</p>
            <p className='text-sm text-muted-foreground'>2 minutes ago</p>
          </div>
          <div className='p-3 border rounded-md'>
            <p className='font-medium'>Project updated</p>
            <p className='text-sm text-muted-foreground'>1 hour ago</p>
          </div>
          <div className='p-3 border rounded-md'>
            <p className='font-medium'>Task completed</p>
            <p className='text-sm text-muted-foreground'>3 hours ago</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const BottomSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='primary'>Open Sheet (Bottom)</Button>
      </SheetTrigger>
      <SheetContent side='bottom'>
        <SheetHeader>
          <SheetTitle>Quick Actions</SheetTitle>
          <SheetDescription>Choose an action to perform</SheetDescription>
        </SheetHeader>
        <div className='py-4 grid grid-cols-3 gap-4'>
          <button className='p-4 border rounded-md hover:bg-background-secondary text-center'>
            <div className='text-2xl mb-2'>📝</div>
            <div className='text-sm font-medium'>Create</div>
          </button>
          <button className='p-4 border rounded-md hover:bg-background-secondary text-center'>
            <div className='text-2xl mb-2'>📤</div>
            <div className='text-sm font-medium'>Upload</div>
          </button>
          <button className='p-4 border rounded-md hover:bg-background-secondary text-center'>
            <div className='text-2xl mb-2'>🗑️</div>
            <div className='text-sm font-medium'>Delete</div>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const WithScrollableContent: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='primary'>Open Sheet with Long Content</Button>
      </SheetTrigger>
      <SheetContent side='right'>
        <SheetHeader>
          <SheetTitle>Terms and Conditions</SheetTitle>
          <SheetDescription>Please read our terms and conditions carefully</SheetDescription>
        </SheetHeader>
        <div className='py-4 space-y-4 overflow-y-auto max-h-[60vh]'>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className='p-3 border rounded-md'>
              <h4 className='font-medium mb-2'>Section {i + 1}</h4>
              <p className='text-sm text-muted-foreground'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          ))}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant='secondary'>Decline</Button>
          </SheetClose>
          <Button variant='primary'>Accept</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const WithoutFooter: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='primary'>Open Simple Sheet</Button>
      </SheetTrigger>
      <SheetContent side='right'>
        <SheetHeader>
          <SheetTitle>Information</SheetTitle>
          <SheetDescription>This is a simple sheet without footer actions</SheetDescription>
        </SheetHeader>
        <div className='py-4 space-y-3'>
          <p className='text-sm'>
            This sheet demonstrates a simpler layout without footer buttons.
          </p>
          <p className='text-sm'>You can close it by clicking the X button or clicking outside.</p>
          <div className='mt-6 p-4 bg-background-secondary rounded-md'>
            <p className='text-sm font-medium'>Pro Tip</p>
            <p className='text-xs text-muted-foreground mt-1'>
              Sheets are great for displaying contextual information without navigating away from
              the current page.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const WithCustomWidth: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='primary'>Open Wide Sheet</Button>
      </SheetTrigger>
      <SheetContent side='right' className='sm:max-w-2xl'>
        <SheetHeader>
          <SheetTitle>Wide Sheet Panel</SheetTitle>
          <SheetDescription>
            This sheet has a custom width for displaying more content
          </SheetDescription>
        </SheetHeader>
        <div className='py-4 grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <h4 className='font-medium'>Column 1</h4>
            <div className='p-3 border rounded-md'>Content 1</div>
            <div className='p-3 border rounded-md'>Content 2</div>
            <div className='p-3 border rounded-md'>Content 3</div>
          </div>
          <div className='space-y-2'>
            <h4 className='font-medium'>Column 2</h4>
            <div className='p-3 border rounded-md'>Content 4</div>
            <div className='p-3 border rounded-md'>Content 5</div>
            <div className='p-3 border rounded-md'>Content 6</div>
          </div>
        </div>
        <SheetFooter>
          <Button variant='primary'>Done</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};
