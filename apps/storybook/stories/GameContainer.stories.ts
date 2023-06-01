import type { Meta, StoryObj } from '@storybook/react';

import { GameContainer } from 'ui';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof GameContainer> = {
    title: 'Components/GameContainer',
    component: GameContainer,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GameContainer>;

export const GameContainerStory: Story = {};
