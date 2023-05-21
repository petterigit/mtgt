import type { Meta, StoryObj } from '@storybook/react';

import { LobbyContainer } from 'ui';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof LobbyContainer> = {
    title: 'Components/LobbyContainer',
    component: LobbyContainer,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LobbyContainer>;

export const LobbyContainerStory: Story = {
    args: { onSubmit: value => alert(value) },
};
