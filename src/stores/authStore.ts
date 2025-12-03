import { postSignin, postSignup } from '@/api/auth'
import { SigninDto, SignupDto } from '@/types/auth'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface AuthState {
    accessToken: string | null
    name: string | null
    hydrated: boolean
    login: (body: SigninDto) => Promise<void>
    logout: () => Promise<void>
    signup: (body: SignupDto) => Promise<string>
    setHydrated: (v: boolean) => void

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
            hydrated: false,
            login: async (body: SigninDto) => {
                try {
                    const { accessToken, id } = await postSignin(body)
                    if (accessToken) {
                        set({ accessToken: accessToken, name: id })
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
            setHydrated: (v) => set({ hydrated: v }),

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
            onRehydrateStorage: () => (state) => {
                state?.setHydrated(true)
            },
        }
    )
)
