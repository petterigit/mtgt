import type { Meta, StoryObj } from '@storybook/react';

import { Player } from 'ui';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Player> = {
    title: 'Components/Player',
    component: Player,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Player>;

export const PlayerStory: Story = {
    args: { name: 'Vilperi', life: 1 },
};
