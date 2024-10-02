import type { Meta, StoryFn } from '@storybook/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const meta = {
  title: 'Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Card>;

export default meta;

export const Demo: StoryFn = () => {
  return <Card className="p-3 border-none bg-background-secondary">
    <CardHeader
      className="p-1 cursor-pointer w-full"
      right={<>CardHeader right</>}
      onClick={() => {}}
    >
      CardHeader
    </CardHeader>
    <CardTitle>CardTitle</CardTitle>
    <CardDescription>CardDescription</CardDescription>
    <CardContent>CardContent</CardContent>
    <CardFooter>
      CardFooter
    </CardFooter>
  </Card>;
};
