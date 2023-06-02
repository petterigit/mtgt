import type { Meta, StoryObj } from '@storybook/react';

import { PlayersContainer } from 'ui';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof PlayersContainer> = {
    title: 'Components/PlayerContainer',
    component: PlayersContainer,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PlayersContainer>;

export const PlayersContainerStory: Story = {};
