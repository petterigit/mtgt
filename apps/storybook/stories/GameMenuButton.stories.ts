import type { Meta, StoryObj } from '@storybook/react';

import { GameMenuButton } from 'ui';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof GameMenuButton> = {
    title: 'Components/GameMenuButton',
    component: GameMenuButton,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GameMenuButton>;

export const GameMenuButtonStory: Story = {
    args: { onClick: () => alert('I have been clicked') },
};
