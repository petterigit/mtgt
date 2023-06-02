import type { Meta, StoryObj } from '@storybook/react';

import { PageContainer } from 'ui';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof PageContainer> = {
    title: 'Components/PageContainer',
    component: PageContainer,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PageContainer>;

export const PageContainerStory: Story = {};
