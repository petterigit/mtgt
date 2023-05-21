import type { Meta, StoryObj } from '@storybook/react';

import { GameMenu } from 'ui';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof GameMenu> = {
    title: 'Components/GameMenu',
    component: GameMenu,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GameMenu>;

export const GameMenuStory: Story = {
    args: { open: true, addPlayer: () => {} },
};
