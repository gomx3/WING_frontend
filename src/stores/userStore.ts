import { User } from '@/types/user'
import { create } from 'zustand'

interface UserState {
    user: User | undefined
    setUser: (user: User | undefined) => void
}

export const useUserStore = create<UserState>((set) => ({
    user: { name: 'Jone Doe' },
    setUser: (user) => set({ user }),
}))
