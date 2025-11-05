import { postSignin, postSignup } from '@/api/auth'
import { SigninDto, SignupDto } from '@/types/auth'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface AuthState {
    accessToken: string | null
    name: string | null
    login: (body: SigninDto) => Promise<void>
    logout: () => Promise<void>
    signup: (body: SignupDto) => Promise<string>

    showSigninModal: boolean
    openSigninModal: () => void
    closeSigninModal: () => void
    toggleSigninModal: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,
            name: null,
            login: async (body: SigninDto) => {
                try {
                    const { accessToken } = await postSignin(body)
                    if (accessToken) {
                        set({ accessToken: accessToken, name: body.id })
                    }
                } catch (error) {
                    console.error('[authStore] Login ...', error)
                    throw error
                }
            },
            logout: async () => {
                set({ accessToken: null, name: null })
            },
            signup: async (body: SignupDto) => {
                try {
                    const data = await postSignup(body)
                    return data
                } catch (error) {
                    console.error('[authStore] Signup ...', error)
                    throw error
                }
            },

            showSigninModal: false,
            openSigninModal: () => set({ showSigninModal: true }),
            closeSigninModal: () => set({ showSigninModal: false }),
            toggleSigninModal: () =>
                set((state) => ({
                    showSigninModal: !state.showSigninModal,
                })),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                accessToken: state.accessToken,
                name: state.name,
            }),
        }
    )
)
