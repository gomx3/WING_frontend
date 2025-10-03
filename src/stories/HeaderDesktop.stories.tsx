import { HeaderDesktop } from '@/components/header/HeaderDesktop'
import type { Meta, StoryObj } from '@storybook/nextjs'

import { fn } from 'storybook/test'

export const ActionsData = {
    onLogin: fn(),
    onLogout: fn(),
    onCreateAccount: fn(),
}

const meta = {
    title: 'Header/Desktop',
    component: HeaderDesktop,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    args: {
        ...ActionsData,
    },
} satisfies Meta<typeof HeaderDesktop>

export default meta
type Story = StoryObj<typeof meta>

export const LoggedIn: Story = {
    args: {
        user: {
            name: 'user A',
        },
    },
}

export const LoggedOut: Story = {}
